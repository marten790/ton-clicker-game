// src/app/page.tsx
'use client';

import { useTelegram } from '@/lib/useTelegram';
import Game from '@/components/Game';

export default function Page() {
  const { user } = useTelegram();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-medium">
        Loading user data...
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-white p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Welcome, {user.first_name}!
      </h1>
      <Game />
    </main>
  );
}
