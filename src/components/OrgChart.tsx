import { RawNodeDatum, Tree } from "react-d3-tree";
import "../App.css";
import { useState } from "react";
import { Button } from "antd";

interface OrgChartProps {
  data: RawNodeDatum[];
}

const nodeColors = {
  company: "#3185fc",
  area: "#FF9F4A",
  department: "#f6f930",
  default: "white",
  text: "black",
  defaultBorder: "#3814d8",
};

interface CustomNodeElementProps {
  nodeDatum: RawNodeDatum;
}

const CustomNodeElement = ({ nodeDatum }: CustomNodeElementProps) => {
  const nodeType = nodeDatum.name.includes("CEO")
    ? "company"
    : nodeDatum.name.includes("Area")
    ? "area"
    : nodeDatum.name.includes("Department")
    ? "department"
    : "default";

  const nodeStyle = {
    company: {
      background: nodeColors.company,
      border: `2px solid ${nodeColors.company}`,
    },
    area: {
      background: nodeColors.area,
      border: `2px solid ${nodeColors.area}`,
    },
    department: {
      background: nodeColors.department,
      border: `2px solid ${nodeColors.department}`,
    },
    default: {
      background: nodeColors.default,
      border: `2px solid ${nodeColors.defaultBorder}`,
    },
  }[nodeType];

  return (
    <foreignObject width="200" height="140" x="-100" y="-40">
      <div
        className="org-node"
        style={{
          ...nodeStyle,
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 8px 4px rgba(0,0,0,0.12)",
          color: nodeColors.text,
          textAlign: "center",
          minWidth: "180px",
          cursor: "pointer",
        }}
      >
        <p
          style={{
            margin: "0 0 8px 0",
            fontWeight: 600,
            fontSize: "1.1em",
          }}
        >
          {nodeDatum.name}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            fontSize: "0.9em",
          }}
        >
          {Object.entries(nodeDatum.attributes || {}).map(([key, value]) => (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </foreignObject>
  );
};

export const OrgChart = ({ data }: OrgChartProps) => {
  const [zoom, setZoom] = useState(1);
  return (
    <>
      <div
        style={{
          position: "absolute",
          right: "20px",
          top: "85px",
          display: "flex",
          gap: "8px",
          background: nodeColors.default,
          padding: "8px",
          borderRadius: "8px",
          boxShadow: nodeColors.default,
        }}
      >
        <Button
          type="primary"
          onClick={() => setZoom((prev) => Math.min(prev + 0.2, 3))}
        >
          +
        </Button>
        <Button
          type="primary"
          onClick={() => setZoom((prev) => Math.max(prev - 0.2, 0.2))}
        >
          -
        </Button>
      </div>
      <div
        id="treeWrapper"
        style={{
          width: "100%",
          height: "80vh",
          borderRadius: "16px",
        }}
      >
        <Tree
          data={data}
          depthFactor={160}
          separation={{ siblings: 1.2, nonSiblings: 1.5 }}
          orientation="vertical"
          pathClassFunc={() => "custom-link"}
          nodeSize={{ x: 300, y: 200 }}
          renderCustomNodeElement={(rd3tProps) => (
            <CustomNodeElement {...rd3tProps} />
          )}
          pathFunc={"step"}
          translate={{ x: window.innerWidth / 2, y: 80 }}
          zoom={zoom}
          enableLegacyTransitions
          transitionDuration={700}
        />
      </div>
    </>
  );
};
