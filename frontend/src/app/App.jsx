import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { router } from './router';
import { checkAuth } from '../features/auth/state/authSlice';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Lock document to Light Mode permanently
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('khushi_portfolio_theme');

    // If a token exists in localStorage, verify session
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
