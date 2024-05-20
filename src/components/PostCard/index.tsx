import { formatDistance } from "date-fns";
import { Post } from "../../types";
import { DeleteIcon, EditIcon } from "../icons";
import "./style.css";
type PostCardProps = { post: Post; allowEdit: boolean; onDelete: (p: Post) => void; onEdit: (p: Post) => void };
export const PostCard: React.FC<PostCardProps> = ({ post, onDelete, onEdit, allowEdit }) => {
  const { author, content, createdAt, title, id, updatedAt } = post;

  const ariaRootId = `post-${id}-description`;

  return (
    <article className="postCard" tabIndex={0} aria-describedby={ariaRootId}>
      <p id={ariaRootId} className="aria-only">
        {title} published by {author} on {new Date(createdAt).toLocaleDateString()}. Post content: {content}.
      </p>
      <header className="header">
        <h2 aria-hidden={true}>{title}</h2>
        {allowEdit && (
          <>
            <DeleteIcon className="icon" tabIndex={0} onClick={() => onDelete(post)} aria-label={`Delete your post ${title}`} />
            <EditIcon className="icon" tabIndex={0} onClick={() => onEdit(post)} aria-label={`Edit your post ${title}`} />
          </>
        )}
      </header>
      <section>
        <span>
          <h3>@{author}</h3>
          <p>{formatDistance(Date.now(), updatedAt || createdAt)} ago</p>
        </span>

        <p aria-hidden={true}>{content}</p>
      </section>
    </article>
  );
};
