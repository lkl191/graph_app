import React from "react";
import { Bar } from "react-chartjs-2";

const PreviewBar = ({ graphInfo, inputData }) => {
  //const color = `192, 192, 192`
  const color = graphInfo.color;

  const graphData = {
    // 軸ラベル
    // 各ラベルを配列にすることで軸ラベルが改行されて表示される
    labels: inputData.label,
    datasets: [
      // 表示するデータセット
      {
        data: inputData.value,
        label: graphInfo.title,
        backgroundColor: `rgba(${color},0.4)`,
      },
    ],
  };

  return (
    <div>
      <Bar type="Bar" data={graphData} />
    </div>
  );
};

export default PreviewBar;
