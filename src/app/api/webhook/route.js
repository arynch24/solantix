export async function POST(req) {
  try {
      const body = await req.json();
      console.log("🚀 Webhook Data Received:", JSON.stringify(body, null, 2));

      body.forEach(transaction => {
          console.log(`🔹 Transaction Type: ${transaction.type}`);
          console.log(`🔹 Signature: ${transaction.signature}`);
          console.log(`🔹 Accounts: ${transaction.accounts}`);

          if (transaction.type === "NFT_BID") {
              console.log("🎯 Processing NFT Bid:", transaction);
              // Add logic for handling NFT Bids
          } else if (transaction.type === "NFT_LISTING") {
              console.log("📢 Processing NFT Listing:", transaction);
              // Add logic for handling NFT Listings
          } else if (transaction.type === "NFT_SALE") {
              console.log("💰 Processing NFT Sale:", transaction);
              // Add logic for handling NFT Sales
          }
      });

      return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
      console.error("❌ Webhook Error:", error);
      return new Response(JSON.stringify({ error: "Webhook processing failed" }), { status: 500 });
  }
}
