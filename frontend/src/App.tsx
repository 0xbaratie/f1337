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
  const { address } = useAccount()
  const [randomNumber, setRandomNumber] = useState('1337');
  const [connectedFarcaster, setConnectedFarcaster] = useState(false);
  const [farcasterName, setFarcasterName] = useState('');
  const [counter, setCounter] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
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
  }, [numberData]);

  useEffect(() => {
    
    if (address &&  !connectedFarcaster) {
      // [FOR TEST]
      // const addressA = "0x6d92e36f3c7c309f90e7ca98d06e6599649961e3"
      // SocialAccountData(addressA, setFarcasterName, setConnectedFarcaster, setError);
      SocialAccountData(address, setFarcasterName, setConnectedFarcaster, setError);
    }
  }, [address]);

  useEffect(() => {
    if (isSuccess && parseInt(yourNum) > 0) {
      setModalOpen(true);
    }
  }, [yourNum]);
  

  RandomInterval(counter, setCounter, setRandomNumber);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <FullScreenModal isOpen={modalOpen} onClose={closeModal}>
        <LotteryModal
          onClose={closeModal}
          yourNum={yourNum}
        />
      </FullScreenModal>
      
      <h1 className="text-3xl mt-10 text-primary font-bold text-center">How can we make a transaction at 1337?</h1>
      <p  className="mt-4 mb-6 text-ml text-primary-text font-bold">~ Powered by farcaster & Base ~ </p>

      <p  className="mt-4 mb-6 text-4xl text-primary-text font-bold">{randomNumber}</p>
      {address && connectedFarcaster ? (
        <>
          <WalletConnect />
          <a href={`https://warpcast.com/${farcasterName}`} className="mt-2 text-primary" target="_blank" rel="noopener noreferrer">
              @{farcasterName}
          </a>
          {isWriteLoading || parseInt(yourNum) > 0 ?
            <span className="mt-4 loading loading-spinner text-primary"></span>
            :
            <button className="mt-6 btn bg-primary text-white" type="button" onClick={() => write()}>
              Stop
            </button>
          }
        </>
      ) : (
        !address ? (
          <WalletConnect />
        ) : (
          <>
            <a href="https://www.farcaster.xyz/" className="underline mt-2 mb-2  text-red-400" target="_blank" rel="noopener noreferrer">
              Your wallet need to connect with farcaster account(Up to 5 accounts per sec via Airstack's API)
            </a>
            <WalletConnect />
            <button className="mt-2 btn bg-gray-700 text-black" disabled type="button">
              Stop
            </button>
          </>
        )
      )}
      <p  className="mt-16 text-sm text-primary-text">Latest 10 numbers</p>
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
      
    </div>
  );
};

export default App;
