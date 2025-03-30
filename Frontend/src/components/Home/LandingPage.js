import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Database, Settings, Zap, BarChart3, Shield, Clock, Wallet } from 'lucide-react';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleDashboardClick = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/api/auth/signin");
    }
  };

  return (
    <div >
      <div className='flex items-center justify-center'>
        {/* Hero Section */}
        <header className="text-center py-16 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Blockchain Indexing Platform<br/> <span className="text-indigo-600">on Helius</span>
          </h1>
          <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
            Easily integrate and index blockchain data into your Postgres database without managing complex infrastructure.
            Built on Helius for seamless, real-time data synchronization.
          </p>
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleDashboardClick} className="bg-indigo-600 hover:bg-indigo-700 text-white" >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </header>
      </div>

      <div className='flex items-center justify-center'>
        {/* Main Features */}
        <section className="py-16 px-6 w-full max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Powerful Indexing Made Simple</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Database className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle className="text-xl">Postgres Integration</CardTitle>
                <CardDescription className="text-gray-500">Connect directly to your database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Simply provide your Postgres credentials and we'll handle the rest. Your data stays in your control while we manage the indexing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Settings className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle className="text-xl">Customizable Indexing</CardTitle>
                <CardDescription className="text-gray-500">Choose what matters to you</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Select from a variety of data categories including NFT bids, token prices, available loans, and create custom index models.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Zap className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle className="text-xl">Real-time Updates</CardTitle>
                <CardDescription className="text-gray-500">Always synchronized data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Leveraging Helius webhooks, your database stays in perfect sync with blockchain events as they happen.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>


      </div>

      {/* Why Choose Us */}
      <section className="bg-indigo-50 w-full py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <Shield className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Zero Infrastructure Headaches</h3>
              <p className="text-gray-600">
                No need to manage RPCs, validators, or webhook infrastructure. We handle all the complexity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <Database className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Data Sovereignty</h3>
              <p className="text-gray-600">
                Your data lives in your Postgres database, giving you complete control and flexibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <div className='flex items-center justify-center'>

        <section className="w-full max-w-6xl py-16 px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <BarChart3 className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold mb-2">Real-time NFT Price Tracking</h3>
              <p className="text-gray-600 text-sm">Monitor NFT valuations as they change in the marketplace</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <Zap className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold mb-2">Fast and Secure Transactions</h3>
              <p className="text-gray-600 text-sm">Process thousands of transactions per second with enterprise-grade security</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <Clock className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold mb-2">Historical Data Access</h3>
              <p className="text-gray-600 text-sm">Query and analyze blockchain history with powerful SQL capabilities</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <Wallet className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold mb-2">Portfolio Management</h3>
              <p className="text-gray-600 text-sm">Track and analyze performance across all your blockchain assets</p>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="w-full bg-indigo-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Simplify Your Blockchain Data?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join hundreds of developers who are building with our platform.
          </p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
            Start Indexing Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
