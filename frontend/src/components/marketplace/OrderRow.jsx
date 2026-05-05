import { formatCurrency } from '../../utils/formatters.js';
import { Button } from '../ui/Button.jsx';
import { StatusPill } from '../ui/StatusPill.jsx';

export function OrderRow({ order, actionLabel = 'Open order' }) {
  return (
    <tr>
      <td>
        <strong>{order.id}</strong>
        <span>{order.placedAt}</span>
      </td>
      <td>{order.customer || order.fulfillment}</td>
      <td>{order.items}</td>
      <td>{formatCurrency(order.total)}</td>
      <td>
        <StatusPill status={order.status} />
      </td>
      <td>
        <Button variant="ghost">{actionLabel}</Button>
      </td>
    </tr>
  );
}
