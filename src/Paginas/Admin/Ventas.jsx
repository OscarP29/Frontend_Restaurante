import TablaDinamica from "../../componentes/TablaDinamica"
import Buscador from "../../componentes/Buscador";
import Modal from "../../componentes/Admin/ModalEditarAdmin"
import "../../Css/Admin/Ventas.css"
import { useState, useEffect} from "react";
import {generarReporteDia} from "../../ReportesPdf/VentaDiaria.js"
import {generarReporteProductos} from "../../ReportesPdf/VentaProducto.js"
export default function Ventas(){

    const [busqueda, setBusqueda] = useState("")
    const [pedidos, setPedidos] = useState([])
    const [pedidosFecha, setPedidosFecha] = useState([])
    const [completado, setCompletados] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tipoGenerar, setTipoGenerar] = useState("diario");

    const AbrirModal = () => {
        setIsModalOpen(true);
    }
    const cerrarModal = () => {
        setIsModalOpen(false);
    }
    const generarReportes = (e) => {
        e.preventDefault();
        console.log("Generando reporte de tipo:", tipoGenerar);
        // Lógica para generar el reporte según el tipo seleccionado
        if (tipoGenerar === "diario") {
            const hoy = new Date().toISOString().split("T")[0];
            console.log("Fecha de hoy:", hoy);
            obtenerPedidosFecha(hoy);
            generarReporteDia(hoy,pedidosFecha);
        } else if (tipoGenerar === "productos") {
            generarReporteProductos();
        }
        cerrarModal();
    }
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
    const obtenerPedidosFecha = (fecha) =>{
        fetch(`http://localhost:8080/PedidosCompletadoFecha?fecha=${fecha}`)
            .then((res) => {
            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }
            return res.json();
            })
            .then((data) => {
            setPedidosFecha(data);
            console.log("Pedidos para la fecha", fecha, ":", data);
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
            handlerName: "generarFacturaPedido", className: "botonImprimir"
        },
        {
            icon: <span className="material-symbols-outlined text-gray-600">delete</span>,
            handlerName: "", className: "botonEliminar"
        }
    ]
    return(
        <section>
            <div className="encabezado">
                <h1>Ventas</h1>
            <div className="contenedorInfo">
                <div className="contenedorBotonesVenta">
                    <button className="botonGenerarVentas" onClick={AbrirModal}><span className="material-symbols-outlined">analytics</span>Generar Reportes</button>
                </div>
                <div className="contenedorLibre">
                    <div className="mesasLibres">
                        <p className="textoLibre">Ventas: <strong>{completado}</strong></p>
                    </div>
                </div>
            </div>
        </div>
        <Buscador buscar={setBusqueda}></Buscador>
        <TablaDinamica columnas={columnas} datos={datosFiltrados} acciones={acciones} funcionRecargar={obtenerPedidos}></TablaDinamica>
        <Modal abierto={isModalOpen} cerrado={cerrarModal}>
            <h2 className="editarSalaH2">Reportes</h2>
            <form action="" onSubmit={generarReportes}>
                <div className="formSala">
                    <label htmlFor="">Generar</label>
                    <select name="" id="" value={tipoGenerar} onChange={(e) => setTipoGenerar(e.target.value)}>
                        <option value="diario">Reporte Diario</option>
                        <option value="productos">Reporte Productos</option>
                    </select>
                </div>
                <input type="submit" className="botonGuardar" value="Generar"/>
            </form>
        </Modal>
        </section>
    )
}