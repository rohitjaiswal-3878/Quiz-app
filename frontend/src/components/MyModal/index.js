import { useEffect } from "react";
import "./index.css";

function MyModal({ children, onClose }) {
  // Hides the scroll bar when modal is open.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* Black space */}
      <div className="modal-wrapper" onClick={onClose}></div>

      {/* Modal container */}
      <div className="modal-container">{children}</div>
    </>
  );
}

export default MyModal;
