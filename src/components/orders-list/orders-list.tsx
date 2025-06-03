import { FC, memo } from 'react';

import { OrdListProps } from './type';
import { OrdListUI } from '@ui';

export const OrdList: FC<OrdListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdListUI orderByDate={orderByDate} />;
});
