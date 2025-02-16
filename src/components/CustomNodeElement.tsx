import { RawNodeDatum } from "react-d3-tree";
import { nodeColors } from "./OrgChart";

interface CustomNodeElementProps {
  nodeDatum: RawNodeDatum;
  userNodeId: string | null | undefined;
}

export const CustomNodeElement = ({
  nodeDatum,
  userNodeId,
}: CustomNodeElementProps) => {
  const isCurrentUser = nodeDatum.attributes?.userId === userNodeId;

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
    },
    area: {
      background: nodeColors.area,
    },
    department: {
      background: nodeColors.department,
    },
    default: {
      background: nodeColors.default,
    },
  }[nodeType];

  return (
    <foreignObject
      width="200"
      height="140"
      x="-100"
      y="-40"
      data-userid={nodeDatum.attributes?.userId}
    >
      <div
        className="org-node"
        style={{
          ...nodeStyle,
          padding: "16px",
          borderRadius: "12px",
          color: nodeColors.text,
          textAlign: "center",
          minWidth: "180px",
          cursor: "pointer",
          border: isCurrentUser
            ? "3px solid #ff0000"
            : nodeDatum.name.includes("CEO")
            ? `2px solid ${nodeColors.company}`
            : nodeDatum.name.includes("Area")
            ? `2px solid ${nodeColors.area}`
            : nodeDatum.name.includes("Department")
            ? `2px solid ${nodeColors.department}`
            : `2px solid ${nodeColors.defaultBorder}`,
          boxShadow: isCurrentUser
            ? "inset rgba(255, 0, 0, 0.5) 0px 0px 8px 0px"
            : "0 8px 4px rgba(0,0,0,0.12)",
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
          <div
            key={nodeDatum.attributes?.userId as string}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 500 }}>
              {nodeDatum.attributes?.title}
            </span>
          </div>
        </div>
      </div>
    </foreignObject>
  );
};
