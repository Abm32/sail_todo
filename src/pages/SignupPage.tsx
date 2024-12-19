import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Anchor } from 'lucide-react';
import { toast } from 'sonner';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: username
      });
      toast.success('Welcome aboard! Your account has been created.');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a237e] to-[#0d47a1] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <Anchor className="mx-auto h-12 w-12 text-[#d32f2f]" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Join Our Crew!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Begin your adventure with us
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-gray-300 focus:border-[#d32f2f]"
              required
            />
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
              minLength={6}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold"
            disabled={loading}
          >
            {loading ? 'Preparing Ship...' : 'Join the Crew!'}
          </Button>
          <p className="text-center text-sm text-gray-600">
            Already a crew member?{' '}
            <Link to="/login" className="text-[#d32f2f] hover:text-[#b71c1c] font-medium">
              Set sail!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}