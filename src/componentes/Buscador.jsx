import "../Css/Buscador.css"
export default function Buscador(){
    return(
        <form className="buscador" action="">
            <div className="contenedorIcon">
                <span className="material-symbols-outlined">search</span>
            </div>    
            <input className="buscador-text" type="text" name="" id="BuscarPlato" placeholder="Buscar" autoComplete="off"/>
        </form>
    )
}