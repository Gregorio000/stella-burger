import { Location } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export type TBurgerIngrUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: Location };
  handleAdd: () => void;
};
