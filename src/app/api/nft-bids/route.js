import { NextResponse } from "next/server";
import { Pool } from "pg";


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000, 
});

export async function GET() {
  let client;
  try {
    client = await pool.connect();
    console.log("Connected to PostgreSQL ✅");

    console.log("API: Fetching bids");
    const result = await client.query("SELECT * FROM nft_bids");

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching bids:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 }, {msg: error.message});
  } finally {
    if (client) client.release();
  }
}

export async function POST(req) {
  let client;
  try {
    const { bidder, amount, currency, nft_mint, marketplace } = await req.json();

    // Validate input
    if (!bidder || !amount || !currency || !nft_mint || !marketplace) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    client = await pool.connect();
    await client.query(
      "INSERT INTO nft_bids (bidder, amount, currency, nft_mint, marketplace) VALUES ($1, $2, $3, $4, $5)",
      [bidder, amount, currency, nft_mint, marketplace]
    );

    return NextResponse.json({ message: "Bid added successfully" });
  } catch (error) {
    console.error("Error inserting bid:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
