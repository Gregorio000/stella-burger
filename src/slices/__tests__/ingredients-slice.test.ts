import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice, {
  fetchIngredients,
  selectIngredients,
  selectBuns,
  selectMains,
  selectSauces,
  selectIsLoading
} from '../ingredients-slice';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

const mockGetIngrApi = getIngredientsApi as jest.MockedFunction<
  typeof getIngredientsApi
>;

describe('Слайс ингредиентов', () => {
  const mockIngrs: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 15,
      calories: 100,
      price: 200,
      image: 'image1.jpg',
      image_mobile: 'image1-mobile.jpg',
      image_large: 'image1-large.jpg'
    },
    {
      _id: '2',
      name: 'Котлета',
      type: 'main',
      proteins: 20,
      fat: 10,
      carbohydrates: 5,
      calories: 150,
      price: 150,
      image: 'image2.jpg',
      image_mobile: 'image2-mobile.jpg',
      image_large: 'image2-large.jpg'
    },
    {
      _id: '3',
      name: 'Соус',
      type: 'sauce',
      proteins: 5,
      fat: 2,
      carbohydrates: 10,
      calories: 50,
      price: 100,
      image: 'image3.jpg',
      image_mobile: 'image3-mobile.jpg',
      image_large: 'image3-large.jpg'
    }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Возвращает начальное состояние', () => {
    expect(ingredientsSlice(undefined, { type: 'unknown' })).toEqual({
      items: [],
      buns: [],
      mains: [],
      sauces: [],
      isLoading: true,
      error: null
    });
  });

  describe('fetchIngredients', () => {
    it('Обрабатывает состояние pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsSlice(undefined, action);
      expect(state).toEqual({
        items: [],
        buns: [],
        mains: [],
        sauces: [],
        isLoading: true,
        error: null
      });
    });

    it('Обрабатывает состояние fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngrs
      };
      const state = ingredientsSlice(undefined, action);

      expect(state).toEqual({
        items: mockIngrs,
        buns: mockIngrs.filter((item) => item.type === 'bun'),
        mains: mockIngrs.filter((item) => item.type === 'main'),
        sauces: mockIngrs.filter((item) => item.type === 'sauce'),
        isLoading: false,
        error: null
      });
    });

    it('Обрабатывает состояние rejected', () => {
      const error = { message: 'Request failed' };
      const action = {
        type: fetchIngredients.rejected.type,
        error
      };
      const state = ingredientsSlice(undefined, action);

      expect(state).toEqual({
        items: [],
        buns: [],
        mains: [],
        sauces: [],
        isLoading: false,
        error
      });
    });

    it('Успешно загружает ингредиенты', async () => {
      mockGetIngrApi.mockResolvedValue(mockIngrs);

      const store = configureStore({
        reducer: {
          ingredients: ingredientsSlice
        }
      });

      await store.dispatch(fetchIngredients());

      const state = store.getState().ingredients;
      expect(state.items).toEqual(mockIngrs);
      expect(state.buns).toEqual(
        mockIngrs.filter((item) => item.type === 'bun')
      );
      expect(state.mains).toEqual(
        mockIngrs.filter((item) => item.type === 'main')
      );
      expect(state.sauces).toEqual(
        mockIngrs.filter((item) => item.type === 'sauce')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('Обрабатывает ошибку при загрузке ингредиентов', async () => {
      const errorMessage = 'Network Error';
      mockGetIngrApi.mockRejectedValue(new Error(errorMessage));

      const store = configureStore({
        reducer: {
          ingredients: ingredientsSlice
        }
      });

      await store.dispatch(fetchIngredients());

      const state = store.getState().ingredients;
      expect(state.items).toEqual([]);
      expect(state.isLoading).toBe(false);
      expect(state.error?.message).toEqual(errorMessage);
    });
  });

  describe('Селекторы', () => {
    const mockState = {
      ingredients: {
        items: mockIngrs,
        buns: mockIngrs.filter((item) => item.type === 'bun'),
        mains: mockIngrs.filter((item) => item.type === 'main'),
        sauces: mockIngrs.filter((item) => item.type === 'sauce'),
        isLoading: false,
        error: null
      },
      feed: {} as any,
      builder: {} as any,
      order: {} as any,
      user: {} as any
    };

    it('Выбирает все ингредиенты', () => {
      expect(selectIngredients(mockState)).toEqual(mockIngrs);
    });

    it('Выбирает булки', () => {
      expect(selectBuns(mockState)).toEqual(
        mockIngrs.filter((item) => item.type === 'bun')
      );
    });

    it('Выбирает начинки', () => {
      expect(selectMains(mockState)).toEqual(
        mockIngrs.filter((item) => item.type === 'main')
      );
    });

    it('Выбирает соусы', () => {
      expect(selectSauces(mockState)).toEqual(
        mockIngrs.filter((item) => item.type === 'sauce')
      );
    });

    it('Выбирает состояние загрузки', () => {
      expect(selectIsLoading(mockState)).toBe(false);
    });
  });
});
