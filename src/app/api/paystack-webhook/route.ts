import { Readable } from "stream";
import { NextRequest } from "next/server";
import crypto from "crypto";
import { serverDatabases } from "@/utils/appwrite";

async function buffer(readable: Readable): Promise<Buffer> {
  const chunks: Uint8Array[] = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  const rawBody = await buffer(req.body as unknown as Readable);
  const signature = req.headers.get("x-paystack-signature");
  const secret = process.env.PAYSTACK_SECRET_KEY as string;

  const hash = crypto
    .createHmac("sha512", secret)
    .update(rawBody)
    .digest("hex");
  if (hash !== signature) {
    return new Response("Invalid signature", { status: 400 });
  }
  const event = JSON.parse(rawBody.toString());
  if (event.event === "charge.success") {
    const reference = event.data.reference;
    const amount = event.data.amount;
    const customerEmail = event.data.customer.email;
    console.log("Payment successful:", {
      reference,
      amount,
      customerEmail,
    });
    await serverDatabases.updateDocument(
      process.env.APPWRITE_DATABASE_ID as string,
      process.env.APPWRITE_ORDERS_COLLECTION_ID as string,
      reference,
      { status: "paid" }
    );
  }
  return new Response("Webhook received", { status: 200 });
  // Process the buffered request body
}
