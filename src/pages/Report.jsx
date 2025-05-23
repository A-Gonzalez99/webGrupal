import React, { useEffect, useRef, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { Bar } from "react-chartjs-2";
import "../ChartConfig.js";
import TopMenu from "../components/topmenu/TopMenu.jsx";
import Header from "../components/header/Header.jsx";
import "./report.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { obtenerDatos } from "../services/servicesController.js";

const Report = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const tableRef = useRef(null);
  const [mockData, setMockData] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      const data = await obtenerDatos(); // Esperamos la respuesta
      setMockData(data); // Guardamos los datos en el estado
      setData(data)
    }

    cargarDatos();
  }, []);
  

  // Configuración de columnas para la tabla
  const columns = React.useMemo(
    () => [
      { Header: "Correo", accessor: "name" },
      { Header: "Proyectos Creados", accessor: "proyectos" },
      { Header: "Storyboards Creados", accessor: "storyboards" },
      { Header: "Localizaciones Creadas", accessor: "localizaciones" },
    ],
    []
  );

  // Configuración de la tabla con ordenamiento
  const tableInstance = useTable({ columns, data }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // Datos para el gráfico
  const chartData = {
    labels: mockData.map((user) => user.name),
    datasets: [
      {
        label: "Proyectos Creados",
        data: mockData.map((user) => user.proyectos),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Storyboards Creados",
        data: mockData.map((user) => user.storyboards),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Localizaciones Creadas",
        data: mockData.map((user) => user.localizaciones),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };
  

  const exportToPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4"); // Crear un PDF en formato A4
    const margin = 10; // Margen en mm

    // Capturar la tabla como imagen
    const tableCanvas = await html2canvas(tableRef.current);
    const tableImg = tableCanvas.toDataURL("image/png");

    // Capturar el gráfico como imagen
    const chartCanvas = await html2canvas(chartRef.current.canvas);
    const chartImg = chartCanvas.toDataURL("image/png");

    // Añadir la tabla al PDF
    const tableWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
    const tableHeight = (tableCanvas.height * tableWidth) / tableCanvas.width;
    pdf.addImage(tableImg, "PNG", margin, margin, tableWidth, tableHeight);

    // Añadir el gráfico al PDF
    const chartWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
    const chartHeight = (chartCanvas.height * chartWidth) / chartCanvas.width;
    pdf.addPage(); // Añadir una nueva página para el gráfico
    pdf.addImage(chartImg, "PNG", margin, margin, chartWidth, chartHeight);

    // Guardar el PDF
    pdf.save("informe_proyectos.pdf");
  };

  return (
    <>
      <TopMenu />
      <Header title="Informe de Proyectos" />
      <div className="panelReport">
        <button onClick={exportToPDF} className="botonExel">
          Descargar PDF
        </button>
        <table
          ref={tableRef}
          {...getTableProps()}
          style={{
            border: "1px solid black",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{ border: "1px solid black", padding: "5px" }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Gráfico */}
        <Bar
          data={chartData}
          ref={chartRef}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default Report;
