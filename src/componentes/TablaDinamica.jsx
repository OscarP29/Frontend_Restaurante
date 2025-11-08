import "../Css/TablaDinamica.css"
import Modal from "../componentes/Modal"
import { useState } from 'react';

export default function TablaDinamica({columnas,datos,acciones,funcionRecargar}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fila, setFila] = useState(null)
    const [tipoModal, setModal] = useState();
    const [platosMesa, setPlatosMesa] = useState([])
    const [pedidoMesa, setPedidoMesa] = useState([])
    
    const columnasPlato = [
        {key: "nombre_plato", label: "Nombre"},
        {key: "cant_plato", label: "Cantidad"},
        {key: "precio", label: "Precio"},
        {key: "total_plato", label: "Total", className: "Total"},
    ]

    const AbrirModal = (filaSeleccionada) => {
      setModal("Ver")
      setIsModalOpen(true);
      setFila(filaSeleccionada)
      console.log(filaSeleccionada)
      var xd = true
      if (xd) {
            fetch(`http://localhost:8080/PlatosPedidoPendiente?id_pedido=${filaSeleccionada.id_pedido}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
                return res.json();
            })
            .then((data) => setPlatosMesa(data))
            .catch((err) => console.error("Error al cargar datos:", err));

            fetch(`http://localhost:8080/PedidosMesa?id_pedido=${filaSeleccionada.id_pedido}`)
            .then((res) => {
            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }
            
            return res.json();
            })
            .then((data) => {
            setPedidoMesa(data);
            })
            .catch((err) => {
            console.error("Error al cargar datos:", err);
            });
        }
    }
    const CerrarModal = () => {
      setFila(null)
      setIsModalOpen(false);
    }
    const finalizar = (filaSeleccionada) => {
      setModal("Finalizar")
      setIsModalOpen(true);
      setFila(filaSeleccionada)
      var xd = true
      if (xd) {
            fetch(`http://localhost:8080/PlatosPedidoPendiente?id_pedido=${filaSeleccionada.id_pedido}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
                return res.json();
            })
            .then((data) => setPlatosMesa(data))
            .catch((err) => console.error("Error al cargar datos:", err));

            fetch(`http://localhost:8080/PedidosMesa?id_pedido=${filaSeleccionada.id_pedido}`)
            .then((res) => {
            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }
            return res.json();
            })
            .then((data) => {
            setPedidoMesa(data);
            })
            .catch((err) => {
            console.error("Error al cargar datos:", err);
            });
        }
        
    }
    const FuncionesBotones = {
      AbrirModal,   
      CerrarModal,
      finalizar,
    };
    const ReferenciasFunciones = (accionDescriptor, row) => {
      if (typeof accionDescriptor.onClick === "function") {
        return accionDescriptor.onClick(row);
      }
      if (accionDescriptor.handlerName && FuncionesBotones[accionDescriptor.handlerName]) {
        return FuncionesBotones[accionDescriptor.handlerName](row);
      }
    }
    const finalizarPedido = () => {
      fetch(`http://localhost:8080/actulizarEstadoPedido?id_pedido=${pedidoMesa.id_pedido}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          estado: true
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          return response.text(); // usa .text() si el backend no devuelve JSON
        })
        .then(data => {
          console.log("Estado del pedido actualizado:", data);
          alert("✅ Pedido finalizado correctamente.");
          setIsModalOpen(false)
          funcionRecargar()
        })
        .catch(error => {
          console.error("Error al actualizar pedido:", error);
          alert("❌ Ocurrió un error al finalizar el pedido. Intenta nuevamente.");
        });
  };

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
              {tipoModal === "Ver" && fila ? (
                <>
              <div className="encabezadoModal">
              <div>
                  <div className="divDecoracion"></div>
                  <h3>Mesa {pedidoMesa.mesa}</h3>
              </div>
              </div>
              <div className="informacionPedido">
                <h3 className="detalleTitulo">Detalle del Pedido</h3>
                <div className="contenedorInformacionPedido">
                  <ul>
                    <p>ID Pedido: <strong>{pedidoMesa.id_pedido}</strong></p>
                    <p>Fecha: <strong>{pedidoMesa.fecha}</strong></p>
                    <p>Sala: <strong>{pedidoMesa.sala}</strong></p>
                  </ul>
                  <ul>
                    <p>Estado: <strong>{pedidoMesa.estado_pedido ? "Pendiente": "Completado"}</strong></p>
                    <p>Mesa: <strong>{pedidoMesa.mesa}</strong></p>
                    <p>Total: <strong> $ {pedidoMesa.total} COP</strong></p>
                  </ul>
                </div>
              </div>
              <h3 className="informacionPlatosPedido">Platos del Pedido</h3>
                <div className="contenedorTablaDetalle">
                    <table className="tabla">
                      <thead>
                          <tr>
                              {columnasPlato.map((col) => (
                        <th key={col.key}>{col.label}</th>
                      ))}
                              </tr>
                          </thead>
                          <tbody>
                          {platosMesa.map((row, idx) => (
                      <tr key={idx}>
                        {columnasPlato.map((col) => (
                          <td key={col.key}>
                              <p className={col.className}>
                              {row[col.key]}</p>
                              </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  </table>

                </div>
              </>
            ) : (null)}
            {tipoModal === "Finalizar" && 
              <>
              <div className="encabezadoModal">
              <div>
                  <div className="divDecoracion"></div>
                  <h3>Mesa {pedidoMesa.mesa}</h3>
              </div>
              <p>Fecha : <strong>{pedidoMesa.fecha}</strong></p>
              </div>
              <div className="contendorModal">
                  <div className="contenedorTablaDetalle">
                    <table className="tabla">
                      <thead>
                          <tr>
                              {columnasPlato.map((col) => (
                        <th key={col.key}>{col.label}</th>
                      ))}
                              </tr>
                          </thead>
                          <tbody>
                          {platosMesa.map((row, idx) => (
                      <tr key={idx}>
                        {columnasPlato.map((col) => (
                          <td key={col.key}>
                              <p className={col.className}>
                              {row[col.key]}</p>
                              </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  </table>
                </div>
              </div>
              <p>Total a Pagar: <strong>$ {pedidoMesa.total} COP</strong></p>
              <div className="contenedorBotones">
                  <button className="botonListoModal" onClick={finalizarPedido}>Finalizar</button>
                  <button className="botonCerrarModal" onClick={CerrarModal}>Cancelar</button>
              </div>
              </>
            }
            </Modal>
        </div>
    )
}