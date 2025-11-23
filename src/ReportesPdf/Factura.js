import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export function generarFactura(pedido, detalle, totalGeneral) {
  const doc = new jsPDF();

  const verde = "#007000";
  const oscuro = "#1c1632";

  // TÍTULO
  doc.setFontSize(24);
  doc.setTextColor(verde);
  doc.text("FACTURA", 14, 20);

  // Datos del pedido
  doc.setFontSize(12);
  doc.setTextColor(oscuro);
  doc.text(`Pedido: ${pedido.id_pedido}`, 14, 30);
  doc.text(`Fecha: ${pedido.fecha}`, 14, 36);
  doc.text(`Mesa: ${pedido.mesa} - Sala: ${pedido.sala}`, 14, 42);

  // TABLA
  autoTable(doc, {
    startY: 50,
    head: [["Producto", "Cant", "P. Unit", "Subtotal"]],
    body: detalle.map(d => [
      d.nombre_plato,
      d.cant_plato,
      d.precio,
      d.total_plato
    ]),
    theme: "grid",
    headStyles: {
      fillColor: verde,
      textColor: "white",
      fontStyle: "bold"
    },
    styles: { fontSize: 11, cellPadding: 3 }
  });

  // TOTAL
  doc.setFontSize(16);
  doc.setTextColor(oscuro);
  doc.text(`TOTAL: $${totalGeneral}`, 140, doc.lastAutoTable.finalY + 15);

  doc.save(`factura_${pedido.id_pedido}.pdf`);
}
