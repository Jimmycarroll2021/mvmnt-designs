'use client';

import React, { useState, useEffect } from 'react';

interface CityTime {
  code: string;
  city: string;
  timeZone: string;
}

const CITIES: CityTime[] = [
  { code: 'CBR', city: 'Canberra', timeZone: 'Australia/Sydney' },
  { code: 'SYD', city: 'Sydney', timeZone: 'Australia/Sydney' },
  { code: 'TYO', city: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { code: 'DXB', city: 'Dubai', timeZone: 'Asia/Dubai' },
  { code: 'LON', city: 'London', timeZone: 'Europe/London' },
  { code: 'NYC', city: 'New York', timeZone: 'America/New_York' },
];

export default function WorldClocks() {
  const [mounted, setMounted] = useState(false);
  const [times, setTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setMounted(true);

    const updateTimes = () => {
      const now = new Date();
      const updated: { [key: string]: string } = {};

      CITIES.forEach(({ code, timeZone }) => {
        try {
          const formatter = new Intl.DateTimeFormat('en-GB', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          });
          updated[code] = formatter.format(now);
        } catch {
          updated[code] = '00:00:00';
        }
      });

      setTimes(updated);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
      {CITIES.map(({ code, city }) => (
        <div key={code} className="flex items-center gap-2">
          <span className="text-neutral-900 font-semibold">{code}</span>
          <span className="text-neutral-400">·</span>
          <span className="tabular-nums text-neutral-600">
            {mounted && times[code] ? times[code] : '--:--:--'}
          </span>
        </div>
      ))}
    </div>
  );
}
