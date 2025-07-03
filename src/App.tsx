import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeToggle from './components/ThemeToggle';
import Home from './Home';


const App: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-t-teal-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#00B96B',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#f5222d',
          colorInfo: '#722ED1',
          borderRadius: 8,
        },
      }}
    >
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <Routes>
           
  <Route path="/" element={<Home />} />
  <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
  <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          </Routes>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
