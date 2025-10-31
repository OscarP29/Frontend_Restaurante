import "../Css/MesaTarjeta.css";
import { useState } from "react";
import Modal from "./Modal";
import PlatosModal from "./PlatosModal";
import PedidoModal from "./PedidosModal";
import TablaDinamica from "./TablaDinamica"

export default function MesaTarjeta({numero,estado}) {
    const [abrirModal, setModal] = useState(false)
    const [section, setSection] = useState("platosModal")

    const columnas =[
        {key: "idNombre", label: "Nombre"},
        {key: "idCantidad", label: "Cantidad"},
        {key: "idPrecio", label: "Precio"},
        {key: "idTotal", label: "Total", className: "Total"},
    ]
    const datos = [
        { idNombre: "Sopa", idCantidad: "2", idPrecio: "28.000", idTotal: "$45.000"},
        { idNombre: "Sopa", idCantidad: "2", idPrecio: "28.000", idTotal: "$45.000"},
        { idNombre: "Sopa", idCantidad: "2", idPrecio: "28.000", idTotal: "$45.000"},
        { idNombre: "Sopa", idCantidad: "2", idPrecio: "28.000", idTotal: "$45.000"},
        { idNombre: "Sopa", idCantidad: "2", idPrecio: "28.000", idTotal: "$45.000"},
        { idNombre: "Sopa", idCantidad: "2", idPrecio: "28.000", idTotal: "$45.000"},
        { idNombre: "Sopa", idCantidad: "2", idPrecio: "28.000", idTotal: "$45.000"},
    ];
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
                <div className={estado ? "estadoOcupado" :"estadoLibre"}>
                    <span className="material-symbols-outlined">{estado ? "close":"check"}</span>
                </div>
                <div className="informacionMesa">
                    <h3 className="nombreMesa">Mesa {numero}</h3>
                    <span className="estadoMesa">{estado ? "Ocupado":"Libre"}</span>
                </div>
            </div>
                <button className={estado ? "botonOcupado":"botonLibre"} onClick={ AbrirModal}>{estado ? "Finalizar":"Atender"}</button>
                <Modal abierto={abrirModal} cerrado={CerrarModal}>
                    {estado ? (
                        
                        <>
                        <div className="encabezadoModal">
                        <div>
                            <div className="divDecoracion"></div>
                            <h3>Mesa 1</h3>
                        </div>
                        <p>Fecha : 2025-20-25 9:48</p>
                        </div>
                        <div className="contendorModal">
                            <TablaDinamica columnas={columnas} datos={datos}></TablaDinamica>
                        </div>
                        <p>Total a Pagar: <strong>$ 180.000 COP</strong></p>
                        <div className="contenedorBotones">
                            <button className="botonListoModal">Finalizar</button>
                            <button className="botonCerrarModal" onClick={CerrarModal}>Cancelar</button>
                        </div>
                        </>
                    ): (
                        <>
                        <div className="encabezadoModalUno">
                        <div className="divDecoracion"></div>
                            <h3>Mesa 1</h3>
                        </div>
                        <nav className="navegadorModal">
                            <ul>
                                <li className={`${section === "platosModal" ? "liSelecionado": "liNoSelecionado"}`} onClick={() => cambiarSection("platosModal")}>Platos</li>
                                <li className={`${section === "pedidoModal" ? "liSelecionado": "liNoSelecionado"}`} onClick={() => cambiarSection("pedidoModal")}>Pedido</li>
                            </ul>
                        </nav>
                        <div className="contendorModal" key={section}>
                            {section === "platosModal" && <PlatosModal/>}
                            {section === "pedidoModal" && <PedidoModal/>}
                        </div>
                        <div className="contenedorBotones">
                            <button className="botonListoModal">Listo</button>
                            <button className="botonCerrarModal" onClick={CerrarModal}>Cancelar</button>
                        </div>
                    </>
                    )}
                </Modal>
        </article>
    )
}