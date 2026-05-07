import { ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '../../../components/forms/TextField.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';

export function BuyerLoginPage() {
  const navigate = useNavigate();
  const { setActiveRole } = useMarketplace();

  const handleSubmit = (event) => {
    event.preventDefault();
    setActiveRole('buyer');
    navigate('/buyer/dashboard');
  };

  return (
    <main className="page-shell auth-page">
      <section className="auth-copy">
        <span className="eyebrow">Buyer account</span>
        <h1>Log in to keep shopping local with your saved cart and orders.</h1>
        <p>
          Use the demo login to enter the buyer experience, view your profile, and
          continue shopping from saved favourites.
        </p>
      </section>

      <section className="auth-panel" aria-labelledby="buyer-login-title">
        <h2 id="buyer-login-title">Buyer Login</h2>
        <form className="form-stack" onSubmit={handleSubmit}>
          <TextField label="Email address" name="email" type="email" defaultValue="masego@example.com" />
          <TextField label="Password" name="password" type="password" placeholder="Any demo password" />
          <Button icon={<ShoppingBag size={18} />} type="submit">
            Log in as buyer
          </Button>
        </form>
        <p className="auth-panel__footer">
          New buyer? <Link to="/buyer/register">Create a buyer account</Link>
        </p>
      </section>
    </main>
  );
}
