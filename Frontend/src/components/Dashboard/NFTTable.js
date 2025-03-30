import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSession } from 'next-auth/react';

const TABLE_COLUMNS = {
    NFT_PRICES: ['Transaction ID', 'Transaction Type', 'NFT Address', 'NFT Collection', 'Seller Address', 'Buyer Address', 'Price Amount', 'Marketplace'],
    NFT_BIDS: ['Sale ID', 'NFT Address', 'Buyer', 'Seller', 'Sale Price', 'Sale Date'],
    TOKEN_PRICES: ['Listing ID', 'NFT Address', 'Seller', 'Listed Price', 'Marketplace', 'Listed Date'],
    TOKEN_LOANS: ['Transfer ID', 'NFT Address', 'From', 'To', 'Transfer Date']
};

// Mapping API response keys to UI table columns
const COLUMN_MAPPINGS = {
    "Transaction ID": "transaction_id",
    "Transaction Type": "transaction_type",
    "NFT Address": "nft_address",
    "NFT Collection": "nft_collection",
    "Seller Address": "seller_address",
    "Buyer Address": "buyer_address",
    "Price Amount": "price_amount",
    "Marketplace": "marketplace"
};

const ProductAnalyticsDashboard = ({ mintAddress }) => {
    const [activeTab, setActiveTab] = useState('NFT_PRICES');
    const [tableData, setTableData] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);
    const { data: session } = useSession();
    const githubId = session?.user?.id;

    useEffect(() => {
        if (!githubId || !mintAddress) return; // Prevent unnecessary API calls

        const fetchTableData = async () => {
            setTableLoading(true);
            try {
                const response = await fetch(`https://ef28-203-92-62-90.ngrok-free.app/api/fetchData/getNftData?githubId=${githubId}&nftAddress=${mintAddress}&category=${activeTab}`);
                
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const { data } = await response.json();
                setTableData(data || []);
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
            <Tabs defaultValue="NFT_PRICES" onValueChange={setActiveTab}>
                <TabsList>
                    {Object.keys(TABLE_COLUMNS).map((key) => (
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
                                tableData.length > 0 ? tableData.map((row, index) => (
                                    <TableRow key={index}>
                                        {TABLE_COLUMNS[activeTab].map((col, idx) => (
                                            <TableCell key={idx}>{row[COLUMN_MAPPINGS[col]] || 'N/A'}</TableCell>
                                        ))}
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={TABLE_COLUMNS[activeTab].length} className="text-center py-4">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ProductAnalyticsDashboard;
