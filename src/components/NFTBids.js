import { useEffect, useState } from "react";

export default function NFTBids() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchNFTBids = async () => {
      const res = await fetch("/api/nft-bids");
      const data = await res.json();
      setBids(data);
    };
    fetchNFTBids();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">NFT Bids</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">NFT Mint</th>
            <th className="border p-2">Bidder</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Currency</th>
            <th className="border p-2">Marketplace</th>
            <th className="border p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.id}>
              <td className="border p-2">{bid.nft_mint}</td>
              <td className="border p-2">{bid.bidder}</td>
              <td className="border p-2">{bid.amount}</td>
              <td className="border p-2">{bid.currency}</td>
              <td className="border p-2">{bid.marketplace}</td>
              <td className="border p-2">{new Date(bid.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
