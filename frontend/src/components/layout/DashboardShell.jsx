import { ClipboardList, LayoutDashboard, Package, Settings, ShieldCheck, Store } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const businessLinks = [
  { to: '/business', label: 'Overview', icon: LayoutDashboard },
  { to: '/business/profile', label: 'Profile', icon: Store },
  { to: '/business/products', label: 'Products', icon: Package },
  { to: '/business/orders', label: 'Orders', icon: ClipboardList },
];

const adminLinks = [
  { to: '/admin', label: 'Admin home', icon: ShieldCheck },
  { to: '/business/orders', label: 'Orders view', icon: ClipboardList },
  { to: '/business/profile', label: 'Settings', icon: Settings },
];

export function DashboardShell({ children, mode = 'business' }) {
  const links = mode === 'admin' ? adminLinks : businessLinks;
  const label = mode === 'admin' ? 'Admin workspace' : 'Business workspace';

  return (
    <main className="workspace">
      <aside className="workspace__nav" aria-label={label}>
        <div className="workspace__label">{label}</div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink key={link.to} to={link.to} end={link.to === '/business' || link.to === '/admin'}>
              <Icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </aside>
      <section className="workspace__content">{children}</section>
    </main>
  );
}
