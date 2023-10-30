import React, { useState } from 'react';

export const Footer = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  return (
    <footer className="flex items-center justify-center pt-10 m-12 bg-gray-100">
      <nav className="flex flex-col items-center">
        <div
          className="link link-hover p-1 relative"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          {!isTooltipVisible && <span className="font-mincho">How to play</span>}
          {isTooltipVisible && (
            <div className="font-mincho tooltip text-primary">
              The numbers are randomly generated from the hash value for each block. 1337 will be generated with 1 in a 9999 possibility. Can you stop at 1337? 
            </div>
          )}
        </div>
        <a href="https://github.com/aw-labs/f1337" className="font-mincho link link-hover p-1" target="_blank" rel="noopener noreferrer">Github</a>
      </nav>
    </footer>
  );
};
