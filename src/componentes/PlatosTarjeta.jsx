import "../Css/PlatosTarjetas.css"
import { useState } from "react";
export default function PlatosTarjeta({boton,ingredientes,eliminar,nombre,des,precio,plato,actualizar,admin}){

    const [cantidad, setCantidad] = useState(plato.cantidad || 1);

    const obtenerCarrito = () => {
        return JSON.parse(sessionStorage.getItem("platosSeleccionados")) || [];
    };
    const funcionBoton = () => {
        if(eliminar){
                const carrito = obtenerCarrito()
                const nuevo = carrito.filter(p => p.id_plato !== plato.id_plato);
                sessionStorage.setItem("platosSeleccionados", JSON.stringify(nuevo));
                window.mostrarNotificacion('Producto Eliminado', "contract_delete")
                actualizar?.()
        }
        else{
            const carrito =  obtenerCarrito()
            const indexExistente = carrito.findIndex(p => p.id_plato === plato.id_plato);

            if (indexExistente !== -1) {
                carrito[indexExistente].cantidad += 1;
            } else {
                carrito.push({ ...plato, cantidad: 1 });
            }

            sessionStorage.setItem("platosSeleccionados", JSON.stringify(carrito));
            window.mostrarNotificacion("Producto Añadido", "add_task")
        }
    }
    const cambiarCantidad = (valor) => {
        if(valor < 1) return
        setCantidad(valor)
        const carrito = obtenerCarrito()
        const index = carrito.findIndex(p => p.id_plato === plato.id_plato);
        if(index !== -1){
            carrito[index].cantidad = valor
            sessionStorage.setItem("platosSeleccionados", JSON.stringify(carrito));
        }
    }
    return(
        <div className="contenedorAtender-platos">
            <div className="contenedorAtender-platos-contenedor">
                <h3 className="contenedorAtender-platos-nombre">{nombre}</h3>
                {ingredientes && <p className="contenedorAtender-platos-desc">{des}</p>}
            </div>
            <span className="contenedorAtender-platos-precio">$ {precio}</span>
            {eliminar && <input className="inputNumero" type="number" name="" id="" min="1" value={cantidad} onChange={(e) => cambiarCantidad(Number(e.target.value))}/>}  
            {boton && <div className="contenedorBoton">
                <button className={`${eliminar ? "botonEliminar": "botonAñadir"}`}  onClick={funcionBoton}>
                    <span className="material-symbols-outlined">{eliminar ? "delete": "add"}</span>
                </button>
            </div>}
            {admin && <div className="contenedorBotonesAdminTarjeta">
            <button className="botonEditar"><span className="material-symbols-outlined text-gray-600">edit</span></button>
            <button className="botonEliminar"><span className="material-symbols-outlined text-gray-600">delete</span></button>
          </div>} 
        </div>
    )
}