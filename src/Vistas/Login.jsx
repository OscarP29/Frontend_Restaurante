import "../Css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUsuario }) {
  const navigate = useNavigate();
  const [usuario, setUsuarioInput] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const enviarUsuario = async () => {
    if (!usuario || !contrasena) {
      setError("Por favor complete todos los campos");
      return;
    }
    const usuarioRe = {
      user: usuario,
      contrasena: contrasena
    };
    try {
      const res = await fetch("http://localhost:8080/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioRe)
      });

      if (!res.ok) {
        throw new Error("Error en el servidor");
      }
      const data = await res.text()
      if (data === "no existe") {
        setError("Usuario o contraseña incorrectos");
        return;
      }
      if (data === "Administrador") {
        setUsuario({ rol: "Administrador" });
        navigate("/admin/");
      } else if (data === "Empleado") {
        setUsuario({ rol: "Empleado" });
        navigate("/empleado/");
      } 
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error conectando con el servidor");
    }
  };

    return (
        <div className="contenedor-principal">
        <div className="contenedor-login">
          <div className="encabezadoLogin">
            <span className="material-symbols-outlined iconos text-gray-600">restaurant</span>
            <h1 className="titulo">Bienvenido</h1>
            <p className="subtitulo">Inicia sesión en tu cuenta</p>
          </div>

          <div className="formulario">
            <div className="grupo-input">
              <span className="material-symbols-outlined iconos text-gray-600">account_circle</span>
              <input type="email" placeholder="Usuario" value={usuario} onChange={(e) => setUsuarioInput(e.target.value)} className="campo-texto"/>
            </div>

            <div className="grupo-input">
              <span className="material-symbols-outlined iconos text-gray-600">lock</span>
              <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="campo-texto"/>
            </div>
            <span>{error}</span>
            <button className="boton-iniciar" onClick={enviarUsuario}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
  );
}