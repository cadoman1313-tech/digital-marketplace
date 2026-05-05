import { DashboardShell } from '../../../components/layout/DashboardShell.jsx';
import { OrderRow } from '../../../components/marketplace/OrderRow.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { businessOrders } from '../../../data/mockData.js';

export function BusinessOrderManagementPage() {
  return (
    <DashboardShell>
      <div className="workspace-page">
        <SectionHeader
          eyebrow="Order management"
          title="Move orders through fulfillment with less friction."
          description="Compact filters and readable rows keep the order queue calm."
        />

        <div className="category-row category-row--compact">
          {['All orders', 'New', 'Processing', 'Ready', 'Completed'].map((filter, index) => (
            <button className={index === 0 ? 'is-active' : ''} key={filter} type="button">
              {filter}
            </button>
          ))}
        </div>

        <section className="table-panel">
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
              {businessOrders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </section>

        <EmptyState
          title="No delayed deliveries"
          description="Delivery issues will be highlighted here when an order needs extra attention."
        />
      </div>
    </DashboardShell>
  );
}
