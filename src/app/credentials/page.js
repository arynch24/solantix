'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Credentials() {
  const [postgresUser, setPostgresUser] = useState('');
  const [postgresPassword, setPostgresPassword] = useState('');
  const router = useRouter();

  const handleSave = () => {
    if (postgresUser && postgresPassword) {
      Cookies.set('postgres', JSON.stringify({ postgresUser, postgresPassword }), { expires: 1 });
      router.push('/profile');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Enter PostgreSQL Credentials</h2>
      <input type="text" placeholder="Username" className="p-2 border" value={postgresUser} onChange={(e) => setPostgresUser(e.target.value)} />
      <input type="password" placeholder="Password" className="p-2 border mt-2" value={postgresPassword} onChange={(e) => setPostgresPassword(e.target.value)} />
      <button className="mt-4 bg-blue-500 text-white px-4 py-2" onClick={handleSave}>Save & Continue</button>
    </div>
  );
}
