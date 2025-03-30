export async function POST(req) {
  try {
    const body = await req.json();
    // console.log("🚀 Webhook Data Received:", JSON.stringify(body, null, 2));
    console.log("🚀 Webhook Data Received:");

    body.forEach(transaction => {
      console.log(`🔹 Transaction Type: ${transaction.type}`);
      console.log(`🔹 Signature: ${transaction.signature}`);
      console.log(`🔹 Accounts:`, transaction.accounts);

      // Generalized processing based on transaction type
      switch (transaction.type) {
        case "NFT_BID":
          console.log("🎯 Processing NFT Bid:", transaction);
          // Handle NFT Bid logic
          break;

        case "NFT_LISTING":
          console.log("📢 Processing NFT Listing:", transaction);
          // Handle NFT Listing logic
          break;

        case "NFT_SALE":
          console.log("💰 Processing NFT Sale:", transaction);
          // Handle NFT Sale logic
          break;

        case "TOKEN_TRANSFER":
          console.log("🔄 Processing Token Transfer:", transaction);
          // Handle Token Transfer logic
          break;

        case "NFT_MINT":
          console.log("🌱 Processing NFT Mint:", transaction);
          // Handle NFT Minting logic
          break;

        case "SWAP":
          console.log("🔀 Processing Swap Transaction:", transaction);
          // Handle Swap logic
          break;

        case "STAKE":
          console.log("📌 Processing Staking Transaction:", transaction);
          // Handle Staking logic
          break;

        case "UNSTAKE":
          console.log("🚀 Processing Unstaking Transaction:", transaction);
          // Handle Unstaking logic
          break;

        default:
          console.log("⚠️ Unhandled Transaction Type:", transaction.type);
          // Log or handle unknown transaction types if needed
      }
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return new Response(JSON.stringify({ error: "Webhook processing failed" }), { status: 500 });
  }
}
