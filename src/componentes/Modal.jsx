import "../Css/Modal.css"
import ReactDOM from "react-dom";

export default function Modal({abierto, cerrado, children}){
    if (!abierto) return null;
    return ReactDOM.createPortal(
        <div className="modal">
        <div className="modalContenido" onClick={(e) => e.stopPropagation()}>
        {/* Prevent clicks inside the modal from closing it */}
        <button className="modalBotonCerrar" onClick={cerrado}>
          <span className="material-symbols-outlined">close</span>
        </button>
        {children}
      </div>
        </div>,
      document.body
    )
}