import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generarReporteProductos(productosResumen) {
  const doc = new jsPDF();

  const verde = "#007000";
//   const oscuro = "#1c1632";

  doc.setFontSize(22);
  doc.setTextColor(verde);
  doc.text("REPORTE DE VENTAS POR PRODUCTO", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Producto", "Cantidad Vendida", "Precio Unitario", "Total"]],
    body: productosResumen.map(p => [
      p.nombre_plato,
      p.cantidad,
      `$${p.precio_plato}`,
      `$${p.total}`
    ]),
    theme: "striped",
    headStyles: {
      fillColor: verde,
      textColor: "white",
      fontStyle: "bold"
    },
    alternateRowStyles: {
      fillColor: "#f5f5f5"
    },
    styles: { fontSize: 10, cellPadding: 3 }
  });

  doc.save("reporte_productos.pdf");
}
