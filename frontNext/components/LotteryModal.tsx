import { parse } from 'path';
import React, { useEffect, useState } from 'react';

interface LotteryModalProps {
  onClose: () => void;
  yourNum: string;
}

const LotteryModal = ({ onClose, yourNum }: LotteryModalProps) => {
  const [randomGifNum, setRandomGifNum] = useState<number>(0);

  useEffect(() => {
    const generatedNum = Math.floor(Math.random() * 49);
    setRandomGifNum(generatedNum);
  }, [yourNum]);

  return (
    <div className="p-6">
      <p className="mb-4 text-4xl mt-4 text-primary font-bold text-center">The number is {yourNum}</p>
      
      <div className="grid place-items-center">
        {yourNum === "1337" ?
          <img src="/success/0.GIF" alt="Lottery Success" />
          :
          <img src={`/failed/${randomGifNum}.GIF`} alt="Lottery Failure" />
        }
      </div>
      <p className="mt-4 text-xl  text-primary text-center">Airdropped the NFT to your wallet.</p>
    </div>
  );
};

export default LotteryModal;
