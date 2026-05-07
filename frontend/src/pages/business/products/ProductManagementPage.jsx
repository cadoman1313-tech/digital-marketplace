import { Edit3, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DashboardShell } from '../../../components/layout/DashboardShell.jsx';
import { TextField } from '../../../components/forms/TextField.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
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
};

const categories = [
  'Fresh Produce',
  'Handmade Crafts',
  'Clothing',
  'Beauty & Skincare',
  'Food & Snacks',
  'Electronics Accessories',
  'Home Goods',
  'Art & Decor',
];

function getStockStatus(product) {
  if (product.availabilityStatus === 'Out of stock' || Number(product.stock) <= 0) return 'out';
  if (Number(product.stock) <= 5) return 'low';
  return 'active';
}

export function ProductManagementPage() {
  const { deleteSellerProduct, saveSellerProduct, sellerProducts } = useMarketplace();
  const [productDraft, setProductDraft] = useState(blankProduct);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductDraft((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const savedProduct = saveSellerProduct({
      ...productDraft,
      price: Number(productDraft.price),
      stock: Number(productDraft.stock),
      image: productDraft.image.trim(),
      description: productDraft.description.trim(),
    });

    setMessage(
      productDraft.id
        ? `${savedProduct.productName} updated and saved locally.`
        : `${savedProduct.productName} added to your LocalMart storefront.`,
    );
    setProductDraft(blankProduct);
  };

  const editProduct = (product) => {
    setProductDraft({
      id: product.id,
      name: product.productName || product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image || '',
      createdAt: product.createdAt,
    });
    setMessage(`Editing ${product.productName || product.name}.`);
  };

  const handleDelete = (product) => {
    deleteSellerProduct(product.id);
    if (productDraft.id === product.id) setProductDraft(blankProduct);
    setMessage(`${product.productName || product.name} deleted from your local stock.`);
  };

  return (
    <DashboardShell>
      <div className="workspace-page">
        <SectionHeader
          eyebrow="Product management"
          title="Keep listings fresh and easy to buy."
          description="A clean operational view for prices, stock, and product status."
        />

        <section className="seller-stock-grid">
          <form className="profile-form" onSubmit={handleSubmit}>
            <SectionHeader
              eyebrow="Stock"
              title={productDraft.id ? 'Edit product' : 'Add product'}
              description="Products saved here appear in your seller tools, storefront, and marketplace when in stock."
            />
            <TextField
              label="Product name"
              name="name"
              onChange={handleChange}
              placeholder="Phaphatha breakfast pack"
              required
              value={productDraft.name}
            />
            <div className="form-grid">
              <TextField
                label="Category"
                name="category"
                onChange={handleChange}
                options={categories}
                value={productDraft.category}
              />
              <TextField
                help="Calculated from stock: more than 0 is in stock, 0 is out of stock."
                label="Availability"
                name="availabilityPreview"
                readOnly
                value={Number(productDraft.stock || 0) > 0 ? 'In stock' : 'Out of stock'}
              />
            </div>
            <div className="form-grid">
              <TextField
                label="Price"
                min="0"
                name="price"
                onChange={handleChange}
                placeholder="120"
                required
                type="number"
                value={productDraft.price}
              />
              <TextField
                label="Quantity in stock"
                min="0"
                name="stock"
                onChange={handleChange}
                placeholder="16"
                required
                type="number"
                value={productDraft.stock}
              />
            </div>
            <TextField
              label="Description"
              name="description"
              onChange={handleChange}
              placeholder="Describe the product clearly for shoppers"
              textarea
              value={productDraft.description}
            />
            <TextField
              help="Paste an image URL or leave blank to show a placeholder in the market."
              label="Image URL"
              name="image"
              onChange={handleChange}
              value={productDraft.image}
            />
            <div className="button-row">
              <Button icon={<Plus size={18} />} type="submit">
                {productDraft.id ? 'Save product' : 'Add product'}
              </Button>
              {productDraft.id ? (
                <Button onClick={() => setProductDraft(blankProduct)} variant="ghost">
                  Cancel edit
                </Button>
              ) : null}
            </div>
            {message ? <p className="cart-feedback">{message}</p> : null}
          </form>
        </section>

        <section className="table-panel">
          <SectionHeader
            title="Product stock levels"
            description="Edit or delete products without leaving product management."
          />
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
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
                    <strong>{product.productName || product.name}</strong>
                    <span>{product.tags.join(', ')}</span>
                  </td>
                  <td>{product.category}</td>
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
                      <Button icon={<Trash2 size={15} />} onClick={() => handleDelete(product)} variant="ghost">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {sellerProducts.length === 0 ? (
          <EmptyState
            title="No products yet"
            description="Add your first product with the form above and it will be saved locally."
          />
        ) : (
          <EmptyState
            title="Products are synced locally"
            description="In-stock products appear in the public marketplace and seller storefront immediately."
          />
        )}
      </div>
    </DashboardShell>
  );
}
