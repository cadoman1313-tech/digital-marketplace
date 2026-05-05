export function TextField({
  help,
  label,
  name,
  options,
  type = 'text',
  textarea = false,
  ...props
}) {
  const inputId = props.id || name;

  return (
    <label className="field" htmlFor={inputId}>
      <span>{label}</span>
      {textarea ? (
        <textarea id={inputId} name={name} {...props} />
      ) : options ? (
        <select id={inputId} name={name} {...props}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input id={inputId} name={name} type={type} {...props} />
      )}
      {help ? <small>{help}</small> : null}
    </label>
  );
}
