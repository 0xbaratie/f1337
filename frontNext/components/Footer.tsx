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
          {!isTooltipVisible && <span>How to use</span>}
          {isTooltipVisible && (
            <div className="tooltip text-primary">
              Can you stop at 1337? But this is only for users with a Wallet connection to Farcaster.
            </div>
          )}
        </div>
        <a href="https://github.com/aw-labs/f1337" className="link link-hover p-1" target="_blank" rel="noopener noreferrer">Github</a>
      </nav>
    </footer>
  );
};
