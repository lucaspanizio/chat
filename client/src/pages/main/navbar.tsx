import { useStorage } from '@/hooks/use-storage';
import { useNavigate } from '@tanstack/react-router';

export const Navbar = () => {
  const navigate = useNavigate();
  const { getStorage } = useStorage();

  const { name } = getStorage({
    key: 'USER',
    type: 'local',
    defaultValue: { name: '', username: '' },
  });

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-foreground text-white font-semibold flex items-center px-6 shadow-md w-full z-30 ">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white text-lg font-bold select-none">
          {initials}
        </div>
        <span className="text-base">{name}</span>
      </div>

      <button
        type="button"
        className="ml-auto text-white hover:text-emerald-400 transition-colors"
        onClick={() => {
          sessionStorage.removeItem('@chat:token');
          navigate({ to: '/login' });
        }}>
        Sair
      </button>
    </nav>
  );
};
