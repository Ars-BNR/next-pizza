import React from "react";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { ProductItem } from "@prisma/client";
import { getAvailablePizzaSizes } from "../lib";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  selectedIngredients: Set<number>;
  addIngredient: (id: number) => void;
  avaliablePizzaSizes: Variant[];
  currentItemId?: number;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );
  const avaliablePizzaSizes = getAvailablePizzaSizes(type, items ?? []);

  const currentItemId = items.find(
    (item) => item.PizzaType === type && item.size === size
  )?.id;

  React.useEffect(() => {
    const isAvailableSize = avaliablePizzaSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const avaliablePizza = avaliablePizzaSizes?.find((item) => !item.disabled);
    if (!isAvailableSize && avaliablePizza) {
      setSize(Number(avaliablePizza.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    addIngredient,
    avaliablePizzaSizes,
    currentItemId,
  };
};
