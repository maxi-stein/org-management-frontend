export const CompanyLogo: React.FC = () => {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "64px",
          width: "64px",
          backgroundColor: "white",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="../../organization-chart.png"
          alt="logo"
          style={{ width: "40px" }}
        />
      </div>
    </div>
  );
};
