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
      width="150" // Container width
      height="60" // Container height
      x="-75" // Horizontal alignment, adjust the node to the left
      y="-30" // Vertical alignment, adjust the node upwards
    >
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "10px 20px",
          borderRadius: "5px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          color: "#333",
          fontWeight: "bold",
          textAlign: "center",
          minWidth: "100px",
          minHeight: "50px",
        }}
      >
        {nodeDatum.name}
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
