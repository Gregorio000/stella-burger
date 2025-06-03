import { forwardRef, useMemo } from 'react';
import { TIngrCategProps } from './type';
import { TIngredient } from '@utils-types';
import { IngrCategUI } from '../ui/ingredients-category';

export const IngrCateg = forwardRef<HTMLUListElement, TIngrCategProps>(
  ({ title, titleRef, ingredients }, ref) => {
    /** TODO: взять переменную из стора */
    const BurgerConstr = {
      bun: {
        _id: ''
      },
      ingredients: []
    };

    const ingredientsCounters = useMemo(() => {
      const { bun, ingredients } = BurgerConstr;
      const counters: { [key: string]: number } = {};
      ingredients.forEach((ingredient: TIngredient) => {
        if (!counters[ingredient._id]) counters[ingredient._id] = 0;
        counters[ingredient._id]++;
      });
      if (bun) counters[bun._id] = 2;
      return counters;
    }, [BurgerConstr]);

    return (
      <IngrCategUI
        title={title}
        titleRef={titleRef}
        ingredients={ingredients}
        ingredientsCounters={ingredientsCounters}
        ref={ref}
      />
    );
  }
);
