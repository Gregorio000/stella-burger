import { FC } from 'react';
import { Preloader, IngrDetUI } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/ingredients-slice';

export const IngrDet: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams();

  const ingredient = useSelector(selectIngredients);
  const ingredientData = ingredient.find((ingredient) => ingredient._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngrDetUI ingredientData={ingredientData} />;
};
