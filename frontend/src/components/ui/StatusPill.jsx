const statusLabels = {
  new: 'New',
  processing: 'Processing',
  ready: 'Ready',
  completed: 'Completed',
  cancelled: 'Cancelled',
  pending: 'Pending',
  reviewing: 'Reviewing',
  active: 'Active',
  draft: 'Draft',
  low: 'Low stock',
  out: 'Out of stock',
};

export function StatusPill({ status }) {
  return (
    <span className={`status status--${status}`}>
      {statusLabels[status] || status}
    </span>
  );
}
