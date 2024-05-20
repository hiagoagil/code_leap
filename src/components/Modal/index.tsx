import { useEffect, useLayoutEffect, useRef } from "react";
import "./style.css";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
export type ModalProps = {
  alignWindow?: "flex-end" | "flex-start" | "center";
  open: boolean;
  title?: string;
  toggle: () => void;
};

function focusModal(event: FocusEvent, id: string) {
  event.preventDefault();
  const modal = document.getElementById(id);
  if (modal) {
    modal.focus();
  }
}
export const ModalContent: React.FC<ModalProps & { id: string }> = ({ children, open, title, toggle, id, alignWindow }) => {
  function closeOnEscPress(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      toggle();
    }
  }
  useLayoutEffect(() => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.focus();
    }
  }, [id]);
  return (
    <div className={`modal-wrapper ${open ? "visible" : ""}`} aria-hidden={!open}>
      <div className="overlay" onClick={toggle}></div>
      <section
        className="content"
        style={{ alignSelf: alignWindow }}
        onKeyDown={closeOnEscPress}
        tabIndex={0}
        id={id}
        aria-modal={true}
        role="dialog"
        aria-describedby={`${id}-title`}
        aria-label="Close the modal by presing Escape key"
      >
        {title ? (
          <header className="modal-header header" id={`${id}-title`}>
            <h2>{title}</h2>
          </header>
        ) : (
          <p className="aria-only" id={`${id}-title`}>
            Modal
          </p>
        )}
        {children}
      </section>
    </div>
  );
};

export const Modal: React.FC<ModalProps> = (props) => {
  const modalId = useRef(v4());
  useEffect(() => {
    const currentId = modalId.current;
    const appRoot = document.getElementById("root");
    appRoot.addEventListener("focusin", (e) => focusModal(e, currentId));
    return () => appRoot.removeEventListener("focusin", (e) => focusModal(e, currentId));
  }, []);

  useEffect(() => {
    const appRoot = document.getElementById("root");
    appRoot.setAttribute("aria-hidden", `${props.open}`);
    appRoot.setAttribute("tabindex", `${-1}`);
  }, [props.open]);

  if (props.open) {
    document.body.style.overflow = "hidden";
    return ReactDOM.createPortal(<ModalContent {...props} id={modalId.current} />, document.body);
  } else {
    document.body.style.overflow = "visible";
    return <></>;
  }
};
