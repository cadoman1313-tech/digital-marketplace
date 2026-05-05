import { formatCurrency } from '../../utils/formatters.js';
import { Button } from '../ui/Button.jsx';
import { StatusPill } from '../ui/StatusPill.jsx';

export function OrderRow({ order, actionLabel = 'Open order' }) {
  const itemSummary = Array.isArray(order.items)
    ? order.items.map((item) => `${item.quantity} x ${item.productName}`).join(', ')
    : order.items;

  return (
    <tr>
      <td>
        <strong>{order.id}</strong>
        <span>{order.orderDate || order.placedAt}</span>
      </td>
      <td>
        <strong>{order.buyerName || order.customer}</strong>
        <span>{order.fulfillment}</span>
      </td>
      <td>{itemSummary}</td>
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
