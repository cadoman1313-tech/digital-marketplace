import { Edit3, ImagePlus, PackagePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DashboardShell } from '../../../components/layout/DashboardShell.jsx';
import { OrderRow } from '../../../components/marketplace/OrderRow.jsx';
import { TextField } from '../../../components/forms/TextField.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { MetricCard } from '../../../components/ui/MetricCard.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { StatusPill } from '../../../components/ui/StatusPill.jsx';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';
import { formatCurrency } from '../../../utils/formatters.js';

const blankProduct = {
  id: '',
  name: '',
  category: 'Food & Snacks',
  price: '',
  stock: '',
  description: '',
  image: '',
  availability: 'Available',
};

function getStockStatus(product) {
  if (product.availability === 'Paused') return 'draft';
  if (product.availability === 'Out of stock' || Number(product.stock) <= 0) return 'out';
  if (Number(product.stock) <= 5) return 'low';
  return 'active';
}

export function SellerDashboardPage() {
  const {
    deleteSellerProduct,
    orders,
    saveSellerProduct,
    sellerProducts,
    sellerProfile,
    updateSellerProfile,
  } = useMarketplace();
  const [profileDraft, setProfileDraft] = useState(sellerProfile);
  const [productDraft, setProductDraft] = useState(blankProduct);
  const [profileSaved, setProfileSaved] = useState(false);

  const lowStockCount = sellerProducts.filter((product) => Number(product.stock) <= 5).length;
  const activeProducts = sellerProducts.filter((product) => product.availability === 'Available').length;
  const totalStock = sellerProducts.reduce((sum, product) => sum + Number(product.stock || 0), 0);
  const sellerOrders = orders.filter(
    (order) =>
      order.sellerId === 'golden-hour-bakery' ||
      order.sellerGroups?.some((group) => group.sellerId === 'golden-hour-bakery'),
  );

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileDraft((current) => ({ ...current, [name]: value }));
  };

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setProductDraft((current) => ({ ...current, [name]: value }));
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    updateSellerProfile(profileDraft);
    setProfileSaved(true);
  };

  const handleProductSubmit = (event) => {
    event.preventDefault();
    saveSellerProduct({
      ...productDraft,
      price: Number(productDraft.price),
      stock: Number(productDraft.stock),
      image: productDraft.image.trim(),
      description: productDraft.description.trim(),
    });
    setProductDraft(blankProduct);
  };

  const editProduct = (product) => {
    setProductDraft({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image || '',
      availability: product.availability || 'Available',
    });
  };

  return (
    <DashboardShell>
      <div className="workspace-page seller-dashboard">
        <SectionHeader
          eyebrow="Seller dashboard"
          title={`${sellerProfile.businessName} workspace`}
          description="Manage the storefront profile, product stock, and customer orders from one uncluttered seller view."
        />

        <div className="metric-grid">
          <MetricCard label="Active products" value={activeProducts} detail="Available to customers" tone="green" />
          <MetricCard label="Low stock" value={lowStockCount} detail="Needs attention soon" tone="gold" />
          <MetricCard label="Total units" value={totalStock} detail="Across all products" tone="blue" />
          <MetricCard label="Open orders" value={sellerOrders.length} detail="Ready for seller action" />
        </div>

        <section className="seller-profile-grid">
          <form className="profile-form" onSubmit={handleProfileSubmit}>
            <SectionHeader
              eyebrow="Storefront"
              title="Seller profile"
              description="Customers see this information when they browse your products."
            />
            <TextField
              label="Business name"
              name="businessName"
              onChange={handleProfileChange}
              value={profileDraft.businessName}
            />
            <TextField
              label="Business category"
              name="category"
              onChange={handleProfileChange}
              value={profileDraft.category}
            />
            <TextField
              label="Business bio"
              name="bio"
              onChange={handleProfileChange}
              textarea
              value={profileDraft.bio}
            />
            <TextField
              help="Paste an image URL or leave blank to keep the placeholder."
              label="Profile image URL"
              name="image"
              onChange={handleProfileChange}
              value={profileDraft.image}
            />
            <div className="form-grid">
              <TextField
                label="Contact email"
                name="email"
                onChange={handleProfileChange}
                type="email"
                value={profileDraft.email}
              />
              <TextField
                label="Phone"
                name="phone"
                onChange={handleProfileChange}
                value={profileDraft.phone}
              />
            </div>
            <TextField
              label="Address"
              name="address"
              onChange={handleProfileChange}
              value={profileDraft.address}
            />
            <Button type="submit">Save seller profile</Button>
            {profileSaved ? <p className="cart-feedback">Seller profile saved locally.</p> : null}
          </form>

          <aside className="seller-preview">
            {profileDraft.image ? (
              <img src={profileDraft.image} alt={profileDraft.businessName} />
            ) : (
              <div className="image-placeholder">
                <ImagePlus size={28} />
                <span>Business image placeholder</span>
              </div>
            )}
            <div>
              <span className="eyebrow">Preview</span>
              <h2>{profileDraft.businessName || 'Your storefront'}</h2>
              <p>{profileDraft.bio || 'Add a business bio so customers know what makes your shop special.'}</p>
              <strong>{profileDraft.email}</strong>
            </div>
          </aside>
        </section>

        <section className="seller-stock-grid">
          <form className="profile-form" onSubmit={handleProductSubmit}>
            <SectionHeader
              eyebrow="Stock"
              title={productDraft.id ? 'Edit product' : 'Add product'}
              description="Keep this compact form focused on the details customers and sellers need."
            />
            <TextField
              label="Product name"
              name="name"
              onChange={handleProductChange}
              placeholder="Phaphatha breakfast pack"
              required
              value={productDraft.name}
            />
            <div className="form-grid">
              <TextField
                label="Category"
                name="category"
                onChange={handleProductChange}
                options={[
                  'Fresh Produce',
                  'Handmade Crafts',
                  'Clothing',
                  'Beauty & Skincare',
                  'Food & Snacks',
                  'Electronics Accessories',
                  'Home Goods',
                  'Art & Decor',
                ]}
                value={productDraft.category}
              />
              <TextField
                label="Availability status"
                name="availability"
                onChange={handleProductChange}
                options={['Available', 'Paused', 'Out of stock']}
                value={productDraft.availability}
              />
            </div>
            <div className="form-grid">
              <TextField
                label="Price"
                min="0"
                name="price"
                onChange={handleProductChange}
                placeholder="120"
                required
                type="number"
                value={productDraft.price}
              />
              <TextField
                label="Quantity in stock"
                min="0"
                name="stock"
                onChange={handleProductChange}
                placeholder="16"
                required
                type="number"
                value={productDraft.stock}
              />
            </div>
            <TextField
              label="Description"
              name="description"
              onChange={handleProductChange}
              placeholder="Describe the product clearly for shoppers"
              textarea
              value={productDraft.description}
            />
            <TextField
              help="Paste an image URL or leave blank to show a placeholder in seller tools."
              label="Image URL"
              name="image"
              onChange={handleProductChange}
              value={productDraft.image}
            />
            <div className="button-row">
              <Button icon={<PackagePlus size={18} />} type="submit">
                {productDraft.id ? 'Save product' : 'Add product'}
              </Button>
              {productDraft.id ? (
                <Button onClick={() => setProductDraft(blankProduct)} variant="ghost">
                  Cancel edit
                </Button>
              ) : null}
            </div>
          </form>

          <section className="table-panel">
            <SectionHeader
              eyebrow="Inventory"
              title="Product stock levels"
              description="Edit or delete products without leaving the seller dashboard."
            />
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {sellerProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <strong>{product.name}</strong>
                      <span>{product.category}</span>
                    </td>
                    <td>{formatCurrency(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <StatusPill status={getStockStatus(product)} />
                    </td>
                    <td>
                      <div className="table-actions">
                        <Button icon={<Edit3 size={15} />} onClick={() => editProduct(product)} variant="ghost">
                          Edit
                        </Button>
                        <Button
                          icon={<Trash2 size={15} />}
                          onClick={() => deleteSellerProduct(product.id)}
                          variant="ghost"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {sellerProducts.length === 0 ? (
              <EmptyState
                title="No products yet"
                description="Add your first product with the stock form and it will appear in this table."
              />
            ) : null}
          </section>
        </section>

        <section className="table-panel">
          <SectionHeader
            eyebrow="Orders"
            title="Orders related to your products"
            description="Seller orders stay in a practical table with status and next action visible."
          />
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {sellerOrders.map((order) => (
                <OrderRow key={order.id} actionLabel="Update" order={order} />
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </DashboardShell>
  );
}
