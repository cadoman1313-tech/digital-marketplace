import { Store } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '../../../components/forms/TextField.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { sellerAccounts } from '../../../data/mockData.js';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';

export function SellerLoginPage() {
  const navigate = useNavigate();
  const { setActiveRole } = useMarketplace();
  const seller = sellerAccounts[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    setActiveRole('seller');
    navigate('/seller/dashboard');
  };

  return (
    <main className="page-shell auth-page">
      <section className="auth-copy">
        <span className="eyebrow">Seller account</span>
        <h1>Log in to manage your profile, stock, and incoming orders.</h1>
        <p>
          Sellers get a focused workspace for the practical things: products,
          stock levels, contact details, and customer orders.
        </p>
      </section>

      <section className="auth-panel" aria-labelledby="seller-login-title">
        <h2 id="seller-login-title">Seller Login</h2>
        <form className="form-stack" onSubmit={handleSubmit}>
          <TextField label="Seller email" name="email" type="email" defaultValue={seller.email} />
          <TextField label="Password" name="password" type="password" placeholder="Any demo password" />
          <Button icon={<Store size={18} />} type="submit">
            Log in as seller
          </Button>
        </form>
        <p className="auth-panel__footer">
          New seller? <Link to="/seller/register">Register a storefront</Link>
        </p>
      </section>
    </main>
  );
}
