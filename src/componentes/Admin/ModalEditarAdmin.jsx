import ReactDOM from "react-dom";
import "../../Css/Modal.css"

export default function ModalEditarAdmin({abierto, cerrado, children}){
    if (!abierto) return null;
    return ReactDOM.createPortal(
        <div className="modal">
        <div className="modalContenidoEditarAdmin" onClick={(e) => e.stopPropagation()}>
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