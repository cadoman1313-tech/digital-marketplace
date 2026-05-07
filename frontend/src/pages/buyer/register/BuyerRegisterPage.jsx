import { ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '../../../components/forms/TextField.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';

export function BuyerRegisterPage() {
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
        <span className="eyebrow">Buyer registration</span>
        <h1>Create a buyer account for local shopping and order tracking.</h1>
        <p>
          The frontend stores the prototype mode locally for now. Backend account
          creation will replace this flow later.
        </p>
      </section>

      <section className="auth-panel" aria-labelledby="buyer-register-title">
        <h2 id="buyer-register-title">Buyer Register</h2>
        <form className="form-stack" onSubmit={handleSubmit}>
          <TextField label="Full name" name="name" placeholder="Your name" />
          <TextField label="Email address" name="email" type="email" placeholder="you@example.com" />
          <TextField label="Preferred area" name="location" placeholder="Gaborone, Tlokweng, or Maun" />
          <TextField label="Password" name="password" type="password" placeholder="Create password" />
          <Button icon={<ShoppingBag size={18} />} type="submit">
            Create buyer account
          </Button>
        </form>
        <p className="auth-panel__footer">
          Already have an account? <Link to="/buyer/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
