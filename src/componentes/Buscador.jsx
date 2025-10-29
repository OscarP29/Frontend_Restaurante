import "../Css/Buscador.css"
export default function Buscador({buscar}){
    return(
        <form className="buscador" action="">
            <div className="contenedorIcon">
                <span className="material-symbols-outlined">search</span>
            </div>    
            <input className="buscador-text" 
            type="text" name="" id="BuscarPlato" 
            placeholder="Buscar" autoComplete="off"
            onChange={(e) => {buscar(e.target.value)}}/>
        </form>
    )
}