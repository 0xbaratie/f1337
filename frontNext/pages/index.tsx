import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { WalletConnect } from '../components/WalletConnect';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { NFTContractAbi } from '../data/NFTContractAbi';
import { NFTContractAddress } from '../data/NFTContractAddress';
import SocialAccountData from '../data/SocialAccountData';
import RandomInterval from '../data/RandomInterval';
import FullScreenModal from '../components/FullScreenModal';
import LotteryModal from '../components/LotteryModal';
import { Footer } from '../components/Footer';

type NumberSpanProps = {
  children: React.ReactNode;
  marginRight?: boolean;
};

const Home: NextPage = () => {
  const { address } = useAccount()
  const [randomNumber, setRandomNumber] = useState('1337');
  const [connectedFarcaster, setConnectedFarcaster] = useState(false);
  const [farcasterName, setFarcasterName] = useState('');
  const [counter, setCounter] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const closeModal = () => {
    setModalOpen(false);
    setYourNum('');
  };
  const [latestNums, setLatestNums] = useState<string[]>(Array(10).fill("...."));

  const { data: numberData } = useContractRead({
    address: NFTContractAddress,
    abi: NFTContractAbi,
    functionName: 'getLotteryNumber',
    watch: true,
  })

  const [yourNum, setYourNum] = useState('');

  const { data: writeData, isLoading: isWriteLoading, isSuccess, write  } = useContractWrite({
    address: NFTContractAddress,
    abi: NFTContractAbi,
    functionName: 'mint',
  })

  const hashValue = writeData?.hash;

  useWaitForTransaction({
    hash: hashValue,
    onSettled(data, error) {
        const response = data ? data.logs[0] : [];
        
        if ("data" in response) {
            const responseData = response.data;
            setYourNum(parseInt(responseData, 16).toString());
            console.log("@@response=", response);
            console.log("@@responseData=", parseInt(responseData, 16).toString());
        }
    }
  })

  const NumberSpan: React.FC<NumberSpanProps> = ({ children, marginRight = true }) => (
    <span className={`text-primary-text font-bold mb-2 md:mb-0 ${marginRight ? 'mr-8' : ''} font-mono`}>
      {children}
    </span>
  );


  useEffect(() => {

    if (numberData !== undefined) {
      const numberAsString = numberData.toString().padStart(4, '0');
      
      setLatestNums(prevNums => {
        if (!prevNums.includes(numberAsString)) {
          const newNums = [numberAsString, ...prevNums];
          return newNums.slice(0, 10);
        }
        return prevNums; 
      });
    }
    
    if (address &&  !connectedFarcaster) {
      // [FOR TEST]
      // const addressTest = "0x6d92e36f3c7c309f90e7ca98d06e6599649961e3"
      // SocialAccountData(addressTest, setFarcasterName, setConnectedFarcaster, setError);
      SocialAccountData(address, setFarcasterName, setConnectedFarcaster, setError);
    }

    if (isSuccess && parseInt(yourNum) > 0) {
      setLatestNums(prevNums => {
        if (!prevNums.includes(yourNum)) {
          const numberAsString = yourNum.toString().padStart(4, '0');
          return [numberAsString, ...prevNums.slice(0, 9)];
        }
        return prevNums;
      });
      setModalOpen(true);
    }
    setIsClient(true);
  }, [address, yourNum, numberData]);

  

  RandomInterval(counter, setCounter, setRandomNumber);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <FullScreenModal isOpen={modalOpen} onClose={closeModal}>
        <LotteryModal
          onClose={closeModal}
          yourNum={yourNum}
        />
      </FullScreenModal>
      
      <h1 className="font-mincho text-3xl mt-10 text-primary font-extrabold text-center">Are you 1337?</h1>
      <p  className="font-mincho mt-2 mb-6 text-sm text-primary-text">Based on Farcaster & Base</p>

      <p  className="mt-4 mb-6 text-4xl text-primary-text font-bold">{randomNumber}</p>
      <WalletConnect />
      {isClient && address && (
        <>
          {connectedFarcaster ? (
            <>
              <a href={`https://warpcast.com/${farcasterName}`} className="mt-2 text-primary" target="_blank" rel="noopener noreferrer">
                @{farcasterName}
              </a>
              {isWriteLoading || parseInt(yourNum) > 0 ? (
                <span className="mt-4 loading loading-spinner text-primary"></span>
              ) : (
                <button className="mt-6 btn bg-primary text-white hover:bg-primary-hover" type="button" onClick={() => write()}>
                  Stop
                </button>
              )}
            </>
          ) : (
            <>
              <a href="https://www.farcaster.xyz/" className="underline mt-4 mb-2 text-red-400 text-center" target="_blank" rel="noopener noreferrer">
                Your wallet needs to connect with a farcaster account (Only get 5/sec for all users due to Airstack API)
              </a>
              <button className="mt-2 btn bg-gray-700 text-black disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed" disabled type="button">
                Stop
              </button>
            </>
          )}
        </>
      )}
      <p  className="font-mincho mt-16 text-sm text-primary-text">Latest 10 numbers</p>
      <div className="mt-4">
        <div className="flex flex-wrap justify-between mb-4">
          {latestNums.slice(0, 5).map((num, index) => (
            <NumberSpan key={index} marginRight={index !== 4}>{num}</NumberSpan>
          ))}
        </div>
        <div className="flex flex-wrap justify-between">
          {latestNums.slice(5).map((num, index) => (
            <NumberSpan key={index + 5} marginRight={index !== 4}>{num}</NumberSpan>
          ))}
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default Home;
