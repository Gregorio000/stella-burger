import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';
import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  createSelector
} from '@reduxjs/toolkit';
import { RootState } from '../services/store';

// Тип состояния фида
export interface FeedState {
  items: TOrdersData | null;
  loading: boolean;
  error: SerializedError | null;
}

export const initialState: FeedState = {
  items: null,
  loading: false,
  error: null
};

// Асинхронный thunk для загрузки ленты заказов
export const feedThunk = createAsyncThunk<TOrdersData>(
  'feed/fetch',
  async (_, thunkAPI) => {
    try {
      return await getFeedsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Слайс
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feedThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(feedThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(feedThunk.rejected, (state, action) => {
        state.loading = false;
        // Используем action.error, если reject без value
        // Или приводим action.payload к SerializedError, если rejectWithValue
        state.error =
          (action.payload as SerializedError) ?? action.error ?? null;
      });
  }
});

// Селекторы
export const selectFeed = (state: RootState) => state.feed.items;
export const selectLoading = (state: RootState) => state.feed.loading;
export const selectError = (state: RootState) => state.feed.error;

// Селектор заказов (возвращает [] если orders отсутствует)
export const selectOrders = createSelector(
  [selectFeed],
  (feed) => feed?.orders ?? []
);

export default feedSlice.reducer;
