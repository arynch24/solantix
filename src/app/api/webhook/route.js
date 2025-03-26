import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received webhook data:", body);

    if (!body || !body.data) {
      console.error("Invalid webhook payload:", body);
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    // Safe Destructuring
    const { mint, owner, transactionId } = body.data || {}; // Ensure body.data exists

    if (!mint || !owner || !transactionId) {
      console.error("Missing required fields:", { mint, owner, transactionId });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store in PostgreSQL
    const client = await pool.connect();
    await client.query(
      "INSERT INTO solana_webhooks (mint, owner, transaction_id) VALUES ($1, $2, $3)",
      [mint, owner, transactionId]
    );
    client.release();

    return NextResponse.json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
