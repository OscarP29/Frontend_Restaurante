import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Empleado from "./Vistas/Empleado";
import Login from "./Vistas/Login";
import Admin from "./Vistas/Admin"
function App() {
  const usuario = { rol: "admin" };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {usuario?.rol === "empleado" && (
          <Route path="/empleado/*" element={<Empleado />} />
        )}

        {usuario?.rol === "admin" && (
          <Route path="/admin/*" element={<Admin />} />
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
