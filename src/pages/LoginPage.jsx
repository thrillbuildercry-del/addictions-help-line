import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login, user } = useAuth();
  const [error, setError] = useState('');

  if (user) return <Navigate to="/sales" replace />;

  return (
    <div className="mx-auto mt-20 max-w-sm rounded-xl bg-white p-6 shadow">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <form
        className="mt-4 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setError('');
          const fd = new FormData(e.currentTarget);
          try {
            await login(fd.get('email'), fd.get('password'));
          } catch {
            setError('Invalid credentials.');
          }
        }}
      >
        <input name="email" type="email" required placeholder="Email" className="w-full rounded border p-2" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded border p-2" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full rounded bg-slate-900 py-2 text-white" type="submit">Login</button>
      </form>
    </div>
  );
}
