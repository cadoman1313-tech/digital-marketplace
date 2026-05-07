import { ChevronDown, Menu, ShoppingBag, Store, UserRound } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMarketplace } from '../../state/MarketplaceContext.jsx';
import { Button } from '../ui/Button.jsx';

const roleLabels = {
  guest: 'Guest',
  buyer: 'Buyer',
  seller: 'Seller',
  admin: 'Admin',
};

const commonLinks = [
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/sellers', label: 'Sellers' },
];

const roleLinks = {
  guest: [],
  buyer: [
    { to: '/buyer/dashboard', label: 'Buyer Dashboard' },
    { to: '/orders', label: 'Orders' },
  ],
  seller: [
    { to: '/seller/dashboard', label: 'Seller Dashboard' },
    { to: '/business/products', label: 'Products' },
    { to: '/business/orders', label: 'Seller Orders' },
  ],
  admin: [{ to: '/admin', label: 'Admin' }],
};

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeRole, cartItemCount, setActiveRole } = useMarketplace();
  const visibleLinks = [...commonLinks, ...(roleLinks[activeRole] || roleLinks.guest)];

  const closeMenu = () => setIsMenuOpen(false);
  const chooseRole = (role) => {
    setActiveRole(role);
    closeMenu();
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink className="brand" to="/" aria-label="LocalMart home">
          <span className="brand__mark" aria-hidden="true">
            ML
          </span>
          <span>LocalMart</span>
        </NavLink>

        <nav className="site-nav" aria-label="Primary navigation">
          {visibleLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <Button to="/cart" variant="ghost" icon={<ShoppingBag size={18} />}>
            <span className="cart-label">
              Cart
              <span className="cart-count">{cartItemCount}</span>
            </span>
          </Button>
          <details className="account-menu">
            <summary>
              <UserRound size={18} />
              <span>{roleLabels[activeRole]}</span>
              <ChevronDown size={15} />
            </summary>
            <div className="account-menu__panel">
              <span className="account-menu__label">Preview as</span>
              <div className="role-switcher" aria-label="Preview user type">
                {Object.keys(roleLabels).map((role) => (
                  <button
                    className={activeRole === role ? 'is-active' : ''}
                    key={role}
                    onClick={() => chooseRole(role)}
                    type="button"
                  >
                    {roleLabels[role]}
                  </button>
                ))}
              </div>
              <NavLink to="/buyer/login">Buyer Login</NavLink>
              <NavLink to="/buyer/register">Buyer Register</NavLink>
              <NavLink to="/seller/login">Seller Login</NavLink>
              <NavLink to="/seller/register">Seller Register</NavLink>
            </div>
          </details>
          <Button to="/seller/register" icon={<Store size={18} />}>
            Sell
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
            {visibleLinks.map((link) => (
              <NavLink key={link.to} onClick={closeMenu} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <span className="account-menu__label">Preview as</span>
          <div className="role-switcher role-switcher--mobile" aria-label="Preview user type">
            {Object.keys(roleLabels).map((role) => (
              <button
                className={activeRole === role ? 'is-active' : ''}
                key={role}
                onClick={() => chooseRole(role)}
                type="button"
              >
                {roleLabels[role]}
              </button>
            ))}
          </div>
          <div>
            <Button to="/cart" variant="ghost" icon={<ShoppingBag size={18} />} onClick={closeMenu}>
              <span className="cart-label">
                Cart
                <span className="cart-count">{cartItemCount}</span>
              </span>
            </Button>
            <Button to="/buyer/login" variant="secondary" icon={<UserRound size={18} />} onClick={closeMenu}>
              Buyer Login
            </Button>
            <Button to="/buyer/register" variant="ghost" onClick={closeMenu}>
              Buyer Register
            </Button>
            <Button to="/seller/login" variant="secondary" onClick={closeMenu}>
              Seller Login
            </Button>
            <Button to="/seller/register" icon={<Store size={18} />} onClick={closeMenu}>
              Seller Register
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
