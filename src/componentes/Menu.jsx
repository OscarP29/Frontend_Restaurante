import { useState } from "react";
import "../Css/Menu.css"
import usuarioImg from "../assets/usuario.png"
function Menu() {
  const [menu,setmenu] = useState(false);

  const MenuAccion = () => {
      setmenu(!menu)
  }

  return (
    <aside className={`contenedor-menu-${menu ? "abierto": "cerrado"}`}>
      <h2 className="contenedor-menu-titulo">Restaurante</h2>
      <div className={`contenedor-menu-usuario-${menu ? "abierto" : "cerrado" }`}>
        <img className="contenedor-menu-usuario-img" src={usuarioImg}/>
        <span className="contenedor-menu-usuario-nombre">Usuario</span>
      </div>
      <div className="contenedor-menu-opciones">
        <ul className={`contenedor-menu-opciones-lista-${menu ? "abierto" : "cerrado" }`}>
          <button className={`contenedor-menu-opciones-lista-boton-${menu ? "abierto" : "cerrado"}`} onClick={MenuAccion}>
            <span className="material-symbols-outlined">{menu ? "close" : "menu"} </span>
          </button>
            <li className={`contenedor-menu-opciones-lista-opcion-${menu ? "abierto": "cerrado"}`} key="mesas">
              <span className="material-symbols-outlined">table_restaurant</span>
              <span className="contenedor-menu-opciones-lista-opcion-span">Mesas</span>
              <span className="contenedor-menu-opciones-lista-opcion-info">Mesas</span>
            </li>
            <li className={`contenedor-menu-opciones-lista-opcion-${menu ? "abierto": "cerrado"}`} key="platos">
              <span className="material-symbols-outlined">flatware</span>
              <span className="contenedor-menu-opciones-lista-opcion-span">Platos</span>
              <span className="contenedor-menu-opciones-lista-opcion-info">Platos</span>
            </li>
            <li className={`contenedor-menu-opciones-lista-opcion-${menu ? "abierto": "cerrado"}`} key="pedidos">
              <span className="material-symbols-outlined">order_approve</span>
              <span className="contenedor-menu-opciones-lista-opcion-span">Pedidos</span>
              <span className="contenedor-menu-opciones-lista-opcion-info">Pedido</span>
            </li>
            <li className={`contenedor-menu-opciones-lista-opcion-${menu ? "abierto": "cerrado"}`} key="ventas">
              <span className="material-symbols-outlined">point_of_sale</span>
              <span className="contenedor-menu-opciones-lista-opcion-span">Ventas</span>
              <span className="contenedor-menu-opciones-lista-opcion-info">Ventas</span>
            </li>
        </ul>
        <div className="contenedorBotonSalir">
          <button className={`contenedor-menu-opciones-boton-${menu ? "abierto": "cerrado"}`}>
            <span className="material-symbols-outlined">exit_to_app</span>
            <span className="contenedor-menu-opciones-boton-span">Salir</span>
            <span className="contenedor-menu-opciones-boton-info">Salir</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Menu;
