import { DashboardShell } from '../../../components/layout/DashboardShell.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { MetricCard } from '../../../components/ui/MetricCard.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { StatusPill } from '../../../components/ui/StatusPill.jsx';
import { adminApprovals } from '../../../data/mockData.js';

export function AdminDashboardPage() {
  return (
    <DashboardShell mode="admin">
      <div className="workspace-page">
        <SectionHeader
          eyebrow="Admin dashboard"
          title="Platform health without the clutter."
          description="A restrained view for approvals, seller quality, and marketplace operations."
        />

        <div className="metric-grid metric-grid--admin">
          <MetricCard label="Active businesses" value="38" detail="4 joined this week" tone="green" />
          <MetricCard label="Pending approvals" value="3" detail="Oldest is 2 days" tone="gold" />
          <MetricCard label="Open orders" value="126" detail="Across all sellers" tone="blue" />
          <MetricCard label="Support queue" value="5" detail="No urgent incidents" />
        </div>

        <section className="table-panel">
          <SectionHeader title="Business approvals" description="Review new storefronts before they appear in the marketplace." />
          <table className="data-table">
            <thead>
              <tr>
                <th>Business</th>
                <th>Owner</th>
                <th>Category</th>
                <th>Submitted</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {adminApprovals.map((approval) => (
                <tr key={approval.id}>
                  <td>
                    <strong>{approval.business}</strong>
                    <span>{approval.id}</span>
                  </td>
                  <td>{approval.owner}</td>
                  <td>{approval.category}</td>
                  <td>{approval.submitted}</td>
                  <td>
                    <StatusPill status={approval.status} />
                  </td>
                  <td>
                    <Button variant="secondary">Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <EmptyState
          title="No critical incidents"
          description="Platform incidents and urgent moderation issues will appear here when they need admin action."
        />
      </div>
    </DashboardShell>
  );
}
