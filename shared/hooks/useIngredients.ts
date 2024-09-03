import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const data = await Api.ingredients.getAll();
      setIngredients(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchIngredients();
  }, []);

  return { ingredients, loading };
};
