import "../Css/MesaTarjeta.css";
export default function MesaTarjeta({numero, estado}) {
    return(
        <div className="cartaContenedor">
            <div className={estado ? "estadoOcupadoContenedor" : "estadoLibreContenedor"}>
                <span className="estadoContenedor-numero"> {numero} </span>
            </div>
            <div>
                <h3 className="titulo">Mesa {numero}</h3>
                <div className="contenedorBoton">
                    <button className={estado ? "botonOcupado" : "botonLibre"}>
                        {estado ? "Finalizar" : "Atender"}
                    </button>
                </div>
            </div>
    </div>
    )
}