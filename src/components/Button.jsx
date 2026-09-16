export function Button({ as: Component = "button", variant = "primary", className = "", ...props }) {
  const classes = ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");
  return <Component className={classes} {...props} />;
}
