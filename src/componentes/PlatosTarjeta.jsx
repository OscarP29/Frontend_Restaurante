import "../Css/PlatosTarjetas.css"
export default function PlatosTarjeta({nombre,des,precio}){
    return(
        <div className="contenedorAtender-platos">
            <span className="contenedorAtender-platos-nombre">{nombre}</span>
            <span className="contenedorAtender-platos-desc">{des}</span>
            <span className="contenedorAtender-platos-precio">{precio}</span>  
        </div>
    )
}