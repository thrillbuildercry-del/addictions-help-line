import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login, signup, user } = useAuth();
  const [mode, setMode] = useState('signin');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  if (user) return <Navigate to="/sales" replace />;

  const isSignUp = mode === 'signup';

  return (
    <div className="mx-auto mt-20 max-w-sm rounded-xl bg-white p-6 shadow">
      <h1 className="text-xl font-semibold">{isSignUp ? 'Create account' : 'Sign in'}</h1>
      <p className="mt-1 text-sm text-slate-500">
        {isSignUp ? 'New accounts are created as worker users by default.' : 'Use your email and password to continue.'}
      </p>

      <form
        className="mt-4 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setError('');
          setPending(true);

          try {
            const fd = new FormData(e.currentTarget);
            const email = String(fd.get('email') || '').trim();
            const password = String(fd.get('password') || '');
            const confirmPassword = String(fd.get('confirmPassword') || '');

            if (isSignUp) {
              if (password.length < 6) throw new Error('Password must be at least 6 characters.');
              if (password !== confirmPassword) throw new Error('Passwords do not match.');
              await signup(email, password);
            } else {
              await login(email, password);
            }
          } catch (err) {
            setError(err?.message || 'Authentication failed.');
          } finally {
            setPending(false);
          }
        }}
      >
        <input name="email" type="email" required placeholder="Email" className="w-full rounded border p-2" />
        <input
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="Password"
          className="w-full rounded border p-2"
        />

        {isSignUp && (
          <input
            name="confirmPassword"
            type="password"
            required
            minLength={6}
            placeholder="Confirm password"
            className="w-full rounded border p-2"
          />
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button className="w-full rounded bg-slate-900 py-2 text-white disabled:opacity-70" type="submit" disabled={pending}>
          {pending ? 'Please wait…' : isSignUp ? 'Create account' : 'Login'}
        </button>
      </form>

      <button
        type="button"
        className="mt-3 w-full text-sm text-slate-700 underline"
        onClick={() => {
          setError('');
          setMode((current) => (current === 'signin' ? 'signup' : 'signin'));
        }}
      >
        {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
      </button>
    </div>
  );
}
