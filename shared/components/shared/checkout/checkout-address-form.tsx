"use client";

import React from "react";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form-components";
import { AdressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="grid grid-cols gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AdressInput name="address" onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />
        <FormTextarea
          rows={5}
          className="text-base"
          placeholder="Комментарий к заказу"
          name="comment"
        />
      </div>
    </WhiteBlock>
  );
};
