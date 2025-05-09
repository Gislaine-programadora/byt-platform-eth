
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { Pyramid, CircleDollarSign } from 'lucide-react';

interface TokenInfoProps {
  price: number;
  supply: number;
  symbol: string;
  weiBalance: number;
  gasBalance: number;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ price, supply, symbol, weiBalance, gasBalance }) => {
  return (
    <Card className="bg-card/70 backdrop-blur-sm border border-coinbit-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleDollarSign className="text-coinbit-primary" size={20} />
          Token Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Token Name</p>
            <p className="font-medium">CoinGBit</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Symbol</p>
            <p className="font-medium">{symbol}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-medium">${price.toLocaleString('en-US')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Purchase Price</p>
            <p className="font-medium">$15.00</p>
          </div>
          <Separator className="col-span-2 my-2" />
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Supply</p>
            <p className="font-medium">{supply.toLocaleString('en-US')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Network</p>
            <p className="font-medium">Ethereum Mainnet</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Wei Balance</p>
            <p className="font-medium">{weiBalance.toLocaleString('en-US')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Gas Balance</p>
            <p className="font-medium">{gasBalance.toLocaleString('en-US')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenInfo;
