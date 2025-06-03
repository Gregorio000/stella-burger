import { configureStore } from '@reduxjs/toolkit';
import userSlice, {
  registerUser,
  loginUser,
  logoutUser,
  fetchUser,
  updateUser,
  selectIsAuthenticated,
  selectUserData,
  selectLoginError,
  selectRegisterError,
  TUserState
} from '../user-slice';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';

// Моки
jest.mock('@api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn()
}));

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

const mockRegUserApi = registerUserApi as jest.MockedFunction<
  typeof registerUserApi
>;
const mockLogUserApi = loginUserApi as jest.MockedFunction<typeof loginUserApi>;
const mockLogoutApi = logoutApi as jest.MockedFunction<typeof logoutApi>;
const mockGetUserApi = getUserApi as jest.MockedFunction<typeof getUserApi>;
const mockUpdUserApi = updateUserApi as jest.MockedFunction<
  typeof updateUserApi
>;
const mockSetCook = jest.requireMock('../../utils/cookie').setCookie;
const mockDelCook = jest.requireMock('../../utils/cookie').deleteCookie;

describe('Слайс пользователя', () => {
  const mockUser: TUser = {
    name: 'Test User',
    email: 'test_user_9876543210@test.com'
  };

  const mockApiResponse = {
    success: true,
    user: mockUser,
    accessToken: 'access-token',
    refreshToken: 'refresh-token'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Возвращение начального состояния', () => {
    expect(userSlice(undefined, { type: 'unknown' })).toEqual({
      data: null,
      isAuthenticated: false
    });
  });

  describe('Асинхронные операции', () => {
    describe('registerUser', () => {
      it('Обрабатывает состояние pending', () => {
        const action = { type: registerUser.pending.type };
        const state = userSlice(undefined, action);
        expect(state.registerError).toBeUndefined();
      });

      it('Обрабатывает состояние fulfilled', () => {
        const action = {
          type: registerUser.fulfilled.type,
          payload: mockUser
        };
        const state = userSlice(undefined, action);
        expect(state.registerError).toBeUndefined();
        expect(state.isAuthenticated).toBe(true);
        expect(state.data).toEqual(mockUser);
      });

      it('Обрабатывает состояние rejected', () => {
        const error = { message: 'Registration failed' };
        const action = {
          type: registerUser.rejected.type,
          error,
          payload: error,
          meta: {
            rejectedWithValue: true
          }
        };
        const state = userSlice(undefined, action);
        expect(state.registerError).toEqual(error);
      });

      it('Успешная регистрация пользователя', async () => {
        mockRegUserApi.mockResolvedValue(mockApiResponse);

        const store = configureStore({
          reducer: {
            user: userSlice
          }
        });

        await store.dispatch(
          registerUser({
            name: 'Test User',
            email: 'test_user_9876543210@test.com',
            password: '987654321'
          })
        );

        const state = store.getState().user;
        expect(mockSetCook).toHaveBeenCalledTimes(2);
        expect(state.isAuthenticated).toBe(true);
        expect(state.data).toEqual(mockUser);
      });
    });

    describe('loginUser', () => {
      it('Обрабатывает состояние pending', () => {
        const action = { type: loginUser.pending.type };
        const state = userSlice(undefined, action);
        expect(state.loginError).toBeUndefined();
      });

      it('Обрабатывает состояние fulfilled', () => {
        const action = {
          type: loginUser.fulfilled.type,
          payload: mockUser
        };
        const state = userSlice(undefined, action);
        expect(state.loginError).toBeUndefined();
        expect(state.isAuthenticated).toBe(true);
        expect(state.data).toEqual(mockUser);
      });

      it('Обрабатывает состояние rejected', () => {
        const error = { message: 'Login failed' };
        const action = {
          type: loginUser.rejected.type,
          error,
          payload: error,
          meta: {
            rejectedWithValue: true
          }
        };
        const state = userSlice(undefined, action);
        expect(state.loginError).toEqual(error);
      });

      it('Успешное авторизовывание пользователя', async () => {
        mockLogUserApi.mockResolvedValue(mockApiResponse);

        const store = configureStore({
          reducer: {
            user: userSlice
          }
        });

        await store.dispatch(
          loginUser({
            email: 'test_user_9876543210@test.com',
            password: '987654321'
          })
        );

        const state = store.getState().user;
        expect(mockSetCook).toHaveBeenCalledWith('accessToken', 'access-token');
        expect(state.isAuthenticated).toBe(true);
        expect(state.data).toEqual(mockUser);
      });
    });

    describe('logoutUser', () => {
      it('Обрабатывает состояние fulfilled', () => {
        const initialStateWithUser: TUserState = {
          data: mockUser,
          isAuthenticated: true
        };

        const action = { type: logoutUser.fulfilled.type };
        const state = userSlice(initialStateWithUser, action);
        expect(state.isAuthenticated).toBe(false);
        expect(state.data).toBeNull();
      });

      it('Успешное выполнение выхода пользователя', async () => {
        mockLogoutApi.mockResolvedValue({ success: true });

        const store = configureStore({
          reducer: {
            user: userSlice
          },
          preloadedState: {
            user: {
              data: mockUser,
              isAuthenticated: true
            }
          }
        });

        await store.dispatch(logoutUser());

        const state = store.getState().user;
        expect(mockDelCook).toHaveBeenCalledWith('accessToken');
        expect(state.isAuthenticated).toBe(false);
        expect(state.data).toBeNull();
      });
    });

    describe('fetchUser', () => {
      it('Обрабатывает состояние fulfilled', () => {
        const action = {
          type: fetchUser.fulfilled.type,
          payload: mockUser
        };
        const state = userSlice(undefined, action);
        expect(state.isAuthenticated).toBe(true);
        expect(state.data).toEqual(mockUser);
      });

      it('Успешное получение данных пользователя', async () => {
        mockGetUserApi.mockResolvedValue({
          success: true,
          user: mockUser
        });

        const store = configureStore({
          reducer: {
            user: userSlice
          }
        });

        await store.dispatch(fetchUser());

        const state = store.getState().user;
        expect(state.isAuthenticated).toBe(true);
        expect(state.data).toEqual(mockUser);
      });
    });

    describe('updateUser', () => {
      it('Обрабатывает состояние fulfilled', () => {
        const updatedUser = {
          ...mockUser,
          name: 'Test User'
        };

        const action = {
          type: updateUser.fulfilled.type,
          payload: updatedUser
        };
        const state = userSlice(undefined, action);
        expect(state.data).toEqual(updatedUser);
      });

      it('Успешное обновление данных пользователя', async () => {
        const updatedUser = {
          ...mockUser,
          name: 'Test User'
        };

        mockUpdUserApi.mockResolvedValue({
          success: true,
          user: updatedUser
        });

        const store = configureStore({
          reducer: {
            user: userSlice
          },
          preloadedState: {
            user: {
              data: mockUser,
              isAuthenticated: true
            }
          }
        });

        await store.dispatch(
          updateUser({
            name: 'Test User',
            email: 'test_user_9876543210@test.com'
          })
        );

        const state = store.getState().user;
        expect(state.data).toEqual(updatedUser);
      });
    });
  });

  describe('Селекторы', () => {
    const mockState = {
      user: {
        data: mockUser,
        isAuthenticated: true,
        loginError: null,
        registerError: null
      },
      feed: {} as any,
      builder: {} as any,
      ingredients: {} as any,
      order: {} as any
    };

    it('Выводит статус аутентификации', () => {
      // @ts-ignore
      expect(selectIsAuthenticated(mockState)).toBe(true);
    });

    it('Выводит данные пользователя', () => {
      // @ts-ignore
      expect(selectUserData(mockState)).toEqual(mockUser);
    });

    it('Выводит ошибку авторизации', () => {
      const errorState = {
        ...mockState,
        user: {
          ...mockState.user,
          loginError: { message: 'Login failed' }
        }
      };
      // @ts-ignore
      expect(selectLoginError(errorState)).toEqual({ message: 'Login failed' });
    });

    it('Выводит ошибку регистрации', () => {
      const errorState = {
        ...mockState,
        user: {
          ...mockState.user,
          registerError: { message: 'Register failed' }
        }
      };
      // @ts-ignore
      expect(selectRegisterError(errorState)).toEqual({
        message: 'Register failed'
      });
    });
  });
});
