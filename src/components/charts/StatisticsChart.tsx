import { AvailableStats } from "../../hooks/react-query/useStats";
import { DepartmentPeopleChart } from "./DepartmentPeopleChart";
import { SeniorityChart } from "./SeniorityChart";

interface Props {
  type: AvailableStats;
}

export const CHART_COLORS = {
  RED: "#db1215",
  RED_LIGHT: "#f75552",
  GREY_DARK: "#1a1a1a",
  GREY_MEDIUM: "#595959",
  GREY_LIGHT: "#8c8c8c",
  BACKGROUND: "#ffffff",
};

export const StatisticsChart = ({ type }: Props) => {
  //Common options for all charts
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: CHART_COLORS.GREY_DARK,
          boxWidth: 16,
          padding: 20,
          font: {
            size: 14,
            family: "'Segoe UI', Roboto, sans-serif",
          },
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        color: CHART_COLORS.GREY_DARK,
        font: {
          size: 18,
          weight: "600",
        },
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: CHART_COLORS.GREY_DARK,
        titleColor: CHART_COLORS.BACKGROUND,
        bodyColor: CHART_COLORS.BACKGROUND,
        borderColor: CHART_COLORS.RED,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    elements: {
      bar: {
        borderRadius: 6,
        borderSkipped: "middle" as const,
      },
      arc: {
        borderWidth: 2,
        borderColor: CHART_COLORS.BACKGROUND,
      },
    },
  };

  return (
    <>
      {type === "departments-people" ? (
        <DepartmentPeopleChart options={commonOptions} />
      ) : (
        <SeniorityChart options={commonOptions} />
      )}
    </>
  );
};
