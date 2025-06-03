import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, OrdersInfo, IngrDet, Modal } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUser, selectIsAuthenticated } from '../../slices/user-slice';
import { useEffect } from 'react';
import { fetchIngredients } from '../../slices/ingredients-slice';
import { closeOrderModalData } from '../../slices/order-slice';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchIngredients());
  }, []);

  const handleModalClose = () => {
    // Возвращаемся на предыдущий маршрут
    navigate(-1);
    dispatch(closeOrderModalData());
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {/* Основные маршруты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {/* Маршруты с модальными окнами */}
        <Route path='/feed/:number' element={<OrdersInfo />} />
        <Route path='/ingredients/:id' element={<IngrDet />} />

        {/* Защищённые маршруты */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrdersInfo />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <OrdersInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngrDet />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <OrdersInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

// Компонент для защищённых маршрутов
const ProtectedRoute = ({
  children,
  anonymous = false
}: {
  children: JSX.Element;
  anonymous?: boolean;
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (anonymous && isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!anonymous && !isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default App;
