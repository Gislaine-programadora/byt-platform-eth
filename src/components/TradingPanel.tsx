
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface TradingPanelProps {
  currentPrice: number;
}

const TradingPanel: React.FC<TradingPanelProps> = ({ currentPrice }) => {
  const [quantity, setQuantity] = useState<string>("1");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleTransaction = (action: 'buy' | 'sell') => {
    setIsProcessing(true);

    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      
      const totalAmount = parseFloat(quantity) * 15;
      
      toast({
        title: action === 'buy' ? "Purchase Successful" : "Sale Successful",
        description: action === 'buy' 
          ? `You bought ${quantity} CoinGBit for $${totalAmount.toFixed(2)}`
          : `You sold ${quantity} CoinGBit for $${totalAmount.toFixed(2)}`,
      });
    }, 1500);
  };

  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0;
    return (qty * 15).toFixed(2);
  };

  return (
    <Card className="bg-card/70 backdrop-blur-sm border border-coinbit-primary/20">
      <CardHeader>
        <CardTitle>Trading Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy">
            <div className="space-y-4">
              <div>
                <Label htmlFor="buy-quantity">Quantity</Label>
                <Input
                  id="buy-quantity"
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Purchase Price</Label>
                <Input value="$15.00" readOnly disabled className="mt-1" />
              </div>
              <div>
                <Label>Total</Label>
                <Input value={`$${calculateTotal()}`} readOnly disabled className="mt-1" />
              </div>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleTransaction('buy')}
                disabled={isProcessing}
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                {isProcessing ? "Processing..." : "Buy CoinGBit"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sell">
            <div className="space-y-4">
              <div>
                <Label htmlFor="sell-quantity">Quantity</Label>
                <Input
                  id="sell-quantity"
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Selling Price</Label>
                <Input value="$15.00" readOnly disabled className="mt-1" />
              </div>
              <div>
                <Label>Total</Label>
                <Input value={`$${calculateTotal()}`} readOnly disabled className="mt-1" />
              </div>
              <Button 
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={() => handleTransaction('sell')}
                disabled={isProcessing}
              >
                <ArrowDown className="mr-2 h-4 w-4" />
                {isProcessing ? "Processing..." : "Sell CoinGBit"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground w-full text-center">
          Market rates may vary. Transaction fees not included.
        </div>
      </CardFooter>
    </Card>
  );
};

export default TradingPanel;
