import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useSession } from 'next-auth/react';

const API_ENDPOINTS = {
    nft_prices: '/api/nft-prices',
    nft_sales: '/api/nft-sales',
    nft_listings: '/api/nft-listings',
    nft_transfers: '/api/nft-transfers'
};

const TABLE_COLUMNS = {
    nft_prices: ['Transaction ID', 'Transaction Type', 'NFT Address', 'Collection', 'Seller', 'Buyer', 'Price (SOL)', 'Marketplace'],
    nft_sales: ['Sale ID', 'NFT Address', 'Buyer', 'Seller', 'Sale Price', 'Sale Date'],
    nft_listings: ['Listing ID', 'NFT Address', 'Seller', 'Listed Price', 'Marketplace', 'Listed Date'],
    nft_transfers: ['Transfer ID', 'NFT Address', 'From', 'To', 'Transfer Date']
};

const ProductAnalyticsDashboard = ({ mintAddress }) => {
    const [activeTab, setActiveTab] = useState('nft_prices');
    const [tableData, setTableData] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);
    const { data: session } = useSession();
    const githubId = session?.user?.id;

    useEffect(() => {
        const fetchTableData = async () => {
            setTableLoading(true);
            try {
                const response = await fetch(`${API_ENDPOINTS[activeTab]}?githubId=${githubId}&mintAddress=${mintAddress}`);
                const data = await response.json();
                setTableData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setTableLoading(false);
        };

        fetchTableData();
        const interval = setInterval(fetchTableData, 5000);
        return () => clearInterval(interval);
    }, [activeTab, githubId, mintAddress]);

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto p-4 space-y-6 overflow-y-auto">
            <Tabs defaultValue="nft_prices" onValueChange={setActiveTab}>
                <TabsList>
                    {Object.keys(API_ENDPOINTS).map((key) => (
                        <TabsTrigger key={key} value={key}>{key.replace('_', ' ')}</TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value={activeTab} className="mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {TABLE_COLUMNS[activeTab]?.map((col, index) => (
                                    <TableHead key={index}>{col}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tableLoading ? (
                                [...Array(5)].map((_, index) => (
                                    <TableRow key={index}>
                                        {TABLE_COLUMNS[activeTab].map((_, idx) => (
                                            <TableCell key={idx} className="animate-pulse bg-gray-200 h-6"></TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                tableData.map((row, index) => (
                                    <TableRow key={index}>
                                        {TABLE_COLUMNS[activeTab].map((col, idx) => (
                                            <TableCell key={idx}>{row[col.toLowerCase().replace(/ /g, '_')] || 'N/A'}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ProductAnalyticsDashboard;
