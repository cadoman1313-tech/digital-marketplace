import { Button } from '../../../components/ui/Button.jsx';
import { DashboardShell } from '../../../components/layout/DashboardShell.jsx';
import { TextField } from '../../../components/forms/TextField.jsx';
import { businesses } from '../../../data/mockData.js';

export function BusinessProfilePage() {
  const business = businesses[1];

  return (
    <DashboardShell>
      <div className="workspace-page">
        <section className="profile-layout">
          <div>
            <span className="eyebrow">Business profile</span>
            <h1>{business.name}</h1>
            <p>{business.description}</p>
            <div className="profile-preview">
              <img src={business.image} alt={business.name} />
              <div>
                <strong>{business.name}</strong>
                <span>{business.category} in {business.city}</span>
              </div>
            </div>
          </div>

          <form className="profile-form">
            <TextField label="Business name" name="businessName" defaultValue={business.name} />
            <TextField label="Category" name="category" defaultValue={business.category} />
            <TextField label="Public email" name="email" type="email" defaultValue={business.email} />
            <TextField label="Phone" name="phone" defaultValue={business.phone} />
            <TextField label="Address" name="address" defaultValue={business.address} />
            <TextField
              label="Store description"
              name="description"
              textarea
              defaultValue={business.description}
            />
            <div className="button-row">
              <Button type="submit">Save profile</Button>
              <Button variant="secondary">Preview storefront</Button>
            </div>
          </form>
        </section>
      </div>
    </DashboardShell>
  );
}
