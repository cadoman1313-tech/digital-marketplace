import { Link } from 'react-router-dom';

export function Button({
  children,
  className = '',
  icon,
  to,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const classes = `button button--${variant} ${className}`.trim();
  const content = (
    <>
      {icon ? <span className="button__icon">{icon}</span> : null}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {content}
    </button>
  );
}
