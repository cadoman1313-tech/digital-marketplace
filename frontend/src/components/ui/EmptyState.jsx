import { Button } from './Button.jsx';

export function EmptyState({ actionLabel, actionTo, description, title }) {
  return (
    <div className="empty-state">
      <div className="empty-state__mark" aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {actionLabel ? (
        <Button to={actionTo} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
