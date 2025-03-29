import { useState } from "react";

export default function Dashboard() {
  const [mintAddress, setMintAddress] = useState("");
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNFTDetails = async () => {
    if (!mintAddress) return;
    setLoading(true);
    setError(null);
    setNftData(null);

    try {
      const response = await fetch(`/api/search?mint=${mintAddress}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setNftData(data);
      console.log("🔍 Frontend Received Data:", data);
    } catch (err) {
      setError("NFT not found or invalid address");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6 flex flex-col items-center overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">NFT Dashboard</h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Mint Address"
          value={mintAddress}
          onChange={(e) => setMintAddress(e.target.value)}
          className="p-2 border border-gray-700 bg-gray-800 text-white rounded-md w-96"
        />
        <button
          onClick={fetchNFTDetails}
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {nftData && (
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl shadow-lg">
          {/* NFT Image */}
          <div className="flex justify-center">
            <img
              src={nftData.image}
              alt="NFT"
              className="w-64 h-64 object-cover rounded-lg mb-4"
            />
          </div>

          {/* NFT Details */}
          <h2 className="text-2xl font-bold mb-2">
            {nftData.name || "Unknown NFT"}
          </h2>
          <p className="text-gray-400">{nftData.description}</p>

          {/* Additional Info */}
          <div className="mt-4 text-sm space-y-2">
            <p><strong>Mint Address:</strong> {nftData.mintAddress}</p>
            <p><strong>Owner:</strong> {nftData.owner || "N/A"}</p>
            <p><strong>Collection:</strong> {nftData.collection || "N/A"}</p>
            <p><strong>Royalty:</strong> {nftData.royalty }</p>
            <p><strong>Primary Sale:</strong> {nftData.primarySale}</p>
          </div>

          {/* NFT Attributes */}
          {nftData.attributes && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Attributes</h3>
              <div className="grid grid-cols-2 gap-2">
                {nftData.attributes.map((attr, index) => (
                  <div key={index} className="p-2 bg-gray-700 rounded-md text-center">
                    <p className="text-sm text-gray-300">{attr.trait_type}</p>
                    <p className="font-semibold">{attr.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Link */}
          {nftData.externalUrl && (
            <div className="mt-4">
              <a
                href={nftData.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View on Official Site
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
