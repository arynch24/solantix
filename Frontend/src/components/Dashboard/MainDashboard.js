import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, CornerDownLeft } from "lucide-react";
import NFTTable from './NFTTable';

const defaultNFT = {
  name: "Loading...",
  description: "Fetching NFT data...",
  image: "/placeholder.png",
  mintAddress: "N/A",
  owner: "N/A",
  collection: "N/A",
  royalty: "N/A",
  primarySale: "N/A",
};

const ProductAnalyticsDashboard = () => {
  const [mintAddress, setMintAddress] = useState("");
  const [nftData, setNftData] = useState(defaultNFT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNFTDetails = async () => {
    setMintAddress("");
    if (!mintAddress) return;
    setLoading(true);
    setError(null);
    setNftData(defaultNFT);

    try {
      const response = await fetch(`/api/search?mint=${mintAddress}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setNftData(data);
      console.log("🔍 Frontend Received Data:", data);
    } catch (err) {
      setError("NFT not found or invalid address");
      setNftData(defaultNFT);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">NFT Analytics</h1>
          <p className="text-gray-500">Navigating Data for Informed Product Decisions</p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Search Input */}
          <div className="relative w-96">
            <Input
              type="text"
              placeholder="Enter Mint Address"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchNFTDetails()} // Execute on Enter key
              className="pl-8 pr-8" // Added padding for right icon space
            />

            {/* Search Icon (Left) */}
            <Search
              onClick={fetchNFTDetails}
              className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-300"
            />

            {/* Enter Icon (Right) */}
            <CornerDownLeft
              onClick={fetchNFTDetails}
              className="absolute right-1.5 top-1.5 h-6 w-6 text-gray-500 cursor-pointer 
             transition-colors duration-200 ease-in-out 
             hover:bg-blue-500 hover:text-white p-1 rounded-sm"
            />


            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

      </div>

      {/* NFT Display Section */}
      <div className="flex justify-between">
        <div className='flex w-1/2 gap-6'>
          {/* NFT Image with Skeleton Loader */}
          <div className="flex justify-center">
            {loading ? (
              <div className="w-44 h-44 bg-gray-300 animate-pulse rounded-lg" />
            ) : (
              <img
                src={nftData?.image}
                alt="NFT"
                className="w-44 h-44 object-cover rounded-lg mb-4"
              />
            )}
          </div>

          {/* NFT Details */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {loading ? (
                <div className="w-32 h-6 bg-gray-300 animate-pulse rounded-md"></div>
              ) : (
                nftData?.name || "Unknown NFT"
              )}
            </h2>
            <p className="text-gray-400">
              {loading ? (
                <div className="w-48 h-4 bg-gray-300 animate-pulse rounded-md"></div>
              ) : (
                nftData?.description
              )}
            </p>
          </div>
        </div>

        {/* Additional Info with Skeleton Loader */}
        <div className="mt-4 text-sm pr-10 space-y-2">
          <p><strong>Mint Address:</strong> {loading ? <div className="inline-block w-32 h-4 bg-gray-300 animate-pulse rounded-md"></div> : nftData?.mintAddress}</p>
          <p><strong>Owner:</strong> {loading ? <div className="inline-block w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div> : nftData?.owner}</p>
          <p><strong>Collection:</strong> {loading ? <div className="inline-block w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div> : nftData?.collection}</p>
          <p><strong>Royalty:</strong> {loading ? <div className="inline-block w-16 h-4 bg-gray-300 animate-pulse rounded-md"></div> : nftData?.royalty}</p>
          <p><strong>Primary Sale:</strong> {loading ? <div className="inline-block w-16 h-4 bg-gray-300 animate-pulse rounded-md"></div> : nftData?.primarySale}</p>
        </div>
      </div>

      {/* NFT Table */}
      <div className="bg-white rounded-lg shadow">
        <NFTTable mintAddress={mintAddress} />
      </div>
    </div>
  );
};

export default ProductAnalyticsDashboard;
