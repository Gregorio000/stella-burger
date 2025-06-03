import { TIngredient } from '@utils-types';

export type TIngrCategProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
};
