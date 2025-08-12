import { useState, useEffect } from 'react';

export function useCurrentDateInfo() {
  const [dateInfo, setDateInfo] = useState(null);


  useEffect(() => {
    const date = new Date();
    
    setDateInfo({
      date: date,
      day: {
        short: date.toLocaleDateString(undefined, { weekday: 'short' }),
        long: date.toLocaleDateString(undefined, { weekday: 'long' }),
        other: date.toLocaleDateString("en-GB"),
        daysInMonth: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
      },
      month: {
        short: date.toLocaleDateString(undefined, { month: 'short' }),
        long: date.toLocaleDateString(undefined, { month: 'long' })
      },
      year: date.getFullYear(),
      dayOfMonth: date.getDate(),
      time: {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
      }
    });
  }, []);

  return dateInfo;
}
