export function Chip({ icon, variant = "solid", children }) {
  return (
    <span className={`chip chip-${variant}`}>
      {icon}
      {children}
    </span>
  );
}
