import TablaDinamica from "../componentes/TablaDinamica"
import Buscador from "../componentes/Buscador";
import { useState } from "react";
export default function Pedidos(){
    const [busqueda, setBusqueda] = useState("")
    const columnas =[
        {key: "idSala", label: "Sala"},
        {key: "idMesa", label: "Mesa"},
        {key: "idFecha", label: "Fecha"},
        {key: "idTotal", label: "Total", className: "Total"},
        {key: "idEstado", label: "Estado", className: "EstadoPendiente"},
    ]
    const datos = [
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Pendiente" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Pendiente" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Pendiente" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Pendiente" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Pendiente" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Pendiente" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Pendiente" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Pendiente" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Pendiente" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Pendiente" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Pendiente" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Pendiente" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Pendiente" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Pendiente" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Pendiente" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Pendiente" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Pendiente" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Pendiente" },
    ]
    const normalizar = (texto) =>
        texto
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\$/g, "")
        .replace(/\./g, "");

    const datosFiltrados = datos.filter((d)=> {
        if(!busqueda) return true;
        const b = normalizar(busqueda)
        return (
            normalizar(d.idSala).includes(b) ||
            normalizar(d.idMesa).includes(b) ||
            normalizar(d.idTotal).includes(b)
        )
    })
    const acciones = [
        {
            icon: <span className="material-symbols-outlined text-gray-600">visibility</span>,
            handlerName: "AbrirModal", className: "botonVer"
        },
        {
            icon: <span className="material-symbols-outlined text-green-600">check_circle</span>,
            onClick: (r) => console.log("Finalizar", r), className: "botonFinalizar"
        },
    ]
    
    return(
        <section>
            <div className="encabezado">
                <h1>Pedidos</h1>
            <div className="contenedorInfo">
            <div className="contenedorOcupado">
                <div className="indicadorOcupado"></div>
                <div className="mesasOcupadas">
                <p className="textoOcupado">Pendientes: <strong>1</strong></p>
                </div>
            </div>
            </div>
        </div>
        <Buscador buscar={setBusqueda}></Buscador>
        <TablaDinamica columnas={columnas} datos={datosFiltrados} acciones={acciones}></TablaDinamica>
        </section>
    )
}