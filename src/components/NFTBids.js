"use client";
import { useEffect, useState } from "react";

export default function BidList() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBids() {
      try {
        const response = await fetch("/api/nft-bids");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch bids");
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        setBids(data);
      } catch (error) {
        console.error("Error fetching bids:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBids();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">NFT Bids</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && bids.length === 0 && <p>No bids available.</p>}
      {!loading && !error && bids.length > 0 && (
        <ul className="space-y-2">
          {bids.map((bid, index) => (
            <li key={index} className="p-2 border-b bg-gray-100 rounded">
              <p className="font-semibold">{bid.bidder}</p>
              <p>
                Bid <span className="font-bold">{bid.amount}</span> {bid.currency} on{" "}
                <span className="text-blue-600">{bid.nft_mint}</span>
              </p>
              <p className="text-gray-500 text-sm">Marketplace: {bid.marketplace}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
