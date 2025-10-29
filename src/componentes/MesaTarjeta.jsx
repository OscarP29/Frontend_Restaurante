import "../Css/MesaTarjeta.css";
import { useState } from "react";
import Modal from "./Modal";
import PlatosModal from "./PlatosModal";
import PedidoModal from "./PedidosModal";
export default function MesaTarjeta() {
    const [abrirModal, setModal] = useState(false)
    const [section, setSection] = useState("platosModal")
    const cambiarSection = (seccion) => {
        setSection(seccion)
        console.log(section)
    }
    const AbrirModal = () => {
      setModal(true);
    }
    const CerrarModal = () => {
      setModal(false);
    }


    return(
        <article className="mesaContenedor">
            <div className="contenedorEstado">
                <div className="estadoLibre">
                    <span className="material-symbols-outlined">check</span>
                </div>
                <div className="informacionMesa">
                    <h3 className="nombreMesa">Mesa 1</h3>
                    <span className="estadoMesa">Libre</span>
                </div>
            </div>
                <button className="botonLibre" onClick={AbrirModal}>Atender</button>
                <Modal abierto={abrirModal} cerrado={CerrarModal}>
                    <div className="encabezadoModal">
                        <div></div>
                        <h3>Mesa 1</h3>
                    </div>
                    <nav className="navegadorModal">
                        <ul>
                            <li className={`${section == "platosModal" ? "liSelecionado": ""}`} onClick={() => cambiarSection("platosModal")}>Platos</li>
                            <li className={`${section == "pedidoModal" ? "liSelecionado": ""}`} onClick={() => cambiarSection("pedidoModal")}>Pedido</li>
                        </ul>
                    </nav>
                    <div className="contendorModal" key={section}>
                        {section === "platosModal" && <PlatosModal />}
                        {section === "pedidoModal" && <PedidoModal />}
                    </div>
                    <div className="contenedorBotones">
                        <button className="botonListoModal">Listo</button>
                        <button className="botonCerrarModal" onClick={CerrarModal}>Cancelar</button>
                    </div>
                </Modal>
        </article>
        
    )
}