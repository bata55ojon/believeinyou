import { createContext, useContext, useState, type ReactNode } from "react";
import { BuyNowDialog } from "./BuyNowDialog";
import type { Product } from "@/data/products";

const BuyContext = createContext<(product: Product) => void>(() => {});

export const useBuy = () => useContext(BuyContext);

export function BuyProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);

  return (
    <BuyContext.Provider value={setProduct}>
      {children}
      <BuyNowDialog
        product={product}
        onOpenChange={(open) => {
          if (!open) setProduct(null);
        }}
      />
    </BuyContext.Provider>
  );
}
