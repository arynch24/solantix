"use client"; // Only for App Router (Next.js 13+)

import { useState } from "react";

export default function TransactionsTable() {
    const [walletAddress, setWalletAddress] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);

        console.log("Fetching transactions for wallet:", walletAddress);

        try {
            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ walletAddress }),
            });

            const data = await response.json();
            if (response.ok) {
                setTransactions(data.result || []);
            } else {
                setError(data.error || "Failed to fetch transactions");
            }
        } catch (err) {
            setError("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Fetch Solana Transactions</h2>
            
            {/* Wallet Input Field */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter Wallet Address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                />
                <button 
                    onClick={fetchTransactions} 
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? "Loading..." : "Fetch"}
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="mt-4 text-red-500">{error}</p>}

            {/* Transactions Table */}
            {transactions.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Transactions:</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-700">
                            <thead>
                                <tr className="bg-gray-800">
                                    <th className="p-2 border border-gray-600">Signature</th>
                                    <th className="p-2 border border-gray-600">Slot</th>
                                    <th className="p-2 border border-gray-600">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx, index) => (
                                    <tr key={index} className="bg-gray-700">
                                        <td className="p-2 border border-gray-600">{tx.signature}</td>
                                        <td className="p-2 border border-gray-600">{tx.slot}</td>
                                        <td className="p-2 border border-gray-600">
                                            {new Date(tx.blockTime * 1000).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
