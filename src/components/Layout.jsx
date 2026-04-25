import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs transition ${
          isActive ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-white/10'
        }`
      }
    >
      <span aria-hidden>{icon}</span>
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export default function Layout() {
  const { isAdmin, logout, profile } = useAuth();

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-cyan-300">Sales Ops</p>
            <h1 className="text-sm font-semibold text-slate-100">Field Console</h1>
          </div>
          <div className="ml-auto hidden text-right sm:block">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="text-sm font-medium text-slate-200">{profile?.email || 'User'}</p>
          </div>
          <button type="button" className="btn-secondary ml-auto sm:ml-4" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/95 px-3 py-2 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-md items-center gap-2">
          <NavItem to="/sales" label="Sales" icon="🛒" />
          <NavItem to="/map" label="Map" icon="📍" />
          {isAdmin && <NavItem to="/admin" label="Admin" icon="🛡️" />}
        </div>
      </nav>
    </div>
  );
}
