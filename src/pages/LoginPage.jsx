import { useState } from 'react';
import { login as loginApi } from '../services/authApi';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setToken, setUser } = useAuth();

  const navigate = useNavigate();

  const currentToken = localStorage.getItem('jwt-gone');

  if (currentToken) return <Navigate to="/app" />;

  async function login() {
    try {
      setIsLoading(true);
      setEmail('');
      setPassword('');
      const { token, user } = await loginApi(email, password);
      setToken(token);
      setUser(user);

      navigate('/app');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-6 rounded-xl w-[400px] h-[500px] mx-2 bg-slate-700 text-slate-100 flex flex-col items-center justify-between">
        {isLoading ? (
          <>
            <div></div>
            <Spinner />
            <div></div>
          </>
        ) : (
          <>
            <p className="text-xl font-bold">Enter your credentials</p>
            <form
              className="flex flex-col gap-4 w-[70%]"
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
            >
              <input
                className="appearance-none focus:outline-none focus:border-b-4 p-1 bg-transparent shadow-lg rounded-lg border-b-2 block border-slate-400 placeholder:italic placeholder:text-sm placeholder:text-slate-400"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="appearance-none focus:outline-none focus:border-b-4 p-1 bg-transparent shadow-lg rounded-lg border-b-2 block border-slate-400 placeholder:italic placeholder:text-sm placeholder:text-slate-400"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="hidden" type="submit"></button>
              <p className="text-xs text-slate-400 text-center">
                You don&apos;t have an account?{' '}
                <span
                  className="text-slate-200 font-semibold"
                  onClick={() => navigate('/register')}
                >
                  Sign up
                </span>
              </p>
            </form>

            <Button onClick={login}>Log in</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
