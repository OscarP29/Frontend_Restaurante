import "../../Css/TablaDinamica.css"
import "../../Css/Admin/TablaDinamicaAdmin.css"
import Modal from "../Admin/ModalEditarAdmin.jsx"
import { useState, useEffect} from 'react';

export default function TablaDinamica({columnas,datos,acciones,funcionRecargar}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fila, setFila] = useState(null)
    const [tipoModal, setModal] = useState();
    const [salas, setSalas] = useState([]);
    const [idMesa, setIdMesa] = useState("");
    const [numeroMesa, setNumeroMesa] = useState("");
    const [idSala, setIdSala] = useState("");
    const [nombreSala, setNombreSala] = useState("");


    const ObtenerSalas = () =>{
        fetch("http://localhost:8080/Salas")
        .then((res) => {
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
        })
        .then((data) => {
        setSalas(data);
        })
        .catch((err) => {
        console.error("Error al cargar datos:", err);
        });
    }
    const EditarMesa = (filaSeleccionada) => {
      setModal("EditarMesa")
      setIsModalOpen(true);
      setFila(filaSeleccionada)
      setIdMesa(filaSeleccionada.id_mesa)
      setNumeroMesa(filaSeleccionada.numero_mesa)
      setIdSala(filaSeleccionada.id_sala)
      console.log(filaSeleccionada)
    }
    const EditarSala = (filaSeleccionada) => {
      setModal("EditarSala")
      setIsModalOpen(true);
      setFila(filaSeleccionada)
      setIdSala(filaSeleccionada.id_sala)
      setNombreSala(filaSeleccionada.nombre_sala)
      console.log(filaSeleccionada)
    }
    const enviarEditarMesa = async (e) => {
        e.preventDefault();
        if (!numeroMesa || !idSala || !idMesa) {
            alert("Por favor, completa todos los campos");
            return;
        }
        const nuevaMesa = {
          id_mesa: idMesa,
          numero_mesa: numeroMesa,
          estado_mesa: true,
          id_sala: idSala
        };
        try {
        const res = await fetch("http://localhost:8080/MesasActualizar", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaMesa),
        });
        if (!res.ok) throw new Error(`Error al crear mesa: ${res.status}`);
        alert("Mesa editada correctamente ✅");
        setNumeroMesa("");
        setIdSala("");
        setIdMesa("")
        ObtenerSalas();
        funcionRecargar();
        setIsModalOpen(false);

        } catch (err) {
        console.error(err);
        alert("Error al crear la sala ❌");
        }
    }
    const enviarEliminarMesa = async (e) => {
        e.preventDefault();
        const nuevaMesa = {
          id_mesa: idMesa,
          numero_mesa: "",
          estado_mesa:"",
          id_sala: ""
        };
        try {
        const res = await fetch("http://localhost:8080/MesasEliminar", {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaMesa),
        });
        if (!res.ok) throw new Error(`Error al crear mesa: ${res.status}`);
        alert("Mesa Eliminada correctamente ✅");
        setIdMesa("")
        ObtenerSalas();
        funcionRecargar();
        setIsModalOpen(false);

        } catch (err) {
        console.error(err);
        alert("Error al crear la sala ❌");
        }
    }
    const enviarEditarSala = async (e) => {
        e.preventDefault();
        if (!idSala || !nombreSala) {
            alert("Por favor, completa todos los campos");
            return;
        }
        const nuevaSala = {
          id_sala: idSala,
          nombre_sala: nombreSala
        };
        try {
        const res = await fetch("http://localhost:8080/SalasActualizar", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaSala),
        });
        if (!res.ok) throw new Error(`Error al crear sala: ${res.status}`);
        alert("Sala editada correctamente ✅");
        setNumeroMesa("");
        setIdSala("");
        setIdMesa("")
        ObtenerSalas();
        funcionRecargar();
        setIsModalOpen(false);
        } catch (err) {
        console.error(err);
        alert("Error al crear la sala ❌");
        }
    }
    const enviarEliminarSala = async (e) => {
        e.preventDefault();
        
        const nuevaSala = {
          id_sala: idSala,
          nombre_sala: ""
        };
        try {
        const res = await fetch("http://localhost:8080/SalasEliminar", {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaSala),
        });
        if (!res.ok) throw new Error(`Error al crear sala: ${res.status}`);
        alert("Sala eliminada correctamente ✅");
        setIdSala("");
        ObtenerSalas();
        funcionRecargar();
        setIsModalOpen(false);
        } catch (err) {
        console.error(err);
        alert("Error al crear la sala ❌");
        }
    }
    const CerrarModal = () => {
      setFila(null)
      setIsModalOpen(false);
    }
    const EliminarMesa = (filaSeleccionada) => {
      setModal("FinalizarMesa")
      setIsModalOpen(true);
      setFila(filaSeleccionada)
      setIdMesa(filaSeleccionada.id_mesa)  
    }
    const EliminarSala = (filaSeleccionada) => {
      setModal("FinalizarSala")
      setIsModalOpen(true);
      setFila(filaSeleccionada)
      setIdSala(filaSeleccionada.id_sala)
      
    }
    const FuncionesBotones = {
      EditarMesa,   
      EditarSala,
      CerrarModal,
      EliminarMesa,
      EliminarSala,
    };
    const ReferenciasFunciones = (accionDescriptor, row) => {
      if (typeof accionDescriptor.onClick === "function") {
        return accionDescriptor.onClick(row);
      }
      if (accionDescriptor.handlerName && FuncionesBotones[accionDescriptor.handlerName]) {
        return FuncionesBotones[accionDescriptor.handlerName](row);
      }
    }
    useEffect(() => {
      ObtenerSalas();
    }, []);
    return(

        <div className="contenedorTabla">
            <table className="tabla">
                <thead>
                    <tr>
                        {columnas.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
                 {acciones && <th className="tituloAcciones">Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                {datos.map((row, idx) => (
            <tr key={idx}>
              {columnas.map((col) => (
                <td key={col.key}>
                    <p className={col.className}>
                    {row[col.key]}</p>
                    </td>
              ))}
              {acciones && (
                <td className="acciones">
                  {acciones.map((accion, i) => (
                    <button className={accion.className}
                      key={i}
                      size="sm"
                      variant="ghost"
                      onClick={() => ReferenciasFunciones(accion, row)}
                    >
                      {accion.icon}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
            </tbody>
            </table>
            <Modal abierto={isModalOpen} cerrado={CerrarModal}>
              {tipoModal === "EditarMesa" && fila ? (
                <>
                <h2 className="editarMesaH2">EditarMesa</h2>
                <form className="formEditarMesa"  onSubmit={enviarEditarMesa}>
                  <div className="formNumeroMesa">
                    <label htmlFor="">Numero Mesa</label>
                    <input type="text" value={numeroMesa} onChange={(e) => setNumeroMesa(e.target.value)}/>
                  </div>
                  <div className="formSala">
                    <label htmlFor="">Sala</label>
                    <select name="comboxSalas" id="combosalas" value={idSala} onChange={(e) => setIdSala(e.target.value)}>
                      {salas.map((sala) => (
                            <option key={sala.id_sala} value={sala.id_sala}>{sala.nombre_sala}</option>
                        ))}
                    </select>
                  </div>
                    <input className="botonGuardar" type="submit" value="Guardar"/>
                </form>
              </>
            ) : (null)}
            {tipoModal === "EditarSala" && fila ? (
                <>
                <h2 className="editarSalaH2">EditarSala</h2>
                <form className="formEditarSala" action="" onSubmit={enviarEditarSala}>
                  <div className="formSalaEditar">
                    <label htmlFor="">Nombre Sala</label>
                    <input type="text" value={nombreSala} onChange={(e) => setNombreSala(e.target.value)}/>
                  </div>
                  <input className="botonGuardar" type="submit" value="Guardar" />
                </form>
              </>
            ) : (null)}
            {tipoModal === "FinalizarMesa" && 
              <>
              <div className="modalEliminar">
                <span className="material-symbols-outlined">warning</span>
                <h2 className="mensajeModal">¿Estas seguro?</h2>
                <div className="botonesModalEliminar">
                  <button className="botonEliminarModalEliminar" onClick={enviarEliminarMesa}>Eliminar</button>
                  <button onClick={CerrarModal}>Cancelar</button>
                </div>
              </div>
              </>
            }
            {tipoModal === "FinalizarSala" && 
              <>
              <div className="modalEliminar">
                <span className="material-symbols-outlined">warning</span>
                <h2 className="mensajeModal">¿Estas seguro?</h2>
                <div className="botonesModalEliminar">
                  <button className="botonEliminarModalEliminar" onClick={enviarEliminarSala}>Eliminar</button>
                  <button onClick={CerrarModal}>Cancelar</button>
                </div>
              </div>
              </>
            }
            </Modal>
        </div>
    )
}