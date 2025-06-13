// hooks/useMetrics.ts
import { useEffect, useState } from 'react';
import { Metrics } from '../types/app';

export const useMetrics = (user: any) => {
  const [metrics, setMetrics] = useState<Metrics>({
    avgWaitTime: 8.2,
    occupancyRate: 67,
    onTimePerf: 92.1,
    overcrowdingRate: 0.029
  });

  // Real-time metric updates
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        setMetrics({
          avgWaitTime: parseFloat((Math.random() * 2 + 7).toFixed(1)),
          occupancyRate: Math.floor(Math.random() * 15 + 60),
          onTimePerf: parseFloat((Math.random() * 5 + 90).toFixed(1)),
          overcrowdingRate: parseFloat((Math.random() * 0.05).toFixed(3))
        });
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [user]);

  return {
    metrics,
    setMetrics
  };
};