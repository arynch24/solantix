// app/page.js
'use client';
import Link from 'next/link';
import LandingPage from '@/components/Home/LandingPage';

export default function Home() {
  return (
    <div className='w-full'>
      <LandingPage />
    </div>
  );
}
