'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <button 
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
}
