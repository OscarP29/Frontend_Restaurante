import "../Css/MesaTarjeta.css";
import { useState } from "react";
import Modal from "./Modal";
import PlatosModal from "./PlatosModal";
import PedidoModal from "./PedidosModal";
import TablaDinamica from "./TablaDinamica"

export default function MesaTarjeta({numero,estado, idsala, recargar}) {
    const [abrirModal, setModal] = useState(false)
    const [section, setSection] = useState("platosModal")
    const [platosMesa, setPlatosMesa] = useState([])
    const [pedidoMesa, setPedidoMesa] = useState([])

    const columnas =[
        {key: "nombre_plato", label: "Nombre"},
        {key: "cant_plato", label: "Cantidad"},
        {key: "precio", label: "Precio"},
        {key: "total_plato", label: "Total", className: "Total"},
    ]
    const cambiarSection = (seccion) => {
        setSection(seccion)
    }
    const AbrirModal = () => {
        setModal(true);
        if (estado) {
            fetch(`http://localhost:8080/PlatosPedidoPendiente?id_pedido=${numero}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
                return res.json();
            })
            .then((data) => setPlatosMesa(data))
            .catch((err) => console.error("Error al cargar datos:", err));

            fetch(`http://localhost:8080/PedidosMesa?id_pedido=${estado}&estado=${estado}`)
            .then((res) => {
            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }
            return res.json();
            })
            .then((data) => {
            setPedidoMesa(data);
            })
            .catch((err) => {
            console.error("Error al cargar datos:", err);
            });
        }
    }
    const CerrarModal = () => {
        sessionStorage.removeItem("platosSeleccionados");
        setModal(false);
    }
    const enviarPedido = async () => {
    const platosSeleccionados = JSON.parse(sessionStorage.getItem("platosSeleccionados")) || [];

    if (platosSeleccionados.length === 0) {
        alert("No hay platos seleccionados para enviar.");
        return;
    }

    // Construir objeto pedido
    const pedidoData = {
        pedido: {
        estado: true,
        fecha: "", // formato YYYY-MM-DD
        id_mesa: numero,
        id_sala: idsala // puedes reemplazarlo por la sala real
        },
        listaPlatos: platosSeleccionados.map((plato) => ({
        id_detalle: 0,
        id_pedido: 0,
        id_plato: plato.id_plato,
        cant_plato: plato.cantidad
        }))
    };

    try {
        const res = await fetch("http://localhost:8080/PedidoInsertar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoData)
        });

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json();
        console.log("Pedido guardado:", data);

        alert("Pedido enviado correctamente ✅");
        sessionStorage.removeItem("platosSeleccionados");
        recargar()
        setModal(false);
    } catch (err) {
        console.error("Error al enviar pedido:", err);
        alert("Error al enviar el pedido ❌");
    }
};


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
                            <h3>Mesa {numero}</h3>
                        </div>
                        <p>Fecha : <strong>{pedidoMesa.fecha}</strong></p>
                        </div>
                        <div className="contendorModal">
                            <TablaDinamica columnas={columnas} datos={platosMesa}></TablaDinamica>
                        </div>
                        <p>Total a Pagar: <strong>$ {pedidoMesa.total} COP</strong></p>
                        <div className="contenedorBotones">
                            <button className="botonListoModal">Finalizar</button>
                            <button className="botonCerrarModal" onClick={CerrarModal}>Cancelar</button>
                        </div>
                        </>
                    ): (
                        <>
                        <div className="encabezadoModalUno">
                        <div className="divDecoracion"></div>
                            <h3>Mesa {numero}</h3>
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
                            <button className="botonListoModal" onClick={enviarPedido}>Listo</button>
                            <button className="botonCerrarModal" onClick={CerrarModal}>Cancelar</button>
                        </div>
                    </>
                    )}
                </Modal>
        </article>
    )
}