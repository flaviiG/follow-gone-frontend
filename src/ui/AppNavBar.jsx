import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../provider/authProvider';

function AppNavBar() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  function logout() {
    setToken();
    navigate('/home');
  }

  return (
    <div className="bg-[#5B51D8] h-[63px]">
      <header className="flex h-full mt-7 items-center text-slate-100 justify-between py-[0.2rem] px-2 md:px-20">
        <NavLink to="/home">
          <div className="absolute top-0">
            <img src="/logo.png" width="90px" alt="Logo image" />
          </div>
          <p className="ml-24 text-xl font-rowdies font-thin sm:text-4xl">
            Follow Gone
          </p>
        </NavLink>
        <div className="flex items-center gap-4 py-4 text-sm sm:gap-10 sm:text-base">
          <NavLink to="get-followers">Profile</NavLink>
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </div>
      </header>
    </div>
  );
}

export default AppNavBar;
