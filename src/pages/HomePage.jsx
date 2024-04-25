import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center flex-col gap-12 justify-around h-full text-slate-200 font-rowdies px-2">
      <div className="h-[80%] flex flex-col justify-around items-center">
        <div className="max-w-[415px]">
          <p className="text-6xl font-bold border-b-8 border-[#5B51D8]">
            Stay in the <span className="text-[#5B51D8]">loop</span>.
          </p>
          <p className="font-extralight tracking-widest text-2xl border-b-8 border-[#5B51D8]">
            See who&apos;s stepping out.{' '}
          </p>
          <p className="text-4xl mt-[-10px]">
            <span className="text-[#5B51D8] text-6xl">Uncover</span> your{' '}
            <span className="text-[#F56040]">unfollowers</span> with ease!
          </p>
        </div>
        <div className="font-sans">
          <Button type="transparent" onClick={() => navigate('/login')}>
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
