import { Menu, ShoppingBag, Store, UserRound } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/Button.jsx';

const customerLinks = [
  { to: '/marketplace', label: 'Market' },
  { to: '/orders', label: 'Orders' },
  { to: '/business', label: 'Business' },
  { to: '/admin', label: 'Admin' },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink className="brand" to="/" aria-label="MarketLane home">
          <span className="brand__mark" aria-hidden="true">
            ML
          </span>
          <span>MarketLane</span>
        </NavLink>

        <nav className="site-nav" aria-label="Primary navigation">
          {customerLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <Button to="/cart" variant="ghost" icon={<ShoppingBag size={18} />}>
            Cart
          </Button>
          <Button to="/login" variant="secondary" icon={<UserRound size={18} />}>
            Login
          </Button>
          <Button to="/register" icon={<Store size={18} />}>
            Join
          </Button>
        </div>

        <button
          aria-expanded={isMenuOpen}
          aria-label="Open menu"
          className="mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          <Menu size={22} />
        </button>
      </div>

      {isMenuOpen ? (
        <div className="site-header__mobile-panel">
          <nav aria-label="Mobile navigation">
            {customerLinks.map((link) => (
              <NavLink key={link.to} onClick={closeMenu} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div>
            <Button to="/cart" variant="ghost" icon={<ShoppingBag size={18} />} onClick={closeMenu}>
              Cart
            </Button>
            <Button to="/login" variant="secondary" icon={<UserRound size={18} />} onClick={closeMenu}>
              Login
            </Button>
            <Button to="/register" icon={<Store size={18} />} onClick={closeMenu}>
              Join
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
