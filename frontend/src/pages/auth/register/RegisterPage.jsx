import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button.jsx';
import { TextField } from '../../../components/forms/TextField.jsx';

export function RegisterPage() {
  return (
    <main className="page-shell auth-page">
      <section className="auth-copy">
        <span className="eyebrow">Join the market</span>
        <h1>Create an account for local shopping or business selling.</h1>
        <p>
          The prototype keeps registration simple now, with room for customer and
          business onboarding when the backend is connected.
        </p>
      </section>

      <section className="auth-panel" aria-labelledby="register-title">
        <h2 id="register-title">Register</h2>
        <form className="form-stack">
          <TextField label="Full name" name="name" placeholder="Your name" />
          <TextField label="Email address" name="email" type="email" placeholder="you@example.com" />
          <TextField
            label="Account type"
            name="accountType"
            options={['Customer', 'Business owner']}
          />
          <TextField label="Password" name="password" type="password" placeholder="Create password" />
          <Button type="submit">Create account</Button>
        </form>
        <p className="auth-panel__footer">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
