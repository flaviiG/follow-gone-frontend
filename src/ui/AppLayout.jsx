import { Outlet } from 'react-router-dom';
import AppNavBar from './AppNavBar';
import ProtectedRoute from './ProtectedRoute';

function AppLayout() {
  return (
    <>
      <ProtectedRoute>
        <div className="h-screen overflow-hidden bg-slate-900">
          <AppNavBar />
          <div className="h-[calc(100vh-83px-1.75rem)]">
            <Outlet />
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}

export default AppLayout;
