import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "../Css/Notificacion.css";

export default function Notificacion() {
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("Añadido al Carrito");
   const [icono, setIcono] = useState("add_task");

  useEffect(() => {
    window.mostrarNotificacion = (texto = "Añadido al Carrito", icon = "add_task") => {
      setMensaje(texto);
      setIcono(icon)
      setVisible(false);
      setTimeout(() => setVisible(true), 10);
      setTimeout(() => setVisible(false), 2500);
    };

    return () => {
      delete window.mostrarNotificacion;
    };
  }, []);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setVisible(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className="cuerpoNotificacion">
      <div className="contenidoNotificacion">
        <span className="material-symbols-outlined">{icono}</span>
        <p>{mensaje}</p>
      </div>
    </div>,
    document.body
  );
}
