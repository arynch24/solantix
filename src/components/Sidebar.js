// components/Sidebar.js
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <nav>
        <ul>
          <li className="mb-2"><Link href="/dashboard">Dashboard</Link></li>
          <li className="mb-2"><Link href="/profile">Profile</Link></li>
        </ul>
      </nav>
    </div>
  );
}
