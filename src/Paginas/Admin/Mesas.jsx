import "../../Css/Encabezado.css"
import "../../Css/Admin/Mesas.css"
import { useState } from "react"
import MesasIngresar from "../../componentes/Admin/MesasIngresar"
import MesasTabla from "../../componentes/Admin/MesasTabla"
export default function Mesas(){
    const [section, setSection] = useState("Crear")
    return(
        <section>
            <div className="encabezado">
                <h1>Mesas</h1>
            </div>
            <nav className="navegadorModalAdmin">
                <ul>
                    <li className={`${section === "Crear" ? "liSelecionadoMesa" : "liNoSelecionadoMesa"}`} onClick={() => setSection("Crear")}>Crear</li>
                    <li className={`${section === "Tabla" ? "liSelecionadoMesa" : "liNoSelecionadoMesa"}`} onClick={() => setSection("Tabla")}>Tablas</li>
                </ul>
            </nav>
            <div className="contenedorAdminMesas">
                {section === "Crear" && <MesasIngresar/>}
                {section === "Tabla" && <MesasTabla/>}
            </div>
        </section>

    )
}