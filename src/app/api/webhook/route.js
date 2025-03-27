export default async function handler(req, res) {
  if (req.method === "POST") {
    const { transactions } = req.body;

    if (transactions && transactions.length > 0) {
      transactions.forEach((tx) => {
        const { signature, type, nftTransfers } = tx;

        console.log(`🔹 New Transaction Detected! Type: ${type}`);

        if (nftTransfers && nftTransfers.length > 0) {
          nftTransfers.forEach((nft) => {
            const { mint, fromUserAccount, toUserAccount, amount, currency } = nft;

            switch (type) {
              case "NFT_BID":
                console.log("🎯 NFT Bid Detected!");
                console.log(`🖼 NFT Mint Address: ${mint}`);
                console.log(`🏦 Bidder: ${toUserAccount}`);
                console.log(`💰 Bid Amount: ${amount} ${currency}`);
                break;

              case "NFT_LISTING":
                console.log("🛒 NFT Listing Detected!");
                console.log(`🖼 NFT Mint Address: ${mint}`);
                console.log(`📤 Seller: ${fromUserAccount}`);
                console.log(`💰 Listed Price: ${amount} ${currency}`);
                break;

              case "NFT_SALE":
                console.log("💸 NFT Sale Detected!");
                console.log(`🖼 NFT Mint Address: ${mint}`);
                console.log(`📤 Seller: ${fromUserAccount}`);
                console.log(`📥 Buyer: ${toUserAccount}`);
                console.log(`💰 Sale Price: ${amount} ${currency}`);
                break;

              default:
                console.log("⚠️ Unknown transaction type detected.");
                break;
            }

            console.log(`🔗 Transaction Signature: ${signature}`);
            console.log("--------------------------------");
          });
        }
      });
    }

    res.status(200).json({ message: "Webhook received successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
