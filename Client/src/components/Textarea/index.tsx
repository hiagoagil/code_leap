import { useRef } from "react";
import "./style.css";
type TextAreaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  label: string;
};

export const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "1px";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };

  return (
    <label>
      <p>{label}</p>
      <textarea {...props} ref={textAreaRef} onInput={handleResize} />
    </label>
  );
};
