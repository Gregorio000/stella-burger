import React, { FC } from 'react';
import { OrdersStatUIProps } from './type';

export const OrdersStatUI: FC<OrdersStatUIProps> = ({ textStyle, text }) => (
  <span
    className='text text_type_main-default pt-2'
    style={{ color: textStyle }}
  >
    {text}
  </span>
);
