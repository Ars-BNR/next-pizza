"use client";

import React, { useState } from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useFormContext } from "react-hook-form";
import { ClearButton } from "./clear-button";

interface Props {
  onChange?: (value?: string) => void;
  name: string;
}

export const AdressInput: React.FC<Props> = ({ onChange, name }) => {
  const { watch, setValue } = useFormContext();
  const value = watch(name);
  const [addressValue, setAddressValue] = useState(value);

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
    setAddressValue("");
  };

  return (
    <div className="border-red-400">
      <div className="relative">
        <AddressSuggestions
          token="b5b8bb983ddcd08648080e0271d9dd367bb7aa65"
          value={addressValue}
          onChange={(data) => {
            setAddressValue(data?.value);
            onChange?.(data?.value);
          }}
        />

        {addressValue && <ClearButton onClick={onClickClear} />}
      </div>
    </div>
  );
};
