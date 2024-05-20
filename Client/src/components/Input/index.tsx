import "./style.css";
type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string;
};
export const Input: React.FC<InputProps> = ({ children, label, ...props }) => {
  return (
    <label>
      <p>{label}</p>
      <input {...props} />
    </label>
  );
};
