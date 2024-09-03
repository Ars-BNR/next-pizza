import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функиця для подсчета общей стоимости пиццы
 * @param type - тип теста у выбранной пиццы
 * @param size - размеры у выбранной пиццы
 * @param items - - вариации у выбранной пиццы
 * @param ingredients - ингредиенты у выбранной пиццы
 * @param selectedIngredients -выбранный ингредиенты у выбранной пиццы
 * @returns number общую стоимость
 */

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items?.find((item) => item.PizzaType === type && item.size === size)
      ?.price ?? 0;
  const totalPriceIngredients = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalPriceIngredients;
};
