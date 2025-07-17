"use client";

import { createContext, useContext, useState } from "react";
import { PortfolioType } from "src/types/portfolioType";

type PortfolioContextType = {
  data: PortfolioType | null;
  setData: (data: PortfolioType) => void;
  updateAt: number;
  triggerUpdate: () => void;
};

const PortfolioContext = createContext<PortfolioContextType>({
  data: null,
  setData: () => {},
  updateAt: 0,
  triggerUpdate: () => {},
});

export const usePortfolioContext = () => useContext(PortfolioContext);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioType | null>(null);
  const [updateAt, setUpdateAt] = useState(Date.now());

  const triggerUpdate = () => setUpdateAt(Date.now());

  return (
    <PortfolioContext.Provider
      value={{
        data,
        setData,
        updateAt,
        triggerUpdate,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
