import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button.jsx';
import { TextField } from '../../../components/forms/TextField.jsx';

export function LoginPage() {
  return (
    <main className="page-shell auth-page">
      <section className="auth-copy">
        <span className="eyebrow">Welcome back</span>
        <h1>Sign in to manage shopping, orders, or your storefront.</h1>
        <p>
          Customers can track purchases and business owners can keep orders moving
          from one calm workspace.
        </p>
      </section>

      <section className="auth-panel" aria-labelledby="login-title">
        <h2 id="login-title">Login</h2>
        <form className="form-stack">
          <TextField label="Email address" name="email" type="email" placeholder="you@example.com" />
          <TextField label="Password" name="password" type="password" placeholder="Enter password" />
          <div className="form-row form-row--between">
            <label className="check-row">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#reset">Forgot password?</a>
          </div>
          <Button type="submit">Sign in</Button>
        </form>
        <p className="auth-panel__footer">
          New to LocalMart? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
