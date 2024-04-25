import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function HomePageLayout() {
  return (
    <div className="h-screen overflow-hidden bg-slate-900">
      <NavBar />
      <div className="h-[calc(100vh-83px-1.75rem)]">
        <Outlet />
      </div>
    </div>
  );
}

export default HomePageLayout;
