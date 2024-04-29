import { useState } from 'react';
import { useAuth } from '../provider/authProvider';
import { useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../services/authApi';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const { setToken, setUser } = useAuth();

  const navigate = useNavigate();

  async function signup() {
    setIsLoading(true);
    const newUser = { email, password, passwordConfirm, instagramUsername };
    try {
      setEmail('');
      setPassword('');
      const { token, user } = await signupApi(newUser);
      setToken(token);
      setUser(user);
      toast.success('You are registered!');
      navigate('/app');
    } catch (err) {
      toast.error(err.response.data.message);
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
            <p className="text-xl font-bold">Create your account</p>
            <form className=" w-[70%] flex flex-col gap-4" onSubmit={signup}>
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
              <input
                className="appearance-none focus:outline-none focus:border-b-4 p-1 bg-transparent shadow-lg rounded-lg border-b-2 block border-slate-400 placeholder:italic placeholder:text-sm placeholder:text-slate-400"
                type="password"
                placeholder="confirm password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <input
                className="appearance-none focus:outline-none focus:border-b-4 p-1 bg-transparent shadow-lg rounded-lg border-b-2 block border-slate-400 placeholder:italic placeholder:text-sm placeholder:text-slate-400"
                type="text"
                placeholder="instagram username"
                value={instagramUsername}
                onChange={(e) => setInstagramUsername(e.target.value)}
              />
              <button className="hidden" type="submit"></button>
              <p className="text-xs text-slate-400 text-center">
                Already have an account?{' '}
                <span
                  className="text-slate-200 font-semibold"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </span>
              </p>
            </form>
            <Button onClick={signup}>Sign up</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
