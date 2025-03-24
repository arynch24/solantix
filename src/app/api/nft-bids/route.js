import { Pool } from "pg";

// PostgreSQL connection
const pool = new Pool({
  user: "your_db_user",
  host: "your_db_host",
  database: "your_db_name",
  password: "your_db_password",
  port: 5432,
});

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM nft_bids ORDER BY timestamp DESC");
    return Response.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching NFT bids:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
