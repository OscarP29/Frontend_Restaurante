import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generarReporteDia(fecha, ventasLista) {
  const doc = new jsPDF();

  // COLORES
  const verde = "#007000";
  const oscuro = "#1c1632";

  // CÁLCULO AUTOMÁTICO DEL TOTAL DEL DÍA
  const totalDelDia = ventasLista.reduce((acc, v) => acc + (v.total || 0), 0);

  // TÍTULO
  doc.setFontSize(22);
  doc.setTextColor(verde);
  doc.text("REPORTE DE VENTAS DEL DÍA", 14, 20);

  // SUBTÍTULO
  doc.setFontSize(12);
  doc.setTextColor(oscuro);
  doc.text(`Fecha: ${fecha}`, 14, 30);

  // TABLA
  autoTable(doc, {
    startY: 40,
    head: [["ID Pedido", "Hora", "Mesa", "Sala", "Total"]],
    body: ventasLista.map(v => [
      v.id_pedido,
      v.fecha,
      v.mesa,
      v.sala,
      `$${v.total}`
    ]),
    theme: "striped",
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: {
      fillColor: verde,
      textColor: "#ffffff",
      fontStyle: "bold"
    },
    alternateRowStyles: {
      fillColor: "#f5f5f5"
    }
  });

  // TOTAL DEL DÍA CALCULADO
  doc.setFontSize(16);
  doc.setTextColor(oscuro);
  doc.text(
    `TOTAL DEL DÍA: $${totalDelDia}`,
    14,
    doc.lastAutoTable.finalY + 15
  );

  doc.save(`reporte_dia_${fecha}.pdf`);
}
