import CategoriasPlatos from "./CategoriasPlato"
import "../Css/PedidosModal.css"
export default function PedidoModal(){
    return(
        <div className="contenedorPedidosModal">
            <CategoriasPlatos boton={true}></CategoriasPlatos>
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