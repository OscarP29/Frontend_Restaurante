import PlatosTarjeta from "./PlatosTarjeta"
import "../Css/PedidosModal.css"
export default function PedidoModal(){
    return(
        <div className="contenedorPedidosModal">
             <div className="contendorPedido">
                <div className="encabezadoPedidosModal">
                    <div></div>
                    <h2>Pedido</h2>
                </div>
                <PlatosTarjeta boton={true} ingredientes={false} eliminar={true}></PlatosTarjeta>
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