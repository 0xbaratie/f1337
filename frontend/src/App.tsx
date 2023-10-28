import React, { useState, useEffect } from 'react';
import { WalletConnect } from './WalletConnect';
import {
  useConnectModal
} from '@rainbow-me/rainbowkit';
import {
  useAccount,
  useContractRead
} from 'wagmi'
import { ConnectedSocialAccount } from "./graphql/ConnectedSocialAccount";
import { NFTContractAbi } from './data/NFTContractAbi';
import { NFTContractAddress } from './data/NFTContractAddress';

type SocialType = {
  dappName: string;
  profileName: string;
};

const App = () => {
  const { address } = useAccount()
  const [randomNumber, setRandomNumber] = useState('1337');
  const [connectedFarcaster, setConnectedFarcaster] = useState(false);
  const [farcasterName, setFarcasterName] = useState('');
  const [socialData, setSocialData] = useState([]);
  const [counter, setCounter] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [latestNums, setLatestNums] = useState<string[]>(["....","....","....","....","....","....","....","...."]);

  async function fetchData(address: string) {
    try {
      const data = await ConnectedSocialAccount(address);
      if (data && data.Socials && data.Socials.Social) {
        setSocialData(data.Socials.Social);

        const farcasterSocial = data.Socials.Social.find((social: SocialType) =>
            social.dappName.includes("farcaster")
        );

        if (farcasterSocial) {
            setFarcasterName(farcasterSocial.profileName);
            setConnectedFarcaster(true);
        } else {
            setConnectedFarcaster(false);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  }

  const { data, isError, isLoading } = useContractRead({
    address: NFTContractAddress,
    abi: NFTContractAbi,
    functionName: 'getLotteryNumbers',
  })
  useEffect(() => {
    if (Array.isArray(data) && data.length === 8) {
      const stringifiedNums = data.map(num => num.toString());
      setLatestNums(stringifiedNums);
    }
  }, [data]);

  useEffect(() => {
    if (address && socialData.length === 0 && !connectedFarcaster) {
      // fetchData(address);
    }
  }, [address]);

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
    }, 50);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl mt-10 text-primary font-bold text-center">How can we make a transaction at 1337?</h1>
      <p  className="mt-4 text-ml text-primary-text font-bold">~ Powered by farcaster & Base ~ </p>
      <div className="mt-10">
        <div className="flex flex-wrap justify-between mb-4">
          <span className="text-primary-text font-bold mb-2 md:mb-0 md:mr-8 font-mono">....</span>
          <span className="text-primary-text font-bold mb-2 md:mb-0 md:mr-8 font-mono">{latestNums[0]}</span>
          <span className="text-primary-text font-bold mb-2 md:mb-0 md:mr-8 font-mono">{latestNums[1]}</span>
          <span className="text-primary-text font-bold mb-2 md:mb-0 md:mr-8 font-mono">{latestNums[2]}</span>
          <span className="text-primary-text font-bold mb-2 md:mb-0 font-mono">{latestNums[3]}</span>
        </div>
        <div className="flex flex-wrap justify-between">
          <span className="text-primary-text font-bold mb-2 md:mb-0 md:mr-8 font-mono">{latestNums[4]}</span>
          <span className="text-primary-text font-bold mb-2 md:mb-0 md:mr-8 font-mono">{latestNums[5]}</span>
          <span className="text-primary-text font-bold mb-2 md:mb-0 md:mr-8 font-mono">{latestNums[6]}</span>
          <span className="text-primary-text font-bold mb-2 md:mb-0 md:mr-8 font-mono">{latestNums[7]}</span>
          <span className="text-primary mb-2 md:mb-0 font-mono">{randomNumber}</span>
        </div>
      </div>
      <div
        className="mt-12 flex justify-end p-3"
      >

      </div>
      {address && connectedFarcaster ? (
        <>
          <WalletConnect />
          <a href={`https://warpcast.com/${farcasterName}`} className="mt-2 text-primary" target="_blank" rel="noopener noreferrer">
              @{farcasterName}
          </a>
          <button className="mt-6 btn bg-primary text-white" type="button">
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
