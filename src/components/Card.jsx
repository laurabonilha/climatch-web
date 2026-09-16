export function Card({ icon, className = "", children }) {
  const classes = ["card", icon ? "card-with-icon" : "", className].filter(Boolean).join(" ");

  return (
    <li className={classes}>
      {icon && <div className="icon-badge">{icon}</div>}
      <div className="card-body">{children}</div>
    </li>
  );
}
