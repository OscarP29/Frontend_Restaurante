import TablaDinamica from "../componentes/TablaDinamica"
import Buscador from "../componentes/Buscador";
import { useState } from "react";
export default function Ventas(){

    const [busqueda, setBusqueda] = useState("")
    const columnas =[
        {key: "idSala", label: "Sala"},
        {key: "idMesa", label: "Mesa"},
        {key: "idFecha", label: "Fecha"},
        {key: "idTotal", label: "Total", className: "Total"},
        {key: "idEstado", label: "Estado", className: "EstadoCompletado"},
    ]
    const datos = [
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Completado" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Completado" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Completado" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Completado" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Completado" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Completado" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Completado" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Completado" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Completado" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Completado" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Completado" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Completado" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Completado" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Completado" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Completado" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$82.000", idEstado: "Completado" },
    { idSala: "A", idMesa: "5", idFecha: "2025-10-27", idTotal: "$45.000", idEstado: "Completado" },
    { idSala: "B", idMesa: "3", idFecha: "2025-10-27", idTotal: "$3.000", idEstado: "Completado" },
    ];
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
            icon: <span className="material-symbols-outlined text-gray-600">print</span>,
            handlerName: "  ", className: "botonImprimir"
        }
    ]
    return(
        <section>
            <div className="encabezado">
                <h1>Ventas</h1>
            <div className="contenedorInfo">
            <div className="contenedorLibre">
                <div className="indicadorLibre"></div>
                <div className="mesasLibres">
                <p className="textoLibre">Ventas Hoy: <strong>7</strong></p>
                </div>
            </div>
            </div>
        </div>
        <Buscador buscar={setBusqueda}></Buscador>
        <TablaDinamica columnas={columnas} datos={datosFiltrados} acciones={acciones}></TablaDinamica>
        </section>
    )
}