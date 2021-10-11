import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const PreviewLine = ({ graphInfo, inputData }) => {
  //const color = `75,192,192`
  const color = graphInfo.color;

  const example = {
    labels: inputData.label,
    datasets: [
      {
        label: `${graphInfo.title}`,
        data: inputData.value,
        fill: true,
        lineTension: 0,
        backgroundColor: `rgba(${color},0.4)`,
        borderColor: `rgba(${color},1)`,
        borderCapStyle: "round",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "square",
        pointBorderColor: `rgba(${color},1)`,
        pointBackgroundColor: "#eee",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: `rgba(${color},1)`,
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
  };
  return (
    <div>
      <Line type="Line" data={example} />
    </div>
  );
};

export default PreviewLine;
