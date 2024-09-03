"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { ChooseProductForm } from "./choose-product-form";
import { ChoosePizzaForm } from "./choose-pizza-form";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ onSubmit, product }) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);
  const firstItem = product.item[0];
  const isPizzaForm = Boolean(firstItem.PizzaType);

  const onAddProduct = async (
    productItemId?: number,
    ingredients?: number[]
  ) => {
    try {
      firstItem.PizzaType
        ? await addCartItem({
            productItemId,
            ingredients,
          })
        : await addCartItem({
            productItemId: firstItem.id,
          });

      toast.success(`${product.name} добавлен в корзину`);
      onSubmit?.();
    } catch (error) {
      toast.error(`Не получилось добавить ${product.name} в корзину`);
      console.error(error);
    }
  };
  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.item}
        onSubmit={onAddProduct}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onAddProduct}
      price={firstItem.price}
      loading={loading}
    />
  );
};
