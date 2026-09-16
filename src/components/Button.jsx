import { Spinner } from "./Spinner";

export function Button({
  as: Component = "button",
  variant = "primary",
  className = "",
  loading = false,
  disabled,
  children,
  ...props
}) {
  const classes = ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");
  return (
    <Component className={classes} disabled={disabled || loading} {...props}>
      {loading && <Spinner tamanho={14} />}
      {children}
    </Component>
  );
}
