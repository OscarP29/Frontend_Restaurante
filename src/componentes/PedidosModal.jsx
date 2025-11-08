import PlatosTarjeta from "./PlatosTarjeta"
import "../Css/PedidosModal.css"
import { useEffect, useState } from "react"
export default function PedidoModal(){

    const [carritoPedido, setCarritoPedido] = useState([])

    const carritoActualizar = () => {
        const carrito = JSON.parse(sessionStorage.getItem("platosSeleccionados")) || [];
        setCarritoPedido(carrito)
    }
    useEffect (() => {
        carritoActualizar()
    },[])

    return(
        <div className="contenedorPedidosModal">
             <div className="contendorPedido">
                <div className="encabezadoPedidosModal">
                    <div></div>
                    <h2>Pedido</h2>
                </div>
                <div className="contenedorPlatosPedido">
                    {carritoPedido.length > 0  ? (carritoPedido.map((c) =>(
                        <PlatosTarjeta 
                        key={c.id_plato}
                        boton={true} 
                        nombre={c.nombre_plato}
                        precio={c.precio_plato}
                        eliminar={true}
                        plato={c}
                        actualizar={carritoActualizar}/>
                    ))):(
                        <p className="mensajeModalPedido">Sin Pedidos</p>
                    )}

                </div>
            </div>
            <div className="contenedorObservaciones">
                <div className="encabezadoPedidosModal">
                    <div></div>
                    <h2>Observaciones</h2>
                </div>
                <textarea className="textoObservaciones" name="" id=""></textarea>
            </div>
        </div>
    )
}