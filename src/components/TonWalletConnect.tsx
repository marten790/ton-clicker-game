'use client';
import { useTonConnectUI } from '@tonconnect/ui-react';

export default function TonWalletConnect() {
  const [tonConnectUI] = useTonConnectUI();

  return (
    <button
      onClick={() => tonConnectUI.openModal()}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Connect Wallet
    </button>
  );
}
