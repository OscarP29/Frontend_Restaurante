import "../Css/PlatosTarjetas.css"
export default function PlatosTarjeta({boton,ingredientes,eliminar,nombre,des,precio}){
    return(
        <div className="contenedorAtender-platos">
            <div className="contenedorAtender-platos-contenedor">
                <h3 className="contenedorAtender-platos-nombre">{nombre}</h3>
                {ingredientes && <p className="contenedorAtender-platos-desc">{des}</p>}
            </div>
            <span className="contenedorAtender-platos-precio">$ {precio}</span>
            {eliminar && <input className="inputNumero" type="number" name="" id="" min="1"/>}  
            {boton && <div className="contenedorBoton">
                <button className={`${eliminar ? "botonEliminar": "botonAñadir"}`}  onClick={()=> eliminar ? window.mostrarNotificacion('Producto Eliminado', "contract_delete") : window.mostrarNotificacion("Producto Añadido", "add_task")}>
                    <span className="material-symbols-outlined">{eliminar ? "delete": "add"}</span>
                </button>
            </div>} 
        </div>
    )
}