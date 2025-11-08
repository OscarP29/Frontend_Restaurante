import TablaDinamica from "../TablaDinamica"
import { useState,useEffect } from "react";
export default function MesasTabla(){
    const [salas, setSalas] = useState([]);
    const [mesas, setMesas] = useState([]);
      const obtenerMesas = () => {
        Promise.all([
            fetch("http://localhost:8080/Salas").then((res) => res.json()),
            fetch("http://localhost:8080/Mesas").then((res) => res.json()),
        ])
        .then(([salasData, mesasData]) => {
            setSalas(salasData);
            // Aquí transformamos los datos antes de guardarlos
            const mesasTransformadas = mesasData.map(mesa => ({
                ...mesa,
                estado_mesa: mesa.estado_mesa ? "Ocupado" : "Libre"
            }));
            setMesas(mesasTransformadas);
        })
        .catch((err) => console.error("Error al cargar datos:", err));
    }
    useEffect(() => {
        obtenerMesas()
    }, []);
    const columnasMesa =[
        {key: "id_mesa", label: "id"},
        {key: "numero_mesa", label: "Numero"},
        {key: "estado_mesa", label: "Estado"},
        {key: "id_sala", label: "Sala"},
    ]
    const columnasSala =[
        {key: "id_sala", label: "id"},
        {key: "nombre_sala", label: "Nombre"},
    ]
    const acciones = [
        {
            icon: <span className="material-symbols-outlined text-gray-600">edit</span>,
            handlerName: "EditarMesa", className: "botonVer"
        },
        {
            icon: <span className="material-symbols-outlined text-gray-600">delete</span>,
            handlerName: "eliminarMesa", className: "botonFinalizar"
        }
    ]
    return(
        <section className="contenedorTablasAdmin contenedorFormulario ">
            <div className="encabezadoMesas">
                <div></div>
                <h3>Tabla Mesas</h3>
            </div>
            <TablaDinamica columnas={columnasMesa} acciones={acciones} datos={mesas}></TablaDinamica>
            <div className="encabezadoMesas">
                <div></div>
                <h3>Tabla Salas</h3>
            </div>
            <TablaDinamica columnas={columnasSala} acciones={acciones} datos={salas}></TablaDinamica>
        </section>
    )
}