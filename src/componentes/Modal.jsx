import "../Css/Modal.css"

export default function Modal({abierto, cerrado, children}){
    if (!abierto) return null;
    return(
        <div className="modal">
        <div className="modalContenido" onClick={(e) => e.stopPropagation()}>
        {/* Prevent clicks inside the modal from closing it */}
        <button className="modalBotonCerrar" onClick={cerrado}>xd
        </button>
        {children}
      </div>
        </div>
    )
}