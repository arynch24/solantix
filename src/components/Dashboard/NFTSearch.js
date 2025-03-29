"use client";
import { useState } from "react";

export default function SearchNFT() {
    const [query, setQuery] = useState("");
    const [nft, setNFT] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNFTDetails = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setNFT(null);

        try {
            const response = await fetch(`/api/search?q=${query}`);
            const data = await response.json();

            console.log("🔍 Frontend Received Data:", data);

            if (data.error) throw new Error(data.error);
            setNFT(data);
        } catch (err) {
            setError(err.message || "Failed to fetch NFT details.");
        }

        setLoading(false);
    };

    return (
        <div className="p-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter NFT Mint Address"
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={fetchNFTDetails}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Search
                </button>
            </div>

            {loading && <p className="mt-2 text-blue-500">Loading...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {nft && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <h2 className="text-lg font-bold">{nft.name} ({nft.symbol})</h2>
                    <img src={nft.image} alt="NFT" className="w-32 h-32 mt-2 rounded" />
                    <p><strong>Mint Address:</strong> {nft.mintAddress}</p>
                    <p><strong>Owner:</strong> {nft.owner}</p>
                    <p><strong>Collection:</strong> {nft.collection}</p>

                    <h3 className="mt-2 font-bold">Market Data</h3>
                    <p><strong>Max Supply:</strong> {nft.maxTotalSupply}</p>
                    <p><strong>Holders:</strong> {nft.holders}</p>
                    <p><strong>Total Transfers:</strong> {nft.totalTransfers}</p>
                    <p><strong>Price:</strong> {nft.price}</p>
                    <p><strong>On-Chain Market Cap:</strong> {nft.onchainMarketCap}</p>
                    <p><strong>Circulating Supply Market Cap:</strong> {nft.circulatingSupplyMarketCap}</p>
                </div>
            )}
        </div>
    );
}
