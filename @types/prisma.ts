import { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = Product & {
  item: ProductItem[];
  ingredients: Ingredient[];
};
