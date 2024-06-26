import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePageLayout from './ui/HomePageLayout';
import AppLayout from './ui/AppLayout';
import ProfilePage from './pages/ProfilePage';
import GetFollowersPage from './pages/GetFollowersPage';
import AuthProvider from './provider/authProvider';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePageLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="get-followers" />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="get-followers" element={<GetFollowersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
