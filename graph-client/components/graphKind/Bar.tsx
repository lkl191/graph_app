import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import { dataArray } from "./utils/data";

const BarGraph = ({ props }) => {
  const propsData = props.data;
  const color = props.color || "75,192,192";

  const chartRef = useRef(null);
  //const base64Image = chartRef.current.chartInstance.toBase64Image();

  //label, valueの配列を取得
  const { labelArray, valueArray } = dataArray(propsData);

  const graphData = {
    // 軸ラベル
    // 各ラベルを配列にすることで軸ラベルが改行されて表示される
    labels: labelArray,
    datasets: [
      // 表示するデータセット
      {
        data: valueArray,
        label: props.title,
        backgroundColor: `rgba(${color}, 0.4)`,
      },
    ],
  };
  return (
    <div>
      <Bar type="Bar" data={graphData} ref={chartRef} />
    </div>
  );
};

export default BarGraph;
