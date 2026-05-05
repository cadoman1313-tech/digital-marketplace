import { ArrowRight } from 'lucide-react';
import { DashboardShell } from '../../../components/layout/DashboardShell.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { MetricCard } from '../../../components/ui/MetricCard.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { businessOrders } from '../../../data/mockData.js';
import { formatCurrency } from '../../../utils/formatters.js';
import { StatusPill } from '../../../components/ui/StatusPill.jsx';

export function BusinessDashboardPage() {
  const openOrders = businessOrders.filter((order) => order.status !== 'completed');

  return (
    <DashboardShell>
      <div className="workspace-page">
        <SectionHeader
          eyebrow="Golden Hour Bakery"
          title="Today at a glance"
          description="A calm summary of orders, stock, and actions that need attention."
          action={
            <Button to="/business/orders" variant="secondary" icon={<ArrowRight size={18} />}>
              Manage orders
            </Button>
          }
        />

        <div className="metric-grid">
          <MetricCard label="Open orders" value={openOrders.length} detail="2 need action today" tone="blue" />
          <MetricCard label="Revenue today" value={formatCurrency(1460)} detail="Across 9 orders" tone="green" />
          <MetricCard label="Low stock" value="3" detail="Restock before Friday" tone="gold" />
          <MetricCard label="Store rating" value="4.8" detail="Based on 126 reviews" />
        </div>

        <section className="panel">
          <SectionHeader title="Priority orders" description="The next few orders your team can act on." />
          <div className="compact-list">
            {openOrders.map((order) => (
              <article key={order.id}>
                <div>
                  <strong>{order.id}</strong>
                  <span>{order.customer} - {order.fulfillment}</span>
                </div>
                <StatusPill status={order.status} />
                <Button variant="ghost">Open</Button>
              </article>
            ))}
          </div>
        </section>

        <EmptyState
          title="No unread customer notes"
          description="New messages or order notes will appear here when they need a response."
        />
      </div>
    </DashboardShell>
  );
}
