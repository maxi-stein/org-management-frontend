import { Chart, registerables } from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { useStats } from "../../hooks/react-query/useStats";
import { CHART_COLORS } from "./StatisticsChart";

interface Props {
  options: any;
}

export const DepartmentPeopleChart = ({ options }: Props) => {
  // This line registers all the necessary components and controllers from Chart.js,
  // which are required to render charts.
  Chart.register(...registerables);

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

  return isLoading || isError ? (
    <div>Loading...</div>
  ) : (
    <PolarArea
      data={{
        labels: departmentLabels,
        datasets: [
          {
            data: departmentData,
            backgroundColor: [
              CHART_COLORS.RED,
              CHART_COLORS.RED_LIGHT,
              CHART_COLORS.GREY_MEDIUM,
              CHART_COLORS.GREY_LIGHT,
            ],
            hoverBackgroundColor: CHART_COLORS.RED + "CC",
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      }}
      options={{
        ...options,
        plugins: {
          ...options.plugins,
          title: {
            ...options.plugins.title,
            text: "Employees for each Department",
          },
        },
      }}
    />
  );
};
