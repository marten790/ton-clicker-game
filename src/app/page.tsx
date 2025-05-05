'use client';

import { useTelegram } from '@/lib/useTelegram';
import Game from '@/components/Game';
import { useEffect, useState } from 'react';

export default function Page() {
  const { user, debugLog } = useTelegram();
  const [debugDetails, setDebugDetails] = useState<{
    telegram: string;
    webApp: string;
    initDataUnsafe: string;
  }>({
    telegram: 'Not available',
    webApp: 'Not available',
    initDataUnsafe: 'Not available',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tg = window.Telegram;
      const webApp = tg?.WebApp;
      const initData = webApp?.initDataUnsafe;

      setDebugDetails({
        telegram: tg ? JSON.stringify(tg, null, 2) : '❌ Telegram not found',
        webApp: webApp ? JSON.stringify(webApp, null, 2) : '❌ WebApp not found',
        initDataUnsafe: initData ? JSON.stringify(initData, null, 2) : '❌ initDataUnsafe not found',
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-xl font-medium text-center px-4">
        <p>Loading user data...</p>
        <p className="text-sm text-gray-500 mt-2">
          If this doesnt load, please make sure youre opening the app from inside Telegram.
        </p>

        <div className="mt-6 w-full max-w-2xl text-left text-xs space-y-4">
          <div className="bg-gray-100 p-3 rounded">
            <strong>✅ Debug Log:</strong>
            <ul className="mt-1 list-disc list-inside text-gray-700">
              {debugLog.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-3 rounded overflow-x-auto">
            <strong>🧠 window.Telegram:</strong>
            <pre className="whitespace-pre-wrap break-words">{debugDetails.telegram}</pre>
          </div>

          <div className="bg-gray-50 p-3 rounded overflow-x-auto">
            <strong>🧩 Telegram.WebApp:</strong>
            <pre className="whitespace-pre-wrap break-words">{debugDetails.webApp}</pre>
          </div>

          <div className="bg-gray-50 p-3 rounded overflow-x-auto">
            <strong>📦 initDataUnsafe:</strong>
            <pre className="whitespace-pre-wrap break-words">{debugDetails.initDataUnsafe}</pre>
          </div>
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
