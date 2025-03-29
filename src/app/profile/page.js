'use client';

import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  if (!session) return <p>Please Sign in</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p>Welcome, {session.user.name}!</p>
      <img src={session.user.image} alt="Profile" className="w-20 h-20 rounded-full mt-2" />
      <button className="mt-4 bg-red-500 text-white px-4 py-2" onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
