import { serverDatabases } from "@/utils/appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { reference, order_id } = await request.json();
    if (!reference || !order_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment reference and order ID are required",
        },
        { status: 400 },
      );
    }
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      options,
    );
    const verifyData = await response.json();
    if (!response.ok) {
      console.error("Paystack verification error:", verifyData);
      return NextResponse.json(
        { success: false, error: "Payment verification failed" },
        { status: 400 },
      );
    }
    if (verifyData.data.status === "success") {
      if (verifyData.data.status === "success") {
        // Update order status in database
        try {
          await serverDatabases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID as string,
            reference,
            {
              status: "completed",
              payment_reference: reference,
              payment_status: "success",
              updated_at: new Date().toISOString(),
            },
          );
        } catch (dbError) {
          console.error("Error updating order in database:", dbError);
          // Still return success if payment was verified, but log the database error
        }
      }
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        transaction: verifyData.data,
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to verify payment",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
