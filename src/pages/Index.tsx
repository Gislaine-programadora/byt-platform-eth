
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import TokenInfo from '@/components/TokenInfo';
import PriceChart from '@/components/PriceChart';
import WalletConnect from '@/components/WalletConnect';
import TradingPanel from '@/components/TradingPanel';
import { X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  // Token data com chave privada definida
  const tokenData = {
    price: 2357,
    supply: 12987200000,
    symbol: "BYT",
    weiBalance: 2987300000,
    gasBalance: 7987400.00,
    privateKey: "57ea7a2634cb4fd6dc5ab69cc63e551072a99f96b2e98172f86c5e629a4c83f2"
  };

  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(tokenData.price);
  const { toast } = useToast();

  const handlePriceUpdate = (newPrice: number) => {
    setCurrentPrice(newPrice);
  };

  const handleExitApplication = () => {
    toast({
      title: "Closing Application",
      description: "Thank you for using CoinGBit Platform!",
    });

    setTimeout(() => {
      window.close();
      // Fallback
      toast({
        title: "Unable to close automatically",
        description: "Please close your browser window manually.",
        variant: "destructive",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-coinbit-background to-[#12151f] text-white">
      {/* Header */}
      <header className="border-b border-coinbit-primary/20 bg-card/30 backdrop-blur-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex gap-2">
            <Button 
              className="bg-coinbit-primary hover:bg-coinbit-accent text-white"
              onClick={() => window.open("https://ethereum.org", "_blank")}
            >
              Start Trading
            </Button>
            <Button 
              variant="outline" 
              className="border-coinbit-primary/50 text-white hover:bg-coinbit-primary/20" 
              onClick={handleExitApplication}
            >
              <X className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {/* Token Overview */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            CoinGBit (BYT)
          </h1>
          <p className="text-coinbit-text/80 max-w-2xl mx-auto">
            Professional Ethereum token trading platform with real-time market data and secure wallet integration.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <PriceChart initialPrice={tokenData.price} />

            {/* Token Info */}
            <TokenInfo 
              price={tokenData.price}
              supply={tokenData.supply}
              symbol={tokenData.symbol}
              weiBalance={tokenData.weiBalance}
              gasBalance={tokenData.gasBalance}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Wallet Connect */}
            <WalletConnect privateKey={tokenData.privateKey} />
            
            {/* Trading Panel com valor de 2.357 e chave privada */}
            <TradingPanel 
              currentPrice={currentPrice} 
              privateKey={tokenData.privateKey} 
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-coinbit-primary/20 bg-card/30 backdrop-blur-sm p-4 mt-8">
        <div className="container mx-auto text-center text-sm text-coinbit-text/60">
          <p>CoinGBit Token • ETH Mainnet • {new Date().getFullYear()}</p>
          <p className="mt-1">Professional Crypto Trading Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
