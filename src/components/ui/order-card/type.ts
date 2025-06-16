import { Location } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export type OrdersCardUIProps = {
  OrdersInfo: TOrdersInfo;
  maxIngredients: number;
  locationState: { background: Location };
};

type TOrdersInfo = {
  ingredientsInfo: TIngredient[];
  ingredientsToShow: TIngredient[];
  remains: number;
  total: number;
  date: Date;
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};
