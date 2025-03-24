import TransactionsTable from "@/components/TransactionTable";

export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <TransactionsTable />
        </main>
    );
}
