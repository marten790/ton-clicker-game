// src/components/Game.tsx
'use client';

import { useEffect, useState } from 'react';

const Game = () => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [enemyHealth, setEnemyHealth] = useState(10);

  const attackEnemy = () => {
    if (enemyHealth > 1) {
      setEnemyHealth(enemyHealth - 1);
    } else {
      setLevel(level + 1);
      setEnemyHealth(10 + level * 2);
      setPoints(points + 10);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-2xl font-bold text-center">Battle Arena</h2>

      <div className="bg-gray-100 rounded-xl p-4 shadow w-full max-w-sm text-center space-y-2">
        <p className="text-lg">🛡️ Level: <span className="font-semibold">{level}</span></p>
        <p className="text-lg">💰 Points: <span className="font-semibold">{points}</span></p>
        <p className="text-lg">👾 Enemy Health: <span className="font-semibold text-red-600">{enemyHealth}</span></p>
      </div>

      <button
        onClick={attackEnemy}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full text-lg transition"
      >
        ⚔️ Attack Enemy
      </button>
    </div>
  );
};

export default Game;
