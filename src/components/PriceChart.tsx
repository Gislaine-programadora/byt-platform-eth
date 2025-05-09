
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  initialPrice: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ initialPrice }) => {
  const [data, setData] = useState<{ time: string; price: number; }[]>([]);
  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const [isIncreasing, setIsIncreasing] = useState(true);

  // Generate initial chart data
  useEffect(() => {
    const initialData = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const time = new Date(now);
      time.setMinutes(now.getMinutes() - i);
      
      let price: number;
      
      if (i === 30) {
        // First data point uses initialPrice directly
        price = initialPrice;
      } else {
        // Generate price with small variations around the previous price
        const randomFactor = 0.99 + Math.random() * 0.02;
        price = initialData[initialData.length - 1]?.price * randomFactor || initialPrice;
      }
      
      initialData.push({
        time: time.toLocaleTimeString(),
        price: parseFloat(price.toFixed(2))
      });
    }
    
    setData(initialData);
    
    // Safely set current price and determine if increasing
    if (initialData.length >= 2) {
      setCurrentPrice(initialData[initialData.length - 1].price);
      setIsIncreasing(initialData[initialData.length - 1].price > initialData[initialData.length - 2].price);
    }
  }, [initialPrice]);

  // Update chart data with new prices
  useEffect(() => {
    if (data.length === 0) return; // Don't update if there's no initial data
    
    const interval = setInterval(() => {
      setData(prevData => {
        if (prevData.length === 0) return prevData; // Safety check
        
        const now = new Date();
        const randomFactor = 0.995 + Math.random() * 0.01;
        const newPrice = parseFloat((prevData[prevData.length - 1].price * randomFactor).toFixed(2));
        
        const isUp = newPrice > prevData[prevData.length - 1].price;
        setIsIncreasing(isUp);
        setCurrentPrice(newPrice);
        
        // Add new data point and remove the oldest one
        return [
          ...prevData.slice(1),
          { time: now.toLocaleTimeString(), price: newPrice }
        ];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString('en-US')}`;
  };

  return (
    <Card className="bg-card/70 backdrop-blur-sm border border-coinbit-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Price Chart (Live)</CardTitle>
          <div className="flex items-center gap-2">
            <span className={isIncreasing ? "text-green-500" : "text-red-500"}>
              {formatPrice(currentPrice)}
            </span>
            {isIncreasing ? (
              <TrendingUp className="text-green-500" size={20} />
            ) : (
              <TrendingDown className="text-red-500" size={20} />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tickFormatter={(tick) => tick.slice(0, 5)} />
            <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} tickFormatter={formatPrice} />
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <Tooltip
              formatter={(value: number) => [`${formatPrice(value)}`, 'Price']}
              labelFormatter={(label) => `Time: ${label}`}
              contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #333' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#1EAEDB" 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
