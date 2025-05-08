//App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from './contexts/AuthContext';
import EditTaskPage from './pages/EditTaskPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';

function App() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/edit/:id"
          element={currentUser ? <EditTaskPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={currentUser ? <Navigate to="/dashboard" /> : <RegisterPage />}
        />
        <Route
          path="/dashboard"
          element={currentUser ? <DashboardPage /> : <Navigate to="/login" />}
        />
        {/* You can add routes like /tasks/:id or /register later */}
        <Route path="*" element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
