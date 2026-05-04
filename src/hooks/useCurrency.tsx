import React, { createContext, useContext, useState, useEffect } from 'react';
import { Country, COUNTRIES } from '../types';

interface CurrencyContextType {
  selectedCountry: Country;
  rates: Record<string, number>;
  setCountry: (code: string) => void;
  loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [rates, setRates] = useState<Record<string, number>>({ INR: 1, USD: 0.012, GBP: 0.01, EUR: 0.011 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Detect location and fetch rates
    const init = async () => {
      try {
        const [geoRes, rateRes] = await Promise.all([
          fetch('/api/geo').then(r => r.json()),
          fetch('/api/rates').then(r => r.json())
        ]);
        
        const detected = COUNTRIES.find(c => c.code === geoRes.country) || COUNTRIES[0];
        const saved = localStorage.getItem('gulia_country');
        
        if (saved) {
          const savedCountry = COUNTRIES.find(c => c.code === saved);
          if (savedCountry) setSelectedCountry(savedCountry);
        } else {
          setSelectedCountry(detected);
        }
        
        setRates(rateRes);
      } catch (err) {
        console.error("Failed to initialize localization", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const setCountry = (code: string) => {
    const country = COUNTRIES.find(c => c.code === code);
    if (country) {
      setSelectedCountry(country);
      localStorage.setItem('gulia_country', code);
    }
  };

  return (
    <CurrencyContext.Provider value={{ selectedCountry, rates, setCountry, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
