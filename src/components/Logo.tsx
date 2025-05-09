
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="pyramid animate-float">
        <div className="pyramid-face pyramid-front"></div>
        <div className="pyramid-face pyramid-right"></div>
        <div className="pyramid-face pyramid-left"></div>
        <div className="pyramid-bottom"></div>
      </div>
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-coinbit-primary to-coinbit-secondary">
        CoinGBit
      </span>
    </div>
  );
};

export default Logo;
