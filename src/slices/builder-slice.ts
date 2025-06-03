import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../services/store';

interface IBuilderState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

export const initialState: IBuilderState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addBunBuilder(state, action: PayloadAction<TIngredient | null>) {
      state.constructorItems.bun = action.payload;
    },
    addItemBuilder(
      state,
      action: PayloadAction<Omit<TConstructorIngredient, 'id'>>
    ) {
      const newItem = { ...action.payload, id: uuidv4() };
      state.constructorItems.ingredients.push(newItem);
    },
    deleteItemBuilder(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients = state.constructorItems.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveItems(
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) {
      const { index, direction } = action.payload;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= state.constructorItems.ingredients.length
      ) {
        return;
      }

      const temp = state.constructorItems.ingredients[index];
      state.constructorItems.ingredients[index] =
        state.constructorItems.ingredients[targetIndex];
      state.constructorItems.ingredients[targetIndex] = temp;
    },
    clearBuilder(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  }
});

export const selectConstructorItems = (state: RootState) =>
  state.builder.constructorItems;

export const selectBun = (state: RootState) =>
  state.builder.constructorItems.bun;

export const selectConstructorTotalCount = (state: RootState) =>
  state.builder.constructorItems.ingredients.length;

export const {
  addBunBuilder,
  addItemBuilder,
  deleteItemBuilder,
  moveItems,
  clearBuilder
} = builderSlice.actions;

export default builderSlice.reducer;
