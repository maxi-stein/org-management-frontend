import { RawNodeDatum, Tree } from "react-d3-tree";
import "../App.css";
import { useEffect, useRef } from "react";

interface OrgChartProps {
  data: RawNodeDatum[];
}

const getDynamicPathClass = () => {
  return "custom-link";
};

const getNodeClass = () => {
  return "custom-node";
};

interface CustonNodeElementProps {
  nodeDatum: RawNodeDatum;
}

const CustomNodeElement = ({ nodeDatum }: CustonNodeElementProps) => {
  return (
    <foreignObject
      width="170" // Container width
      height="10000" // Container height
      x="-75" // Horizontal alignment, adjust the node to the middle of the screen
      y="-30" // Vertical alignment, adjust the node upwards
      style={{ position: "relative", zIndex: 10 }}
    >
      <div
        style={{
          backgroundColor: "#3bb98539",
          padding: "10px 20px",
          borderRadius: "5px",
          boxShadow: "4px 4px 10px rgba(12, 150, 81, 0.438)",
          color: "#333",
          textAlign: "center",
          margin: "10px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <p style={{ fontWeight: "bold" }}>{nodeDatum.name}</p>

        {nodeDatum.attributes &&
          Object.values(nodeDatum.attributes).map((value, index) => (
            <p style={{ fontSize: "12px" }} key={index}>
              {value}
            </p>
          ))}
      </div>
    </foreignObject>
  );
};

export const OrgChart = ({ data }: OrgChartProps) => {
  const treeWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Asegurarse de que el árbol esté renderizado y luego manipular el DOM
    if (treeWrapperRef.current) {
      // Obtener el SVG dentro del treeWrapper
      const svgElement = treeWrapperRef.current.querySelector("svg");

      if (svgElement) {
        const paths = svgElement.querySelectorAll("path.rd3t-link");
        const nodes = svgElement.querySelectorAll("g.rd3t-node");

        // Cambiar el orden de apilamiento
        paths.forEach((path) => path.setAttribute("style", "z-index: 1;"));
        nodes.forEach((node) => node.setAttribute("style", "z-index: 10;"));
      }
    }
  }, [data]); // Cada vez que los datos cambien, volvemos a ajustar el DOM
  return (
    <div
      id="treeWrapper"
      style={{
        width: "100%",
        height: "90vh",
        overflow: "clip",
        position: "relative",
      }}
    >
      <Tree
        data={data}
        depthFactor={200} // space between nodes (how large the path is)
        orientation="vertical"
        pathClassFunc={getDynamicPathClass}
        branchNodeClassName={"branch-node"}
        leafNodeClassName={"leaf-node"}
        rootNodeClassName={"root-node"}
        nodeSize={{ x: 250, y: 150 }} //in vertical orientation, only x is used. Distance between nodes x-axis
        renderCustomNodeElement={(rd3tProps) => (
          <CustomNodeElement {...rd3tProps} />
        )}
      />
    </div>
  );
};
