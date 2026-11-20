import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { router } from './router';
import { checkAuth } from '../features/auth/authSlice';
import { ThemeProvider } from '../context/ThemeContext';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // If a token exists in localStorage, verify session
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default App;
