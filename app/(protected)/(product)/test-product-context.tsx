"use client";

import { createContext, useContext, useState } from "react";

export const NewProductContext = createContext({});

export default function NewProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orderName, setOrderName] = useState<string>("");
  const [glassType, setGlassType] = useState<string>("");
  const [shape, setShape] = useState<string>("");
  const [dimensions, setDimensions] = useState<string>("");
  const [glassThickness, setGlassThickness] = useState<string>("");
  const [tint, setTint] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <NewProductContext.Provider
      value={{
        orderName,
        setOrderName,
        glassType,
        setGlassType,
        shape,
        setShape,
        dimensions,
        setDimensions,
        glassThickness,
        setGlassThickness,
        tint,
        setTint,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </NewProductContext.Provider>
  );
}

export function useNewProductContext() {
  return useContext(NewProductContext);
}
