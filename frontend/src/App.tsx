import React, { useState, useEffect } from 'react';
import { WalletConnect } from './WalletConnect';
import {
  useAccount,
  useContractRead
} from 'wagmi'
import { ConnectedSocialAccount } from "./graphql/ConnectedSocialAccount";
import { NFTContractAbi } from './data/NFTContractAbi';
import { NFTContractAddress } from './data/NFTContractAddress';
import SocialAccountData from './data/SocialAccountData';
import RandomInterval from './data/RandomInterval';

type NumberSpanProps = {
  children: React.ReactNode;
  marginRight?: boolean;
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
  const { data, isError, isLoading } = useContractRead({
    address: NFTContractAddress,
    abi: NFTContractAbi,
    functionName: 'getLotteryNumbers',
  })
  const NumberSpan: React.FC<NumberSpanProps> = ({ children, marginRight = true }) => (
    <span className={`text-primary-text font-bold mb-2 md:mb-0 ${marginRight ? 'mr-8' : ''} font-mono`}>
      {children}
    </span>
  );

  useEffect(() => {
    console.log("@@@stringifiedNums=", data);
    if (Array.isArray(data) && data.length === 8) {
      const stringifiedNums = data.map(num => num.toString());
      setLatestNums(stringifiedNums);
    }
  }, [data]);

  useEffect(() => {
    if (address && socialData.length === 0 && !connectedFarcaster) {
      SocialAccountData(address, setSocialData, setFarcasterName, setConnectedFarcaster, setError);
    }
  }, [address]);

  RandomInterval(counter, setCounter, setRandomNumber);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl mt-10 text-primary font-bold text-center">How can we make a transaction at 1337?</h1>
      <p  className="mt-4 text-ml text-primary-text font-bold">~ Powered by farcaster & Base ~ </p>
      <div className="mt-10">
        <div className="flex flex-wrap justify-between mb-4">
          <NumberSpan>....</NumberSpan>
          {latestNums.slice(0, 4).map((num, index) => (
            <NumberSpan key={index} marginRight={index !== 3}>{num}</NumberSpan>
          ))}
        </div>
        <div className="flex flex-wrap justify-between">
          {latestNums.slice(4).map((num, index) => (
            <NumberSpan key={index + 4} marginRight={true}>{num}</NumberSpan>
          ))}
          <NumberSpan marginRight={false}>{randomNumber}</NumberSpan>
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
