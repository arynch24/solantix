"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "NFTs", description: "Manage and track NFTs" },
  { name: "Transactions", description: "View and analyze transactions" },
  { name: "Wallets", description: "Connect and monitor wallets" },
  { name: "Smart Contracts", description: "Deploy and interact with contracts" },
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Select a Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card
            key={category.name}
            className={`cursor-pointer hover:shadow-lg transition ${
              selectedCategory === category.name ? "border-blue-500" : ""
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Enter Details for {selectedCategory}</h2>
          <Input
            placeholder={`Enter ${selectedCategory} details (e.g., NFT Address)`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button>Submit</Button>
        </div>
      )}
    </div>
  );
}
