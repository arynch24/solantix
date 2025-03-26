import { NextResponse } from "next/server";
import { Pool } from "pg";

// Initialize PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
    console.log("API: Fetching bids");
    const result = await client.query("SELECT * FROM nft_bids"); 
    client.release();

    return NextResponse.json(result.rows); // Return fetched data
  } catch (error) {
    console.error("Error fetching bids:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { bidder, amount, currency, nft_mint, marketplace } = await req.json();

    // Validate input
    if (!bidder || !amount || !currency || !nft_mint || !marketplace) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await pool.connect();
    await client.query(
      "INSERT INTO nft_bids (bidder, amount, currency, nft_mint, marketplace) VALUES ($1, $2, $3, $4, $5)",
      [bidder, amount, currency, nft_mint, marketplace]
    );
    client.release();

    return NextResponse.json({ message: "Bid added successfully" });
  } catch (error) {
    console.error("Error inserting bid:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
