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
      <p className="mb-6 text-4xl mt-6 text-primary font-bold text-center">The number is {yourNum}</p>
      
      <div className="grid place-items-center">
        {yourNum === "1337" ?
          <img src="/lotterySuccess/0.gif" alt="Lottery Success" />
          :
          <img src={`/lotteryFailed/${randomGifNum}.gif`} alt="Lottery Failure" />
        }
      </div>
      <p>ここにエアドロされたことを伝える</p>
    </div>
  );
};

export default LotteryModal;
