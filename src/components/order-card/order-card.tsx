import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrdersCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrdersCardUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/ingredients-slice';

const maxIngredients = 6;

export const OrdersCard: FC<OrdersCardProps> = memo(({ order }) => {
  const location = useLocation();

  /** TODO: взять переменную из стора */
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  const OrdersInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!OrdersInfo) return null;

  return (
    <OrdersCardUI
      OrdersInfo={OrdersInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
