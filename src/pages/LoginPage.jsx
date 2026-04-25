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
<<<<<<< Updated upstream
    <div className="flex min-h-[80vh] items-center justify-center px-3 py-8">
      <div className="glass-card w-full max-w-md p-6 sm:p-8">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-widest text-cyan-300">Sales Ops</p>
          <h1 className="mt-1 text-2xl font-semibold text-white">{isSignUp ? 'Create your account' : 'Welcome back'}</h1>
          <p className="mt-1 text-sm text-slate-300">
            {isSignUp ? 'Sign up to access the app. New accounts start as worker role.' : 'Sign in with your email and password.'}
          </p>
        </div>
=======
<<<<<<< ours
    <div className="mx-auto mt-20 max-w-sm rounded-xl bg-white p-6 shadow">
      <h1 className="text-xl font-semibold">{isSignUp ? 'Create account' : 'Sign in'}</h1>
      <p className="mt-1 text-sm text-slate-500">
        {isSignUp ? 'New accounts are created as worker users by default.' : 'Use your email and password to continue.'}
      </p>
>>>>>>> Stashed changes

        <form
          className="space-y-3"
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
          <label className="block text-sm text-slate-200">
            Email
            <input name="email" type="email" required placeholder="you@example.com" className="field-input" autoComplete="email" />
          </label>

          <label className="block text-sm text-slate-200">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="field-input"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
          </label>

          {isSignUp && (
            <label className="block text-sm text-slate-200">
              Confirm password
              <input
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="field-input"
                autoComplete="new-password"
              />
            </label>
          )}

          {error && <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-2 text-sm text-rose-200">{error}</p>}

          <button className="btn-primary w-full" type="submit" disabled={pending}>
            {pending ? 'Please wait…' : isSignUp ? 'Create account' : 'Login'}
          </button>
        </form>

        <button
          type="button"
          className="mt-4 w-full text-sm text-cyan-300 underline underline-offset-4"
          onClick={() => {
            setError('');
            setMode((current) => (current === 'signin' ? 'signup' : 'signin'));
          }}
        >
          {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
        </button>
<<<<<<< Updated upstream
      </div>
=======
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
=======
    <div className="flex min-h-[80vh] items-center justify-center px-3 py-8">
      <div className="glass-card w-full max-w-md p-6 sm:p-8">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-widest text-cyan-300">Sales Ops</p>
          <h1 className="mt-1 text-2xl font-semibold text-white">{isSignUp ? 'Create your account' : 'Welcome back'}</h1>
          <p className="mt-1 text-sm text-slate-300">
            {isSignUp ? 'Sign up to access the app. New accounts start as worker role.' : 'Sign in with your email and password.'}
          </p>
        </div>

        <form
          className="space-y-3"
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
          <label className="block text-sm text-slate-200">
            Email
            <input name="email" type="email" required placeholder="you@example.com" className="field-input" autoComplete="email" />
          </label>

          <label className="block text-sm text-slate-200">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="field-input"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
          </label>

          {isSignUp && (
            <label className="block text-sm text-slate-200">
              Confirm password
              <input
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="field-input"
                autoComplete="new-password"
              />
            </label>
          )}

          {error && <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-2 text-sm text-rose-200">{error}</p>}

          <button className="btn-primary w-full" type="submit" disabled={pending}>
            {pending ? 'Please wait…' : isSignUp ? 'Create account' : 'Login'}
          </button>
        </form>

        <button
          type="button"
          className="mt-4 w-full text-sm text-cyan-300 underline underline-offset-4"
          onClick={() => {
            setError('');
            setMode((current) => (current === 'signin' ? 'signup' : 'signin'));
          }}
        >
          {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
        </button>
      </div>
>>>>>>> theirs
>>>>>>> Stashed changes
    </div>
  );
}
