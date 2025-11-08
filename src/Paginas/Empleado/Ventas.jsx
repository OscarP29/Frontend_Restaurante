import TablaDinamica from "../../componentes/TablaDinamica"
import Buscador from "../../componentes/Buscador";
import { useState, useEffect} from "react";
export default function Ventas(){

    const [busqueda, setBusqueda] = useState("")
    const [pedidos, setPedidos] = useState([])
    const [completado, setCompletados] = useState([])
    
    const obtenerPedidos = () =>{
        fetch("http://localhost:8080/PedidosCompletado")
            .then((res) => {
            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }
            return res.json();
            })
            .then((data) => {
            setPedidos(data);
            setCompletados(data.length);
            })
            .catch((err) => {
            console.error("Error al cargar datos:", err);
            });
    }
    useEffect(() => {
        obtenerPedidos();
    }, []);
    const pedidosFormateados = pedidos.map(p => ({
    ...p,
    estado_pedido: p.estado_pedido ? "Pendiente" : "Completado"
    }));
    const columnas =[
        {key: "sala", label: "Sala"},
        {key: "mesa", label: "Mesa"},
        {key: "fecha", label: "Fecha"},
        {key: "total", label: "Total"},
        {key: "estado_pedido", label: "Estado", className: "EstadoCompletado"},
    ]
    const normalizar = (texto) =>
        texto
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\$/g, "")
        .replace(/\./g, "");

    const datosFiltrados = pedidosFormateados.filter((d)=> {
        if(!busqueda) return true;
        const b = normalizar(busqueda)
        return (
            normalizar(d.sala).includes(b) ||
            normalizar(d.mesa).includes(b) ||
            normalizar(d.total).includes(b)
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
                <p className="textoLibre">Ventas: <strong>{completado}</strong></p>
                </div>
            </div>
            </div>
        </div>
        <Buscador buscar={setBusqueda}></Buscador>
        <TablaDinamica columnas={columnas} datos={datosFiltrados} acciones={acciones} funcionRecargar={obtenerPedidos}></TablaDinamica>
        </section>
    )
}