import { Ship } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function TodoHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
      toast.success('Successfully logged out!');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Ship className="w-10 h-10 text-white mr-3" />
        <h1 className="text-4xl font-bold text-white">Straw Hat Todo</h1>
      </div>
      <Button
        onClick={handleLogout}
        className="bg-[#d32f2f] hover:bg-[#b71c1c] text-white"
      >
        Abandon Ship
      </Button>
    </div>
  );
}