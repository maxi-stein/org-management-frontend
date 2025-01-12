interface BadgeProps {
  text: string;
  status: "active" | "inactive";
}
export const Badge = ({ text, status }: BadgeProps) => {
  const bgColor = status === "active" ? " #67cc55" : " #d91a29";
  return (
    <div
      style={{
        backgroundColor: "transparent",
        display: "inline-block",
        padding: "8px 16px",
        borderRadius: "6px",
        borderColor: bgColor,
        borderStyle: "solid",
        borderWidth: "1px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        fontSize: "14px",
        textAlign: "center",
        margin: "4px",
        paddingBlock: "2px",
      }}
    >
      {text}
    </div>
  );
};
