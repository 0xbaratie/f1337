import React, { useState, useEffect } from 'react';
import { WalletConnect } from './WalletConnect';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { NFTContractAbi } from './data/NFTContractAbi';
import { NFTContractAddress } from './data/NFTContractAddress';
import SocialAccountData from './data/SocialAccountData';
import RandomInterval from './data/RandomInterval';
import FullScreenModal from './components/FullScreenModal';
import LotteryModal from './components/LotteryModal';

type NumberSpanProps = {
  children: React.ReactNode;
  marginRight?: boolean;
};

const App = () => {
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

      
      <h1 className="text-3xl mt-10 text-primary font-bold text-center">How can we make a transaction at 1337?</h1>
      <p  className="mt-4 text-ml text-primary-text font-bold">~ Powered by farcaster & Base ~ </p>
      

    </div>
  );
};

export default App;
