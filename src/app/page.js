// app/page.js
'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
      <Link href="/signin">
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
      </Link>
    </div>
  );
}
