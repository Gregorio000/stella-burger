import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../slices/user-slice';

export const ProfileM: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login'); // Перенаправляем на страницу входа
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return <ProfileMUI handleLogout={handleLogout} pathname={pathname} />;
};
