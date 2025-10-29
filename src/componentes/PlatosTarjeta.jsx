import "../Css/PlatosTarjetas.css"
export default function PlatosTarjeta({boton,ingredientes}){
    return(
        <div className="contenedorAtender-platos">
            <div className="contenedorAtender-platos-contenedor">
                <h3 className="contenedorAtender-platos-nombre">Salchipapa</h3>
                {ingredientes && <p className="contenedorAtender-platos-desc">Salchicha, Papa, Salsa, lechuga</p>}
            </div>
            <span className="contenedorAtender-platos-precio">$ 18.000</span> 
            {boton && <div className="contenedorBoton">
                <button className="botonAñadir">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </div>} 
        </div>
    )
}