import { Pool } from "pg";

// Initialize PostgreSQL connection pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "ArynCh@128617",
    port: 5432,
  });

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received Webhook Payload:", body);

    if (!body || body.type !== "NFT_BID") {
      return Response.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    // Extract bid data
    const { mint, bidder, amount, currency, marketplace } = body.data;
    const timestamp = new Date(body.timestamp * 1000); // Convert Unix timestamp

    // Store the bid in PostgreSQL
    await pool.query(
      "INSERT INTO nft_bids (nft_mint, bidder, amount, currency, marketplace, timestamp) VALUES ($1, $2, $3, $4, $5, $6)",
      [mint, bidder, amount, currency, marketplace, timestamp]
    );

    return Response.json({ success: true, message: "NFT bid recorded" }, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
