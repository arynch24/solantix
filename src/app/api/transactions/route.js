export async function POST(req) {
    console.log("API: Fetching transactions");

    try {
        const { walletAddress } = await req.json();
        const apiKey = process.env.HELIUS_API_KEY;

        if (!apiKey || !walletAddress) {
            return Response.json({ error: "Missing API key or wallet address" }, { status: 400 });
        }

        const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getTransactions",
                params: {
                    account: walletAddress,
                    limit: 10,
                },
            }),
        });

        const data = await response.json();
        return Response.json(data, { status: 200 });

    } catch (error) {
        return Response.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}
