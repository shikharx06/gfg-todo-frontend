import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MyNavbar } from './components/Navbar';
import { TodoList } from './pages/TodoList';
import { TodoDetails } from './pages/TodoDetails';
import { Login } from './pages/Login';
import { useEffect, useState } from 'react';
import { safelyParseJson } from './utils/util';
import { useSnapshot } from 'valtio/react';
import { authStore } from './store/auth';
import { axiosInstance } from './api';

const ProtectedRoute = (props: any) => {
  const authData = useSnapshot(authStore);

  useEffect(() => {
    const _authData = safelyParseJson(localStorage.getItem('auth'));
    authStore.data = _authData;
    axiosInstance.defaults.headers.common['Authorization'] =
      'Bearer ' + _authData?.token;
  }, []);

  if (!authData.data)
    return (
      <div className="w-full flex justify-center items-center h-full flex-col">
        You are not authorized to view this page.
        <a href="/login" className="text-blue-500">
          Login to continue
        </a>
      </div>
    );

  return <>{props.children}</>;
};

function App() {
  return (
    <div className="overflow-hidden h-screen bg-default-200">
      <MyNavbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TodoList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo/:id"
            element={
              <ProtectedRoute>
                <TodoDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
