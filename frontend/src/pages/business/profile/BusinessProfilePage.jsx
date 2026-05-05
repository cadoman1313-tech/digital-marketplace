import { useState } from 'react';
import { Button } from '../../../components/ui/Button.jsx';
import { DashboardShell } from '../../../components/layout/DashboardShell.jsx';
import { TextField } from '../../../components/forms/TextField.jsx';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';

export function BusinessProfilePage() {
  const { sellerProfile, updateSellerProfile } = useMarketplace();
  const [draft, setDraft] = useState(sellerProfile);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSellerProfile(draft);
  };

  return (
    <DashboardShell>
      <div className="workspace-page">
        <section className="profile-layout">
          <div>
            <span className="eyebrow">Business profile</span>
            <h1>{sellerProfile.businessName}</h1>
            <p>{sellerProfile.bio}</p>
            <div className="profile-preview">
              {sellerProfile.image ? (
                <img src={sellerProfile.image} alt={sellerProfile.businessName} />
              ) : (
                <div className="image-placeholder">Business profile image</div>
              )}
              <div>
                <strong>{sellerProfile.businessName}</strong>
                <span>{sellerProfile.category}</span>
              </div>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <TextField label="Business name" name="businessName" onChange={handleChange} value={draft.businessName} />
            <TextField label="Category" name="category" onChange={handleChange} value={draft.category} />
            <TextField label="Public email" name="email" onChange={handleChange} type="email" value={draft.email} />
            <TextField label="Phone" name="phone" onChange={handleChange} value={draft.phone} />
            <TextField label="Address" name="address" onChange={handleChange} value={draft.address} />
            <TextField label="Profile image URL" name="image" onChange={handleChange} value={draft.image} />
            <TextField
              label="Store description"
              name="bio"
              onChange={handleChange}
              textarea
              value={draft.bio}
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
