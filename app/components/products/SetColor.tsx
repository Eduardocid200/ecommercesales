import React from "react";
import { CartProductType, SelectedImgType } from "@/app/product/[productId]/ProductDetails";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  const handleClick = (image: SelectedImgType) => {
    console.log(`Color seleccionado: ${image.color}`);
    handleColorSelect(image);
  };

  return (
    <div className="flex gap-4 items-center">
      <span className="font-semibold">Color:</span>
      <div className="flex gap-1">
        {images.map((image) => (
          <div
            key={image.color}
            onClick={() => handleClick(image)}
            className={`
              h-7
              w-7
              rounded-full
              border-teal-300
              flex
              items-center
              justify-center
              ${cartProduct.selectedImg.color === image.color ? "border-[1.5px]" : "border-none"}
            `}
          >
            <div
              style={{ background: image.colorCode }}
              className="
                h-5
                w-5
                rounded-full
                border-[1.2px]
                border-slate-300
                cursor-pointer
              "
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetColor;