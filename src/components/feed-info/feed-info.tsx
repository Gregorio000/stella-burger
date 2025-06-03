import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInformationsUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectFeed } from '../../slices/feed-slice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInformations: FC = () => {
  /** TODO: взять переменные из стора */
  const feed = useSelector(selectFeed);
  const orders = feed?.orders || [];

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInformationsUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
