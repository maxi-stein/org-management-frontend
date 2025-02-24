import { Doughnut } from "react-chartjs-2";
import { useStats } from "../../hooks/react-query/useStats";
import { CHART_COLORS } from "./StatisticsChart";
import { Spin } from "antd";

interface Props {
  options: any;
}

export const SeniorityChart = ({ options }: Props) => {
  //Fetch info stats for the seniority chart
  const {
    data: seniorityData,
    isLoading: isLoadingSeniorityStats,
    isError: isErrorSeniorityStats,
    refetch: refetchSeniority,
  } = useStats("seniority-people");
  if (!seniorityData) refetchSeniority;

  const seniorityLabels = seniorityData?.data.map((item) => {
    return item.label;
  });
  const seniorityDataChart = seniorityData?.data.map((item) => {
    return item.count;
  });

  return (
    <>
      {isLoadingSeniorityStats ? (
        <Spin>Loading ...</Spin>
      ) : (
        <Doughnut
          data={{
            labels: seniorityLabels,
            datasets: [
              {
                data: seniorityDataChart,
                backgroundColor: [
                  CHART_COLORS.GREY_DARK,
                  CHART_COLORS.RED_LIGHT,
                  CHART_COLORS.RED,
                  CHART_COLORS.GREY_MEDIUM,
                ],
                borderColor: "#ffffff",
                borderWidth: 2,
              },
            ],
          }}
          options={{
            ...options,
            borderWidth: 2,
            plugins: {
              ...options.plugins,
              title: {
                ...options.plugins.title,
                text: "Employees per Seniority",
              },
            },
            cutout: "70%",
          }}
        />
      )}
    </>
  );
};
