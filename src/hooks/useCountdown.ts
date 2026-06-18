import { useState, useEffect } from 'react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeRemaining(targetDate: string): CountdownTime {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function getInitialCountdown(): CountdownTime {
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

export function useCountdown(targetDate: string): CountdownTime {
  const [timeRemaining, setTimeRemaining] = useState<CountdownTime>(getInitialCountdown);

  useEffect(() => {
    const updateCountdown = () => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeRemaining;
}
