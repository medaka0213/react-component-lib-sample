import React from 'react';
import { format_countdown } from '../utils/time';

export type CountDownClockProps = {
  datetime_iso: string;
};

export const CountDownClock = ({ datetime_iso }: CountDownClockProps) => {
  const [time_format, setTimeFormat] = React.useState(
    format_countdown(datetime_iso)
  );

  // 0.1秒ごとにvalueを1ずつ増やす
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeFormat(format_countdown(datetime_iso));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return time_format;
};

export default CountDownClock;
