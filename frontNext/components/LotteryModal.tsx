import { parse } from 'path';
import React, { useEffect, useState } from 'react';

interface LotteryModalProps {
  onClose: () => void;
  yourNum: string;
}

const LotteryModal = ({ onClose, yourNum }: LotteryModalProps) => {
  const [randomGifNum, setRandomGifNum] = useState<number>(0);
  const numberAsString = yourNum.toString().padStart(4, '0');

  useEffect(() => {
    const generatedNum = Math.floor(Math.random() * 22);
    setRandomGifNum(generatedNum);
  }, [yourNum]);

  return (
    <div className="p-6">
      <p className="mb-4 sm:text-3xl text-xl mt-4 text-primary font-bold text-center">The number is {numberAsString}</p>
      
      <div className="grid place-items-center">
        {numberAsString === "1337" ?
          <img src="/success/0.GIF" alt="Lottery Success" />
          :
          <img src={`/failed/${randomGifNum}.GIF`} alt="Lottery Failure" />
        }
      </div>
      <p className="mt-6 text-sm  text-primary text-center">\ Thank you for playing it /</p>
      <p className="mt-1 text-xl  text-primary text-center">Airdropped the NFT to your wallet.</p>
      <p className="mt-2 text-sm  text-primary text-center">Play it again! There are no limits to play! Stop 1337 and get a special 1337 NFT.</p>
     
      <div className="flex justify-center mt-8">
        <a
          href={`https://warpcast.com/~/compose?text=The number is ${numberAsString}. R1337 is a fully onchain game on Redstone. Let's try the on-chain experiment!+r1337.vercel.app`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <img src="/FarcasterIcon.svg" alt="Farcaster logo" className="w-5 h-5" />
          <span>Share on Farcaster</span>
        </a>
      </div>
    </div>
  );
};

export default LotteryModal;
