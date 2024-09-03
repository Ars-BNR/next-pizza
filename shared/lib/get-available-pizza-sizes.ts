import { Variant } from "../components/shared/group-variants";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { ProductItem } from "@prisma/client";

export const getAvailablePizzaSizes = (
  type: PizzaType,
  items: ProductItem[]
): Variant[] => {
  const avaliablePizzaType = items?.filter((item) => item.PizzaType === type);
  const avaliablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !avaliablePizzaType?.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));
  return avaliablePizzaSizes;
};
