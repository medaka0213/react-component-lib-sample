import React, { useState, useEffect } from 'react';
import { format_countdown } from '../utils/time';

export type CountDownClockProps = {
  datetime_iso: string;
  children: any;
};

export const CountDownClock: React.VFC<CountDownClockProps> = ({
  datetime_iso,
  children,
}: CountDownClockProps) => {
  const [time_format, setTimeFormat] = useState(format_countdown(datetime_iso));

  // 0.1秒ごとにvalueを1ずつ増やす
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeFormat(format_countdown(datetime_iso));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return <span>{time_format || children}</span>;
};

export default CountDownClock;
