'use client';
import { useState } from 'react';

export default function ClickerGame() {
  const [hp, setHp] = useState(10);
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);

  const attack = () => {
    const newHp = hp - 1;
    setHp(newHp);
    setPoints(points + 1);

    if (newHp <= 0) {
      setLevel(level + 1);
      setHp(10 + level * 5); // tougher enemies
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Level: {level}</h2>
      <p>Enemy HP: {hp}</p>
      <p>Points: {points}</p>
      <button
        onClick={attack}
        className="bg-red-600 px-4 py-2 text-white rounded mt-4"
      >
        Attack
      </button>
    </div>
  );
}
