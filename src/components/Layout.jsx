import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const { isAdmin, logout } = useAuth();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <nav className="mx-auto flex max-w-6xl items-center gap-3 p-3 text-sm">
          <Link to="/sales" className="font-semibold">Fast Sale</Link>
          <Link to="/map">Map</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
          <button className="ml-auto rounded bg-slate-800 px-3 py-1 text-white" onClick={logout}>Logout</button>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
