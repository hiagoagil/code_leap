import "./style.css";

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: "fill" | "outline";
  uppercase?: true;
};

export const Button: React.FC<ButtonProps> = ({ children, variant = "fill", uppercase, ...props }) => {
  return (
    <button className={`btn-${variant} ${uppercase ? "btn-upper" : ""}`} {...props}>
      {children}
    </button>
  );
};
