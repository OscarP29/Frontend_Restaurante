import "../Css/Login.css";
export default function Login() {
    return (
        <div className="contenedor-principal">
        <div className="contenedor-login">
          <div className="encabezado">
            <span className="material-symbols-outlined text-gray-600">restaurant</span>
            <h1 className="titulo">Bienvenido</h1>
            <p className="subtitulo">Inicia sesión en tu cuenta</p>
          </div>

          <div className="formulario">
            <div className="grupo-input">
              <span className="material-symbols-outlined text-gray-600">account_circle</span>
              <input type="email" placeholder="Usuario" className="campo-texto"/>
            </div>

            <div className="grupo-input">
              <span className="material-symbols-outlined text-gray-600">lock</span>
              <input type="password" placeholder="Contraseña" className="campo-texto"/>
            </div>
            <button className="boton-iniciar">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
  );
}