import "../Css/MesaTarjeta.css";
export default function MesaTarjeta() {
    return(
        <article className="mesaContenedor">
            <div className="contenedorEstado">
                <div className="estadoLibre">
                    <span className="material-symbols-outlined">check</span>
                </div>
                <div className="informacionMesa">
                    <h3 className="nombreMesa">Mesa 1</h3>
                    <span className="estadoMesa">Libre</span>
                </div>
            </div>
                <button className="botonLibre">Atender</button>
        </article>
        
    )
}