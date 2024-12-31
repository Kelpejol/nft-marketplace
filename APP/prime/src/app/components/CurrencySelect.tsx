"use client";
import { useCurrencyInfo } from "@/hooks/useCurrencyInfo";
import Image from "next/image";
import Select from "react-select";

export type CurrencySelectValue = {
  symbol: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  address: string;
};

interface CurrencySelectProps {
  value: CurrencySelectValue | undefined;
  onChange: (selectedOptions: CurrencySelectValue | null) => void;
}


export default function CurrencySelect({value, onChange}: CurrencySelectProps) {
  const { isLoading, error, currency } = useCurrencyInfo();



  return (
    <div className="">
      <Select
        placeholder="Currency"
        isClearable
        isLoading={isLoading}
        options={currency}
        value={value}
       onChange={onChange}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3 z-60">
            <Image src={option.image.thumb} alt={option.symbol} width={24} height={24} />
            <div>
              {option.symbol.toUpperCase()}
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-2 border-2 border-gray-300",
          input: () => "text-md",
          option: () => "text-md",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary25: "#ffe4e4",
            primary: "black",
          }
        })}
      />
    </div>
  );
}
