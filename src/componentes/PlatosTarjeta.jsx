import "../Css/PlatosTarjetas.css"
import Modal from "../componentes/Modal.jsx";
import ModalElimnar from "../componentes/Admin/ModalEditarAdmin.jsx"
import { useEffect, useState } from "react";
export default function PlatosTarjeta({boton,ingredientes,eliminar,nombre,des,precio,plato,actualizar,admin,recargar}){

    const [cantidad, setCantidad] = useState(plato.cantidad || 1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEliminar, setIsModalOpenEliminar] = useState(false);
    const [tipoModal, setModal] = useState();
    const [categorias, setCategorias] = useState([]);

    const [idPlato, setIdPlato] = useState("");
    const [nombrePlato, setNombrePlato] = useState("");
    const [precioPlato, setPrecioPlato] = useState("");
    const [descripcionPlato, setDescripcionPlato] = useState("");
    const [idcategoriaPlato, setIdCategoriaPlato] = useState("");

    const abrirModalEditar = () => {
        setIsModalOpen(true);
        setModal("EditarPlato")
        setNombrePlato(plato.nombre_plato)
        setPrecioPlato(plato.precio_plato)
        setDescripcionPlato(plato.descripcion_plato)
        setIdCategoriaPlato(plato.id_categoria)
        setIdPlato(plato.id_plato)
        console.log(idcategoriaPlato)
        console.log(plato)
    }
    const abrirModalElimnar = () => {
        setIsModalOpenEliminar(true);
        setModal("EliminarPlato")
        setNombrePlato(plato.nombre_plato)
        setPrecioPlato(plato.precio_plato)
        setDescripcionPlato(plato.descripcion_plato)
        setIdCategoriaPlato(plato.id_categoria)
        setIdPlato(plato.id_plato)
        console.log(plato)
    }
    const enviarEdicionPlato = async (e) => {
        e.preventDefault();
        const nuevoPlato = {
            id_plato: idPlato,
            nombre_plato: nombrePlato,
            descripcion_plato: descripcionPlato,
            id_categoria: idcategoriaPlato, // ✔ COINCIDE CON LA API
            precio_plato: precioPlato
        };
        try {
        const res = await fetch("http://localhost:8080/PlatosActualizar", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoPlato),
        });
        if (!res.ok) throw new Error(`Error al crear mesa: ${res.status}`);
        alert("Plato editado correctamente ✅");
        setIsModalOpen(false);
        recargar();
        
        } catch (err) {
        console.error(err);
        alert("Error al crear la sala ❌");
        }
    }
    const enviarEliminarPlato = async (e) => {
        e.preventDefault();
        const nuevoPlato = {
            id_plato: idPlato,
            nombre_plato: "",
            descripcion_plato: "",
            id_categoria: "",
            precio_plato: ""
        };
        try {
        const res = await fetch("http://localhost:8080/PlatosEliminar", {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoPlato),
        });
        if (!res.ok) throw new Error(`Error al crear mesa: ${res.status}`);
        alert("Plato eliminado correctamente ✅");
        setIsModalOpen(false);
        recargar();
        
        } catch (err) {
        console.error(err);
        alert("Error al crear la sala ❌");
        }
    }
    const CerrarModal = () => {
      setIsModalOpen(false);
    }
    const CerrarModalEliminar = () => {
      setIsModalOpenEliminar(false);
    }

    const obtenerCategorias = () => {
        fetch("http://localhost:8080/Categorias")
        .then((res) => {
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
        })
        .then((data) => {
        setCategorias(data);
        })
        .catch((err) => {
        console.error("Error al cargar datos:", err);
        });
        
    }
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
    useEffect(() => {
        obtenerCategorias();
    }, []);
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
            <button className="botonEditar" onClick={abrirModalEditar}><span className="material-symbols-outlined text-gray-600">edit</span></button>
            <button className="botonEliminar" onClick={abrirModalElimnar}><span className="material-symbols-outlined text-gray-600">delete</span></button>
          </div>}
          <Modal abierto={isModalOpen} cerrado={CerrarModal}>
            {tipoModal === "EditarPlato" && plato ? (
                <>
                <h2>Editar Plato</h2>
                <form action="" className="formEditarPlato" onSubmit={enviarEdicionPlato}>
                    <div className="formNombrePlato">
                        <label htmlFor="">Nombre Plato</label>
                        <input type="text" value={nombrePlato}  onChange={(e) => setNombrePlato(e.target.value)}/>
                    </div>
                    <div className="formPrecioPlato">
                        <label htmlFor="">Precio Plato</label>
                        <input type="number" min="0" value={precioPlato} onChange={(e) => setPrecioPlato(e.target.value)}/>
                    </div>
                    <div className="formCategoriaPlato">
                        <label htmlFor="">Categoria Plato</label>
                        <select name="" id="" value={idcategoriaPlato} onChange={(e) => setIdCategoriaPlato(e.target.value)}>
                            {categorias.map((categoria) => (
                                <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.tipo_categoria}</option>
                            ))}
                        </select>
                    </div>
                    <div className="formDescripcionPlato">
                        <label htmlFor="">Descripcion Plato (Opcional)</label>
                        <textarea name="" id="" value={descripcionPlato} onChange={(e) => setDescripcionPlato(e.target.value)}></textarea>
                    </div>
                    <input className="botonGuardar" type="submit" value="Guardar"/>
                </form>
                </>
            ) : (null)}
          </Modal>   
          <ModalElimnar abierto={isModalOpenEliminar} cerrado={CerrarModalEliminar}>
            <>
            <div className="modalEliminar">
                <span className="material-symbols-outlined">warning</span>
                <h2 className="mensajeModal">¿Estas seguro?</h2>
                <div className="botonesModalEliminar">
                  <button className="botonEliminarModalEliminar" onClick={enviarEliminarPlato}>Eliminar</button>
                  <button onClick={CerrarModal}>Cancelar</button>
                </div>
              </div>
              </>
          </ModalElimnar>
        </div>
    )
}