import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PropsPrice {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PropsPrice {
  PizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  PizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  price: PropsPrice;
}
interface ReturnProps extends Filters {
  setPrice: (name: keyof PropsPrice, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}
export const useFilter = (): ReturnProps => {
  const searchParams = useSearchParams();

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );
  const [PizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get("PizzaTypes")
        ? searchParams.get("PizzaTypes")?.split(",")
        : []
    )
  );
  const [price, setPrice] = React.useState<PropsPrice>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });
  const ChangePrice = (name: keyof PropsPrice, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return React.useMemo(
    () => ({
      sizes,
      PizzaTypes,
      selectedIngredients,
      price,
      setPrice: ChangePrice,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }),
    [sizes, PizzaTypes, selectedIngredients, price]
  );
};
