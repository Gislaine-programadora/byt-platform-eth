
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUp, ArrowDown, CheckCircle, X, Download, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface TradingPanelProps {
  currentPrice: number;
  privateKey: string;
}

const TradingPanel: React.FC<TradingPanelProps> = ({ currentPrice, privateKey }) => {
  const [quantity, setQuantity] = useState<string>("1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const { toast } = useToast();
  
  // Usando o valor fixo de 2.357
  const tokenPrice = 2.357;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleTransaction = (action: 'buy' | 'sell') => {
    setTransactionType(action);
    setIsProcessing(true);

    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      setTransactionComplete(true);
      
      const totalAmount = parseFloat(quantity) * tokenPrice;
      
      toast({
        title: action === 'buy' ? "Purchase Initiated" : "Sale Initiated",
        description: action === 'buy' 
          ? `Preparing to buy ${quantity} CoinGBit for $${totalAmount.toFixed(2)}`
          : `Preparing to sell ${quantity} CoinGBit for $${totalAmount.toFixed(2)}`,
      });
    }, 1500);
  };

  const handleConfirmTransfer = () => {
    setIsTransferring(true);
    
    // Simulate transfer to private key
    setTimeout(() => {
      setIsTransferring(false);
      setTransactionComplete(false);
      setTransactionSuccessful(true);
      setShowCompletionDialog(true);
      
      const totalAmount = parseFloat(quantity) * tokenPrice;
      
      toast({
        title: transactionType === 'buy' ? "Purchase Successful" : "Sale Successful",
        description: transactionType === 'buy' 
          ? `You bought ${quantity} CoinGBit for $${totalAmount.toFixed(2)} and transferred to your wallet with key ending in ${privateKey.slice(-6)}`
          : `You sold ${quantity} CoinGBit for $${totalAmount.toFixed(2)} and funds were transferred to your wallet with key ending in ${privateKey.slice(-6)}`,
      });
    }, 2000);
  };

  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0;
    return (qty * tokenPrice).toFixed(3);
  };

  // Retorna os últimos 6 caracteres da chave privada para exibição
  const getPrivateKeyShort = () => {
    return privateKey.slice(-6);
  };

  const handleCloseApplication = () => {
    // Alertar o usuário que a aplicação será fechada
    toast({
      title: "Closing Application",
      description: "Thank you for trading with CoinGBit!",
    });

    // Fechar a aplicação após um breve atraso (janela do navegador)
    setTimeout(() => {
      window.close();
      // Fallback caso window.close não funcione devido às políticas do navegador
      toast({
        title: "Unable to close automatically",
        description: "Please close your browser window manually.",
        variant: "destructive",
      });
    }, 1000);
  };

  const currentDate = new Date().toLocaleDateString();
  const transactionId = `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

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
                <Input value={`$${tokenPrice.toFixed(3)}`} readOnly disabled className="mt-1" />
              </div>
              <div>
                <Label>Total</Label>
                <Input value={`$${calculateTotal()}`} readOnly disabled className="mt-1" />
              </div>
              
              {!transactionComplete ? (
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleTransaction('buy')}
                  disabled={isProcessing}
                >
                  <ArrowUp className="mr-2 h-4 w-4" />
                  {isProcessing ? "Processing..." : "Buy CoinGBit"}
                </Button>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full bg-coinbit-primary hover:bg-coinbit-accent">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirm & Transfer to Wallet
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
                      <AlertDialogDescription>
                        You are about to purchase {quantity} CoinGBit tokens for ${calculateTotal()} and transfer them to your wallet with private key ending in ...{getPrivateKeyShort()}.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleConfirmTransfer}
                        disabled={isTransferring}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isTransferring ? "Transferring..." : "Confirm & Transfer"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
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
                <Input value={`$${tokenPrice.toFixed(3)}`} readOnly disabled className="mt-1" />
              </div>
              <div>
                <Label>Total</Label>
                <Input value={`$${calculateTotal()}`} readOnly disabled className="mt-1" />
              </div>
              
              {!transactionComplete ? (
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => handleTransaction('sell')}
                  disabled={isProcessing}
                >
                  <ArrowDown className="mr-2 h-4 w-4" />
                  {isProcessing ? "Processing..." : "Sell CoinGBit"}
                </Button>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full bg-coinbit-primary hover:bg-coinbit-accent">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirm & Transfer to Wallet
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Sale</AlertDialogTitle>
                      <AlertDialogDescription>
                        You are about to sell {quantity} CoinGBit tokens for ${calculateTotal()} and transfer the funds to your wallet with private key ending in ...{getPrivateKeyShort()}.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleConfirmTransfer}
                        disabled={isTransferring}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {isTransferring ? "Transferring..." : "Confirm & Transfer"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground w-full text-center">
          Market rates may vary. Transaction fees not included.
        </div>
      </CardFooter>

      {/* Modal de conclusão de transação */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-500">
              <CheckCircle className="mr-2" size={24} />
              Transaction Complete
            </DialogTitle>
            <DialogDescription>
              Your {transactionType === 'buy' ? 'purchase' : 'sale'} has been processed successfully.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted/30 p-4 rounded-lg border border-green-200">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transaction ID:</span>
                <span className="text-sm font-medium">{transactionId}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Date:</span>
                <span className="text-sm font-medium">{currentDate}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Type:</span>
                <span className="text-sm font-medium">{transactionType === 'buy' ? 'Purchase' : 'Sale'}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount:</span>
                <span className="text-sm font-medium">{quantity} CoinGBit</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="text-sm font-medium">${tokenPrice.toFixed(3)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total:</span>
                <span className="text-sm font-medium font-bold">${calculateTotal()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Wallet:</span>
                <span className="text-sm font-mono">...{getPrivateKeyShort()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span className="text-sm font-medium text-green-500">Completed</span>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between flex-wrap gap-2">
            <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => setShowCompletionDialog(false)}>
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
            <Button className="flex-1 sm:flex-none bg-coinbit-primary hover:bg-coinbit-accent">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button onClick={handleCloseApplication} className="flex-1 sm:flex-none" variant="secondary">
              <ExternalLink className="mr-2 h-4 w-4" />
              Exit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TradingPanel;
