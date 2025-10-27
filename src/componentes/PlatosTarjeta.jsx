import "../Css/PlatosTarjetas.css"
export default function PlatosTarjeta(){
    return(
        <div className="contenedorAtender-platos">
            <div className="contenedorAtender-platos-contenedor">
                <h3 className="contenedorAtender-platos-nombre">Salchipapa</h3>
                <p className="contenedorAtender-platos-desc">Salchicha, Papa, Salsa, lechuga</p>
            </div>
            <span className="contenedorAtender-platos-precio">$ 18.000</span>  
        </div>
    )
}