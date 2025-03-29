import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Search, SlidersHorizontal, Download, ArrowUp, ArrowDown } from 'lucide-react';
import NFTTable from './NFTTable';

const ProductAnalyticsDashboard = () => {
  const [mintAddress, setMintAddress] = useState("");
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNFTDetails = async () => {
    setMintAddress("");

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


  const [activeTab, setActiveTab] = useState('product');



  // Mock data
  const products = [
    { id: 1, name: 'New Balance Men\'s 608 V5 Casual Comfort Cross Trainer', price: '$45', shop: 'WearPhysique', visibility: 95, revenue: '$27,450' },
    { id: 2, name: 'Sperry Top-Sider Men\'s Billfish Ultralite Boat Shoe', price: '$72', shop: 'MuwaitUK', visibility: 80, revenue: '$15,340' },
    { id: 3, name: 'Men\'s Minimalist Stainless Steel Slim Watch', price: '$124', shop: 'SeFashion', visibility: 55, revenue: '$12,380' },
    { id: 4, name: 'Timberland Men\'s Classic Leather Belt', price: '$32', shop: 'Twoday', visibility: 95, revenue: '$8,750' },
    { id: 5, name: 'KBETHOS Original Classic Low Profile Cap', price: '$24', shop: 'Manifestable', visibility: 80, revenue: '$6,450' },
    { id: 6, name: 'Light Abstract Shapes iPhone 14 Case', price: '$27', shop: 'JewalinCo', visibility: 75, revenue: '$5,840' },
    { id: 7, name: 'Embroidered BMO Beanie Hat', price: '$14', shop: 'MinimalFas', visibility: 95, revenue: '$5,655' }
  ];


  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4 space-y-6 overflow-y-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">NFT Analytics</h1>
          <p className="text-gray-500">Navigating Data for Informed Product Decisions</p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Enter Mint Address"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              className="pl-8"
            />
            <Search
              onClick={fetchNFTDetails}
              className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-300"
            />

            {loading && (
              <div className="absolute right-2 top-2.5 flex items-center gap-2 text-gray-400">
                <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-transparent rounded-full"></div>
                <span className="text-sm">Loading...</span>
              </div>
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <Button variant="outline" size="sm">
              SOL
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className='flex w-1/2 gap-6'>
          {/* NFT Image */}
          <div className="flex justify-center">
            <img
              src={nftData?.image}
              alt="NFT"
              className="w-64 h-64 object-cover rounded-lg mb-4"
            />
          </div>

          {/* NFT Details */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {nftData?.name || "Unknown NFT"}
            </h2>
            <p className="text-gray-400">{nftData?.description}</p>
          </div>
        </div>
        {/* Additional Info */}
        <div className="mt-4 text-sm pr-10 space-y-2">
          <p><strong>Mint Address:</strong> {nftData?.mintAddress}</p>
          <p><strong>Owner:</strong> {nftData?.owner || "N/A"}</p>
          <p><strong>Collection:</strong> {nftData?.collection || "N/A"}</p>
          <p><strong>Royalty:</strong> {nftData?.royalty}</p>
          <p><strong>Primary Sale:</strong> {nftData?.primarySale}</p>
        </div>

      </div>
      <div className="bg-white rounded-lg shadow">
        <NFTTable mintAddress={mintAddress} />
      </div>
    </div>
  );
};

export default ProductAnalyticsDashboard;