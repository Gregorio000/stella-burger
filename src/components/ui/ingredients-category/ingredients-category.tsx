import styles from './ingredients-category.module.css';
import { forwardRef } from 'react';
import { TIngrCategUIProps } from './type';
import { BurgerIngr } from '@components';

export const IngrCategUI = forwardRef<HTMLUListElement, TIngrCategUIProps>(
  ({ title, titleRef, ingredients, ingredientsCounters }, ref) => (
    <>
      <h3 className='text text_type_main-medium mt-10 mb-6' ref={titleRef}>
        {title}
      </h3>
      <ul className={styles.items} ref={ref}>
        {ingredients.map((ingredient) => (
          <BurgerIngr
            ingredient={ingredient}
            key={ingredient._id}
            count={ingredientsCounters[ingredient._id]}
          />
        ))}
      </ul>
    </>
  )
);
