import { Client, Users, Databases, Messaging, Query, ID } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
const appwriteFunction = async ({ req, res }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const users = new Users(client);
  const databases = new Databases(client);
  const messaging = new Messaging(client);

  const headers = req.headers;
  // const triggerType = headers['x-appwrite-trigger'];
  const userId = users.get(headers['x-appwrite-user-id']);
  const data = req.bodyJson;
  // const user = await users.get(userId);

  try {
    const { reference } = data;
    // verify transaction
    const verify = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    ).then((res) => res.json());
    if (verify.data.status !== 'success') {
      return res.status(400).json({ error: 'Transaction not successful', sucess: false });
    }

    // get cart items for current user
    const cart = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_CART_COLLECTION_ID,
      [Query.equal('userId', userId)]
    );

    // create order in database
    const order = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_ORDER_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        items: cart.documents.map((cartItem) => ({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: cartItem.price,
        })),
        total: verify.data.amount / 100,
        paidAt: new Date().toISOString(),
      }
    );

    // delete cart items for current user
    await Promise.all(
      cart.documents.map((cartItem) =>
        databases.deleteDocument(
          process.env.APPWRITE_DB_ID,
          process.env.APPWRITE_CART_COLLECTION_ID,
          cartItem.$id
        )
      )
    );

    // send notification to user
    await messaging.createEmail(
      ID.unique(),
      'Order Confirmation',
      `Your order with ID ${order.$id} has been successfully placed.`,
      [],
      [userId]
    );

    return res.json({
      message: 'Order placed successfully',
      orderId: order.$id,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.json({ error: err.message, success: false }, 500);
  }
};

export default appwriteFunction;
