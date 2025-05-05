'use client';
import { useTelegram } from '@/lib/useTelegram';

export default function Home() {
  const { user } = useTelegram();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome {user?.first_name || 'Player'}</h1>
    </div>
  );
}
