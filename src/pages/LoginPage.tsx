import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skull } from 'lucide-react';
import { toast } from 'sonner';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      toast.error('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a237e] to-[#0d47a1] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <Skull className="mx-auto h-12 w-12 text-[#d32f2f]" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back Pirate!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ready to continue your adventure?
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-gray-300 focus:border-[#d32f2f]"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-300 focus:border-[#d32f2f]"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold"
            disabled={loading}
          >
            {loading ? 'Setting Sail...' : 'Set Sail!'}
          </Button>
          <p className="text-center text-sm text-gray-600">
            New to the crew?{' '}
            <Link to="/signup" className="text-[#d32f2f] hover:text-[#b71c1c] font-medium">
              Join us!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}