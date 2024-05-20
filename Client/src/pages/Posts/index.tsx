import { useMemo } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost, deletePost, updatePost } from "../../actions/posts";
import { Modal, ModalProps } from "../../components/Modal";
import { PostCard } from "../../components/PostCard";
import { PostForm } from "../../components/PostForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Post } from "../../types";
import "./style.css";
export const PostsPage: React.FC = () => {
  const username = useAppSelector((store) => store.username);
  const [postFormValues, setPostFormValues] = useState({
    title: "",
    content: "",
  });

  const dispatch = useAppDispatch();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addPost({
      ...postFormValues,
      username: username,
    })
      .then(dispatch)
      .catch(() => {});
  }

  return (
    <>
      <main className="posts-container">
        <header className="header">
          <h1>CodeLeap Network</h1>
        </header>
        <section>
          <PostForm
            state={postFormValues}
            setState={(to) => setPostFormValues({ ...postFormValues, ...to })}
            onSubmit={handleSubmit}
            labels={{ title: "What's on your mind?" }}
          />

          <Feed currentUser={username} />
        </section>
      </main>
    </>
  );
};

type ModalState = Omit<ModalProps, "toggle"> & {
  selectedPost: Post | null;
};
const initialModalState: ModalState = {
  open: false,
  title: "",
  selectedPost: null,
};
export const Feed: React.FC<{ currentUser: string }> = ({ currentUser }) => {
  const { posts } = useAppSelector((store) => store);
  const orderedPosts = useMemo(
    () => posts.sort((a, b) => new Date(b.created_datetime).getTime() - new Date(a.created_datetime).getTime()),
    [posts]
  );
  const [modalState, setModalState] = useState<ModalState>(initialModalState);
  const partialSetModal = (newState: Partial<ModalState>) => setModalState({ ...modalState, ...newState });
  const toggleModal = () => partialSetModal({ open: !modalState.open });

  function handleEdit(p: Post) {
    setModalState({
      open: true,

      selectedPost: p,
      alignWindow: "center",
      title: "Edit Item",
    });
  }

  const dispatch = useDispatch();
  return (
    <>
      <Modal {...modalState} toggle={toggleModal}>
        {modalState.selectedPost && (
          <PostForm
            state={modalState.selectedPost}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              updatePost({ ...modalState.selectedPost })
                .then(dispatch)
                .catch(() => {});
              setModalState(initialModalState);
            }}
            setState={(to) => partialSetModal({ selectedPost: { ...modalState.selectedPost, ...to } })}
            labels={{
              submitButton: "Save",
            }}
          />
        )}
      </Modal>
      {orderedPosts.map((post) => (
        <PostCard
          key={post.id}
          allowEdit={post.username === currentUser}
          onDelete={(p) => {
            const res = window.confirm("Are you sure you want to delete this item?");

            if (res) {
              deletePost(p)
                .then(dispatch)
                .catch(() => {});
            }
          }}
          onEdit={handleEdit}
          post={post}
        />
      ))}
    </>
  );
};
