import { Store } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '../../../components/forms/TextField.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';

export function SellerRegisterPage() {
  const navigate = useNavigate();
  const { setActiveRole, updateSellerProfile } = useMarketplace();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    updateSellerProfile({
      businessName: formData.get('businessName'),
      category: formData.get('category'),
      owner: formData.get('owner'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      bio: formData.get('bio'),
    });
    setActiveRole('seller');
    navigate('/seller/dashboard');
  };

  return (
    <main className="page-shell auth-page">
      <section className="auth-copy">
        <span className="eyebrow">Seller registration</span>
        <h1>Register a local storefront and start preparing products.</h1>
        <p>
          This creates a local prototype seller profile. Later the PHP backend
          will review and approve seller accounts.
        </p>
      </section>

      <section className="auth-panel" aria-labelledby="seller-register-title">
        <h2 id="seller-register-title">Seller Register</h2>
        <form className="form-stack" onSubmit={handleSubmit}>
          <TextField label="Owner name" name="owner" placeholder="Your name" />
          <TextField label="Business name" name="businessName" placeholder="Gaborone basket shop" />
          <TextField label="Category" name="category" placeholder="Fresh produce, bakery, crafts, skincare" />
          <TextField label="Contact email" name="email" type="email" placeholder="orders@example.co.bw" />
          <TextField label="Phone" name="phone" placeholder="+267 72 555 148" />
          <TextField label="Business bio" name="bio" textarea placeholder="Tell Botswana customers what you make, grow, or sell" />
          <Button icon={<Store size={18} />} type="submit">
            Create seller profile
          </Button>
        </form>
        <p className="auth-panel__footer">
          Already selling? <Link to="/seller/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
