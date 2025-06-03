import { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdListUIProps } from './type';
import { OrdersCard } from '@components';

export const OrdListUI: FC<OrdListUIProps> = ({ orderByDate }) => (
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrdersCard order={order} key={order._id} />
    ))}
  </div>
);
