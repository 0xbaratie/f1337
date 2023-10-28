import React, { useState, useEffect } from 'react';
import { WalletConnect } from './WalletConnect';
import {
  useConnectModal
} from '@rainbow-me/rainbowkit';
import {
  useAccount,
} from 'wagmi'

const App = () => {
  const { address } = useAccount()
  const [randomNumber, setRandomNumber] = useState('1337');
  const [connectedFarcaster, setConnectedFarcaster] = useState(false);
  console.log("@@@address=",address);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      let num;

      if (counter === 10) {
        num = 1377;
        setCounter(1);
      } else {
        num = Math.floor(Math.random() * 9000) + 1000;
        setCounter(prev => prev + 1);
      }

      setRandomNumber(num.toString());
    }, 100);

    return () => clearInterval(interval);
  }, [counter]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl mt-10 text-primary font-bold text-center">How can we make a transaction at 1337?</h1>
      <p  className="mt-2 text-ml text-gray-400 font-bold">~ Powered by farcaster & Base ~ </p>
      <div className="mt-10">
        <div className="flex flex-wrap justify-between mb-4">
          <span className="text-gray-400 font-bold mb-2 md:mb-0 md:mr-8 font-mono">....</span>
          <span className="text-gray-400 font-bold mb-2 md:mb-0 md:mr-8 font-mono">2222</span>
          <span className="text-gray-400 font-bold mb-2 md:mb-0 md:mr-8 font-mono">3333</span>
          <span className="text-gray-400 font-bold mb-2 md:mb-0 md:mr-8 font-mono">4444</span>
          <span className="text-gray-400 font-bold mb-2 md:mb-0 font-mono">5555</span>
        </div>
        <div className="flex flex-wrap justify-between">
          <span className="text-gray-400 font-bold mb-2 md:mb-0 md:mr-8 font-mono">1111</span>
          <span className="text-gray-400 font-bold mb-2 md:mb-0 md:mr-8 font-mono">2222</span>
          <span className="text-gray-400 font-bold mb-2 md:mb-0 md:mr-8 font-mono">3333</span>
          <span className="text-primary font-bold mb-2 md:mb-0 md:mr-8 font-mono">4444</span>
          <span className="text-primary mb-2 md:mb-0 font-mono">{randomNumber}</span>
        </div>
      </div>
      <div
        className="mt-12 flex justify-end p-3"
      >

      </div>
      {address && connectedFarcaster ? (
        <>
          <button className="mt-4 btn bg-primary text-white" type="button">
            Stop number
          </button>
        </>
      ) : (
        !address ? (
          <WalletConnect />
        ) : (
          <>
            <a href="https://www.farcaster.xyz/" className="underline mt-2 text-red-400" target="_blank" rel="noopener noreferrer">
              Your wallet need to connect with farcaster account
            </a>
            <WalletConnect />
            <button className="mt-2 btn bg-gray-700 text-black" disabled type="button">
              Stop number
            </button>
          </>
        )
      )}

    </div>
  );
};

export default App;
