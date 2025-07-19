import { serverDatabases } from "@/utils/appwrite";
import { ID } from "node-appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const { email, amount, user_id, shipping_address } = requestData;
    console.log("Received request data:", requestData);

    if (!email || !amount) {
      return new Response("Email and amount are required", { status: 400 });
    }

    // let itemsArray;
    // try {
    //   itemsArray = JSON.parse(items);
    //   if (!Array.isArray(itemsArray)) {
    //     throw new Error("Items must be an array");
    //   }
    // } catch (e) {
    //   console.error("Error parsing items:", e);
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: "Invalid items format"
    //     },
    //     { status: 400 }
    //   );
    // }

    // Create an order in Appwrite
    const order = await serverDatabases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID as string,
      ID.unique(),
      {
        // items,
        total_price: amount,
        status: "pending",
        order_date: new Date().toISOString(),
        user_id,
        "shipping-address": shipping_address,
      },
    );

    const body = JSON.stringify({
      email,
      amount,
      reference: order.$id, // use order ID as reference
      currency: "NGN",
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderId=${order.$id}`,
    });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      body,
    };
    console.log("Initializing payment with options: ", options);
    console.log("Secret key: ", process.env.PAYSTACK_SECRET_KEY);
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      options,
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.error("Paystack API error:", responseData);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to initialize payment",
          details: responseData,
        },
        { status: 500 },
      );
    }
    console.log("Payment initialized successfully:", responseData);
    // return NextResponse.json({
    //   success: true,
    //   data: responseData.data,
    //   orderId: order.$id,
    // })
    return NextResponse.json({
      success: true,
      status: 200, // ← Add this for your frontend check
      data: responseData.data,
      orderId: order.$id,
    });
  } catch (error) {
    console.error("Error initializing payment:", error);
    // return NextResponse.json({
    //   success: false,
    //   error: "Failed to initialize payment",
    //   details: error instanceof Error ? error.message : String(error),
    //   status: 500,
    // })
    return NextResponse.json(
      {
        success: false,
        error: "Failed to initialize payment",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
