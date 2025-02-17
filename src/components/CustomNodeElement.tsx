import { RawNodeDatum } from "react-d3-tree";
import { nodeColors } from "./OrgChart";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";

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

  const navigate = useNavigate();

  const handleClick = (userId?: string) => {
    if (nodeType === "default" && userId) {
      navigate(`/${userId}`);
    }
  };

  const title = nodeDatum.attributes?.title?.toString();

  const width = title ? (title.length > 30 ? "350" : "250") : "200";

  return (
    <foreignObject
      width={width}
      height="140"
      x="-100"
      y="-60"
      data-userid={nodeDatum.attributes?.userId}
    >
      <div
        className="org-node"
        style={{
          ...nodeStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
        onClick={() => handleClick(nodeDatum.attributes?.userId as string)}
      >
        {nodeType !== "default" ? (
          <p
            style={{
              margin: "0 0 8px 0",
              fontWeight: 600,
              fontSize: "1.1em",
            }}
          >
            {nodeDatum.name}
          </p>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              size="large"
              src={`https://ui-avatars.com/api/?name=${nodeDatum.name}&background=random`}
              style={{ border: "3px solid #4321da", borderRadius: "50%" }}
            />
            <div>
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontWeight: 600,
                  fontSize: "1.1em",
                }}
              >
                {nodeDatum.name}
              </p>
              <hr style={{ border: "1px solid #4321da" }} />

              <span style={{ fontWeight: 500, fontSize: "0.9em" }}>
                {title}
              </span>
            </div>
          </div>
        )}
      </div>
    </foreignObject>
  );
};
