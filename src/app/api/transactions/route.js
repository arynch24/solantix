export default async function handler(req, res) {
    console.log("API: Fetching transactions");  
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
    const { walletAddress } = req.body;

    if (!apiKey || !walletAddress) {
        return res.status(400).json({ error: "Missing API key or wallet address" });
    }

    try {
        const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getTransactions",
                params: {
                    account: walletAddress,
                    limit: 10
                }
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch transactions" });
    }
}
