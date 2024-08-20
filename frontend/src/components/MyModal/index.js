import { useEffect } from "react";
import "./index.css";

function MyModal({ children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="modal-wrapper" onClick={onClose}></div>
      <div className="modal-container">{children}</div>
    </>
  );
}

export default MyModal;
