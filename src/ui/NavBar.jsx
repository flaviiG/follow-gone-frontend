import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className="bg-[#5B51D8] h-[63px]">
      <header className="flex mt-7 h-full items-center text-slate-100 justify-between py-[0.2rem] px-2 md:px-20 transition-all">
        <NavLink className="flex items-center" to="/home">
          <div className="absolute top-0">
            <img src="/logo.png" width="90px" />
          </div>
          <p className="ml-24 text-xl font-rowdies font-thin sm:text-4xl transition-all">
            Follow Gone
          </p>
        </NavLink>
        <div className="flex items-center gap-4 py-4 text-sm sm:text-base sm:gap-10 transition-all">
          <NavLink
            className={({ isActive }) => (isActive ? 'font-bold' : '')}
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'font-bold' : '')}
            to="/register"
          >
            Sign up
          </NavLink>
        </div>
      </header>
    </div>
  );
}

export default NavBar;
