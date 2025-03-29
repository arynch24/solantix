import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const mintAddress = searchParams.get("mint");

        if (!mintAddress) {
            return NextResponse.json({ error: "No mint address provided" }, { status: 400 });
        }

        const API_KEY = process.env.HELIUS_API_KEY;
        const HELIUS_URL = `https://mainnet.helius-rpc.com/?api-key=${API_KEY}`;

        // RPC Request Payload
        const payload = {
            jsonrpc: "2.0",
            id: 1,
            method: "getAsset",
            params: { id: mintAddress },
        };

        // Fetch Data
        const response = await fetch(HELIUS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!data.result) {
            return NextResponse.json({ error: "NFT/FT not found" }, { status: 404 });
        }

        // Extract Important Data
        const asset = data.result;
        console.log("🔍 Backend Received Data:", asset);

        return NextResponse.json({
            mintAddress: asset.id,
            name: asset.content.metadata?.name || "Unknown",
            description: asset.content.metadata?.description || "No description",
            image: asset.content.links?.image || "",
            externalUrl: asset.content.links?.external_url || "",
            collection: asset.grouping?.[0]?.group_value || "Unknown",
            owner: asset.ownership?.owner || "Unknown",
            attributes: asset.content.metadata?.attributes || [],
            maxSupply: asset.supply?.print_max_supply || "N/A",
            currentSupply: asset.supply?.print_current_supply || "N/A",
            royalty: asset.royalty?.percent ? `${asset.royalty.percent * 100}%` : "0%",
            primarySale: asset.royalty?.primary_sale_happened ? "Yes" : "No",
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
