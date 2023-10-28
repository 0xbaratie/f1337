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
  const [socialData, setSocialData] = useState([]);
  const [counter, setCounter] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const closeModal = () => {
    setModalOpen(false);
    setYourNum('');
  };
  const [latestNums, setLatestNums] = useState<string[]>(["....","....","....","....","....","....","....","...."]);
  const { data, isError, isLoading } = useContractRead({
    address: NFTContractAddress,
    abi: NFTContractAbi,
    functionName: 'getLotteryNumbers',
    watch: true,
  })
  const [yourNum, setYourNum] = useState('');

  const { data: writeData, isLoading: isWriteLoading, isSuccess, write  } = useContractWrite({
    address: NFTContractAddress,
    abi: NFTContractAbi,
    functionName: 'mint',
  })

  const hashValue = writeData?.hash;
  const { data: waitData, isError: waitIsError, isLoading: waitIsLoading } = useWaitForTransaction({
    hash: hashValue,
    onSettled(data, error) {
      const response = data ? data.logs[0] : [];
      
      if ("data" in response) {
          const responseData = response.data;
          setYourNum('1');
          // setYourNum(parseInt(responseData, 16).toString());
          // console.log("@@response=", response);
          // console.log("@@responseData=", parseInt(responseData, 16).toString());
      }
  }
  })

  const NumberSpan: React.FC<NumberSpanProps> = ({ children, marginRight = true }) => (
    <span className={`text-primary-text font-bold mb-2 md:mb-0 ${marginRight ? 'mr-8' : ''} font-mono`}>
      {children}
    </span>
  );

  useEffect(() => {
    console.log("@@@stringifiedNums=", data);
    // if (Array.isArray(data) && data.length === 8) {
      // const stringifiedNums = data.map(num => num.toString().padStart(4, '0')).reverse();
      // setLatestNums(stringifiedNums);
    // }
  }, [data]);

  useEffect(() => {
    if (address && socialData.length === 0 && !connectedFarcaster) {
      SocialAccountData(address, setSocialData, setFarcasterName, setConnectedFarcaster, setError);
    }
  }, [address]);

  useEffect(() => {
    // if (isSuccess && parseInt(yourNum) > 0) {
    //   setModalOpen(true);
    // }
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
      <p  className="mt-4 text-ml text-primary-text font-bold">~ Powered by farcaster & Base ~ </p>
      

    </div>
  );
};

export default App;
