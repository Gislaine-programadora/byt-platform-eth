
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface WalletConnectProps {
  privateKey: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ privateKey }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { toast } = useToast();

  const handleConnect = () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      // Generate a random wallet address
      const randomAddress = "0x" + Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)).join('');
      
      setWalletAddress(randomAddress);
      setIsConnected(true);
      setIsConnecting(false);
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
      variant: "destructive",
    });
  };

  return (
    <Card className="bg-card/70 backdrop-blur-sm border border-coinbit-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="text-coinbit-primary" size={20} />
          Wallet Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <Button 
            className="w-full bg-coinbit-primary hover:bg-coinbit-accent"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-muted/50 rounded-md">
              <Label htmlFor="address">Connected Address</Label>
              <div className="flex mt-2">
                <Input 
                  id="address" 
                  value={walletAddress} 
                  readOnly 
                  className="text-sm font-mono bg-background/50"
                />
              </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-md">
              <Label htmlFor="privateKey">Private Key (Keep Secret)</Label>
              <div className="flex mt-2">
                <Input 
                  id="privateKey" 
                  value={privateKey} 
                  readOnly 
                  type="password" 
                  className="text-sm font-mono bg-background/50"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Never share your private key with anyone!
              </p>
            </div>
          </div>
        )}
      </CardContent>
      {isConnected && (
        <CardFooter>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleDisconnect}
          >
            Disconnect Wallet
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default WalletConnect;
