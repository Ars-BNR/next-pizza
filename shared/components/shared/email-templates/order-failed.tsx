import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import React from "react";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderFailedTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Не получилось оплатить заказ </h1>

    <p>Ваш заказ #{orderId} не оплачен. Список товаров:</p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} ₽ x{" "}
          {item.quantity} шт. = {item.productItem.price * item.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);
