import { FC, memo } from 'react';
import { BurgerConstrElementUI } from '@ui';
import { BurgerConstrElementProps } from './type';
import { deleteItemBuilder, moveItems } from '../../slices/builder-slice';
import { useDispatch } from '../../services/store';

export const BurgerConstrElement: FC<BurgerConstrElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveItems({ index, direction: 'down' }));
    };

    const handleMoveUp = () => {
      dispatch(moveItems({ index, direction: 'up' }));
    };

    const handleClose = () => {
      dispatch(deleteItemBuilder(ingredient));
    };

    return (
      <BurgerConstrElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
