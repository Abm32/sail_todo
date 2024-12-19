import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser, setError } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skull } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      }));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  return (
    <div className="min-h-screen bg-[#1a237e] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <Skull className="mx-auto h-12 w-12 text-[#d32f2f]" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Join the Crew!</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-gray-300 focus:border-[#d32f2f]"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-300 focus:border-[#d32f2f]"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold"
          >
            Set Sail!
          </Button>
        </form>
      </div>
    </div>
  );
}