import { Plus } from 'lucide-react';
import { DashboardShell } from '../../../components/layout/DashboardShell.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { StatusPill } from '../../../components/ui/StatusPill.jsx';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';
import { formatCurrency } from '../../../utils/formatters.js';

export function ProductManagementPage() {
  const { deleteSellerProduct, sellerProducts } = useMarketplace();

  return (
    <DashboardShell>
      <div className="workspace-page">
        <SectionHeader
          eyebrow="Product management"
          title="Keep listings fresh and easy to buy."
          description="A clean operational view for prices, stock, and product status."
          action={
            <Button icon={<Plus size={18} />} to="/seller/dashboard">
              Add product
            </Button>
          }
        />

        <section className="table-panel">
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
                    <strong>{product.name}</strong>
                    <span>{product.tags.join(', ')}</span>
                  </td>
                  <td>{product.category}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <StatusPill status={product.stock <= 6 ? 'low' : 'active'} />
                  </td>
                  <td>
                    <div className="table-actions">
                      <Button to="/seller/dashboard" variant="ghost">
                        Edit
                      </Button>
                      <Button onClick={() => deleteSellerProduct(product.id)} variant="ghost">
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
            actionLabel="Add product"
            actionTo="/seller/dashboard"
            title="No products yet"
            description="Add your first product from the seller dashboard."
          />
        ) : (
          <EmptyState
            title="No draft products"
            description="Products saved as drafts will appear here before they are published to the marketplace."
          />
        )}
      </div>
    </DashboardShell>
  );
}
