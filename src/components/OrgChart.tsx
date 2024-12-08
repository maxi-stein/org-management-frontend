import { RawNodeDatum, Tree } from "react-d3-tree";
import "../App.css";

interface OrgChartProps {
  data: RawNodeDatum[];
}

const getDynamicPathClass = () => {
  return "custom-link";
};

interface CustonNodeElementProps {
  nodeDatum: RawNodeDatum;
}

const CustomNodeElement = ({ nodeDatum }: CustonNodeElementProps) => {
  return (
    <foreignObject
      width="150" // Ancho del contenedor
      height="60" // Altura del contenedor
      x="-75" // Alineación horizontal, ajustamos el nodo hacia la izquierda
      y="-30" // Alineación vertical, ajustamos el nodo hacia arriba
    >
      <div
        style={{
          backgroundColor: "#f0f0f0", // Color de fondo
          padding: "10px 20px", // Espaciado
          borderRadius: "5px", // Bordes redondeados
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra
          color: "#333", // Color del texto
          fontWeight: "bold", // Negrita
          textAlign: "center", // Centrado del texto
          minWidth: "100px", // Tamaño mínimo
          minHeight: "50px", // Tamaño mínimo
        }}
      >
        {nodeDatum.name} {/* Nombre del nodo */}
      </div>
    </foreignObject>
  );
};

export const OrgChart = ({ data }: OrgChartProps) => {
  return (
    <div
      id="treeWrapper"
      style={{ width: "100%", height: "90vh", overflow: "auto" }}
    >
      <Tree
        data={data}
        depthFactor={100} // space between nodes (how large the path is)
        orientation="vertical"
        pathClassFunc={getDynamicPathClass}
        nodeSize={{ x: 200, y: 150 }} //in vertical orientation, only x is used. Distance between nodes x-axis
        renderCustomNodeElement={(rd3tProps) => (
          <CustomNodeElement {...rd3tProps} />
        )} // Renderiza el div
      />
    </div>
  );
};
