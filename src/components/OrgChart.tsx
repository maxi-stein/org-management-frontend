import { RawNodeDatum, Tree } from "react-d3-tree";
import "../App.css";
import { useState } from "react";
import { Button } from "antd";
import { CustomNodeElement } from "./CustomNodeElement";

interface OrgChartProps {
  data: RawNodeDatum[];
  userNodeId: string | null | undefined;
}

export const nodeColors = {
  company: "#3185fc",
  area: "#FF9F4A",
  department: "#f6f930",
  default: "white",
  text: "black",
  defaultBorder: "#3814d8",
};

export const OrgChart = ({ data, userNodeId }: OrgChartProps) => {
  const [zoom, setZoom] = useState(1);
  const [translate, setTranslate] = useState({ x: innerWidth / 2, y: 80 });
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
        <Button type="primary" onClick={() => setZoom((prev) => prev + 0.2)}>
          +
        </Button>
        <Button type="primary" onClick={() => setZoom((prev) => prev - 0.2)}>
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
          separation={{ siblings: 1.5, nonSiblings: 1.8 }}
          orientation="vertical"
          pathClassFunc={() => "custom-link"}
          nodeSize={{ x: 350, y: 250 }}
          renderCustomNodeElement={(rd3tProps) => (
            <CustomNodeElement {...rd3tProps} userNodeId={userNodeId} />
          )}
          pathFunc={"step"}
          translate={translate}
          zoom={zoom}
          enableLegacyTransitions
          transitionDuration={700}
        />
      </div>
    </>
  );
};
