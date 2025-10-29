import CategoriasPlatos from "./CategoriasPlato"
import Buscador from "./Buscador"
export default function PlatosMOdal(){
    return(
        <div>
            <Buscador></Buscador>
            <div>
                <CategoriasPlatos boton={true}></CategoriasPlatos>
            </div>
        </div>
    )
}