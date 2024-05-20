import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Post } from "../types";
import { Button } from "./Button";
import { Input } from "./Input";
import { TextArea } from "./Textarea";
type FormValues = Pick<Post, "content" | "title">;
type PostFormProps = {
  state: FormValues;
  setState: (value: Partial<FormValues>) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  labels?: {
    title?: string;
    submitButton?: string;
  };
};

export const PostForm: React.FC<PostFormProps> = ({ state, setState, onSubmit, labels }) => {
  const invalidFields = !state.content || !state.title;
  const username = useAppSelector((store) => store.username);

  if (username) {
    return (
      <form className="standard-form" onSubmit={onSubmit}>
        {labels && labels.title && <h1>{labels.title}</h1>}
        <Input
          label="Title"
          name="title"
          onChange={(e) => setState({ title: e.target.value })}
          value={state.title}
          placeholder="Hello world"
        />
        <TextArea
          label="Content"
          name="content"
          onChange={(e) => setState({ content: e.target.value })}
          value={state.content}
          placeholder="Content here"
        />
        <Button uppercase disabled={invalidFields}>
          {labels && labels.submitButton ? labels.submitButton : "Create"}
        </Button>
      </form>
    );
  }
  return (
    <Link to="/" style={{ fontSize: "1.4rem" }}>
      Login to create posts
    </Link>
  );
};
