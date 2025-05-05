'use client';

import { useTelegram } from '@/lib/useTelegram';
import Game from '@/components/Game';

export default function Page() {
  const { user, debugLog } = useTelegram();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-xl font-medium text-center px-4">
        <p>Loading user data...</p>
        <p className="text-sm text-gray-500 mt-2">
          If this doesnt load, please make sure youre opening the app from inside Telegram.
        </p>
        <div className="mt-4 bg-gray-100 p-3 rounded w-full max-w-md text-xs text-left">
          <strong>Debug Log:</strong>
          <ul className="mt-1 list-disc list-inside text-gray-700">
            {debugLog.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
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
