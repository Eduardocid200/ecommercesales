import React, { useEffect, useState } from "react";
import axios from "axios";
import { CartProductType } from "@prisma/client";

interface MercadoPagoButtonProps {
  product: CartProductType; // Use the type ProductData
}

export const MercadoPagoButton = ({ product }: MercadoPagoButtonProps) => {
  const [url, setUrl] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const generateLink = async () => {
      setLoading(true);

      try {
        const { data: preference } = await axios.post("/api/checkout", {
          product,
        });

        setUrl(preference.url);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    generateLink();
  }, [product]);
return (
    <div>
     
        <button onClick={router} className="width-fit-content text-decoration-none background-color-3483fa padding-0-2rem height-50px border-radius-0.5rem border-none cursor-pointer color-white font-weight-600 font-size-16px display-flex align-items-center justify-content-center gap-1rem transition-duration-0.3s hover-scale-1.1">
         Comprar
        </button>
    
    </div>
  );
};
