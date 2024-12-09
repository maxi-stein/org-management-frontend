import { RawNodeDatum, Tree } from "react-d3-tree";
import "../App.css";

interface OrgChartProps {
  data: RawNodeDatum[];
}

const getDynamicPathClass = () => {
  return "custom-link";
};

interface CustomNodeElementProps {
  nodeDatum: RawNodeDatum;
}

const CustomNodeElement = ({ nodeDatum }: CustomNodeElementProps) => {
  const bgColor = nodeDatum.name.includes("Company")
    ? "#9974ff"
    : nodeDatum.name.includes("Area")
    ? "#ff946a"
    : nodeDatum.name.includes("Department")
    ? "#ffcbb6"
    : "#dfecff";
  let nodeData = {
    name: nodeDatum.name,
    ...(nodeDatum.attributes && {
      attributes: Object.values(nodeDatum.attributes),
    }),
  };

  return (
    <foreignObject width="150" height="150" x="-75" y="-30">
      <div
        style={{
          backgroundColor: bgColor,
          padding: "10px 20px",
          borderRadius: "5px",
          boxShadow: "0px 4px 6px rgba(9, 72, 124, 0.404)",
          color: "#333",
          textAlign: "center",
          minWidth: "100px",
          minHeight: "50px",
        }}
      >
        <p style={{ fontWeight: "bold" }}>{nodeData.name}</p>
        {nodeData.attributes?.map((attr, index) => (
          <p key={index}>{attr}</p>
        ))}
      </div>
    </foreignObject>
  );
};

export const OrgChart = ({ data }: OrgChartProps) => {
  return (
    <div
      id="treeWrapper"
      style={{ width: "100%", height: "90vh", overflow: "visible" }}
    >
      <Tree
        data={data}
        depthFactor={130}
        orientation="vertical"
        pathClassFunc={getDynamicPathClass}
        nodeSize={{ x: 250, y: 250 }}
        renderCustomNodeElement={(rd3tProps) => (
          <CustomNodeElement {...rd3tProps} />
        )}
        pathFunc={"step"}
      />
    </div>
  );
};
