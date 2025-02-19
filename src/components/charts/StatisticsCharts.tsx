import { Chart, registerables } from "chart.js";
import { useStats } from "../../hooks/react-query/useStats";
import { Doughnut, PolarArea } from "react-chartjs-2";

export const StatisticsCharts = () => {
  // This line registers all the necessary components and controllers from Chart.js,
  // which are required to render charts.
  Chart.register(...registerables);

  //Common options for all charts
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        color: "#333",
        font: {
          size: 16,
        },
      },
    },
  };

  //Fetch info stats for the department-people chart
  const {
    data: deptPeopleData,
    isLoading,
    isError,
    refetch: refetchDeptPeople,
  } = useStats("departments-people");
  if (!deptPeopleData) refetchDeptPeople;

  const departmentLabels = deptPeopleData?.data.map((item) => {
    return item.label;
  });
  const departmentData = deptPeopleData?.data.map((item) => {
    return item.count;
  });

  //Fetch info stats for the seniority chart
  const {
    data: seniorityData,
    isLoading: isLoadingSeniorityStats,
    isError: isErrorSeniorityStats,
    refetch: refetchSeniority,
  } = useStats("seniority-people");
  if (!deptPeopleData) refetchDeptPeople;

  const seniorityLabels = seniorityData?.data.map((item) => {
    return item.label;
  });
  const seniorityDataChart = seniorityData?.data.map((item) => {
    return item.count;
  });

  return isLoading || isError ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div style={{ width: "500px", margin: "20px" }}>
        <PolarArea
          data={{
            labels: departmentLabels,
            datasets: [
              {
                data: departmentData,
                backgroundColor: [
                  "#3185fc",
                  "#f6f930",
                  "#ff6b6b",
                  "#4ecdc4",
                  "#ff9f4a",
                  "#33db41",
                ],
                borderColor: "#ffffff",
                borderWidth: 2,
              },
            ],
          }}
          options={{
            ...commonOptions,
            plugins: {
              ...commonOptions.plugins,
              title: {
                ...commonOptions.plugins.title,
                text: "Employees for each Department",
              },
            },
          }}
        />
      </div>
      <div style={{ maxWidth: "500px", margin: "20px" }}>
        <Doughnut
          data={{
            labels: seniorityLabels,
            datasets: [
              {
                data: seniorityDataChart,
                backgroundColor: ["#4ecdc4", "#3185fc", "#f6f930", "#ff6b6b"],
                borderColor: "#ffffff",
                borderWidth: 2,
              },
            ],
          }}
          options={{
            ...commonOptions,
            plugins: {
              ...commonOptions.plugins,
              title: {
                ...commonOptions.plugins.title,
                text: "Employees per Seniority",
              },
            },
            cutout: "70%",
          }}
        />
      </div>
    </div>
  );
};
