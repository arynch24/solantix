"use client";
import { useState, useEffect } from "react";

export default function TransactionsTable() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchWebhookData = async () => {
            const response = await fetch("/api/webhooks");
            const data = await response.json();
            setTransactions(data.transactions || []);
        };

        fetchWebhookData();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Webhook Transactions</h2>
            {transactions.length === 0 ? (
                <p>No transactions received yet.</p>
            ) : (
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
            )}
        </div>
    );
}
