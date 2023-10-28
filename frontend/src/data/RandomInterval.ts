import { useEffect, Dispatch, SetStateAction } from 'react';

function RandomInterval(
  counter: number,
  setCounter: Dispatch<SetStateAction<number>>,
  setRandomNumber: Dispatch<SetStateAction<string>>
) {
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
  }, [counter, setCounter, setRandomNumber]);
}

export default RandomInterval;
