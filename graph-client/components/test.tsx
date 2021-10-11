import React from 'react';
import { Bar } from "react-chartjs-2";

function Test() {
  /** グラフデータ */
  const graphData = {
    labels: [
      ['2019年', '1月'],
      ['2019年', '2月'],
      ['2019年', '3月'],
      ['2019年', '4月'],
      ['2019年', '5月'],
      ['2019年', '6月'],
      ['2019年', '7月'],
      ['2019年', '8月'],
      ['2019年', '9月'],
      ['2019年', '10月'],
      ['2019年', '11月'],
      ['2019年', '12月'],
    ],
    datasets: [
      {
        type: 'bar',
        yAxisID: 'y-axis-precipitation',
        data: [16, 42, 117.5, 90.5, 120.5, 225, 193, 110, 197, 529.5, 156.5, 76.5],
        backgroundColor: 'rgba(30, 144, 255, 1)',
        label: '合計降水量(mm)',
      },
      {
        type: 'bar',
        yAxisID: 'y-axis-precipitation',
        data: [52.3, 56.1, 117.5, 124.5, 137.8, 167.7, 153.5, 168.2, 209.9, 197.8, 92.5, 51],
        backgroundColor: 'rgba(30, 144, 255, 0.2)',
        label: '合計降水量例年値(mm)',
      },
      {
        type: 'line',
        yAxisID: 'y-axis-temperature',
        data: [5.6, 7.2, 10.6, 13.6, 20, 21.8, 24.1, 28.4, 25.1, 19.4, 13.1, 8.5],
        label: '平均気温',
        lineTension: 0,
        fill: false,
        borderColor: 'rgba(255, 0, 0, 1)',
      },
      {
        type: 'line',
        yAxisID: 'y-axis-temperature',
        data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25, 26.4, 22.8, 17.5, 12.1, 7.6],
        label: '平均気温の平年値',
        lineTension: 0,
        fill: false,
        borderColor: 'rgba(255, 0, 0, 0.2)',
      },
    ],
  };

  /** グラフオプション */
  const graphOption = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: '2019年',
          },
        },
      ],
      yAxes: [
        {
          id: 'y-axis-precipitation',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: '合計降水量(mm)',
          },
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return `${value}(mm)`;
            },
          },
        },
        {
          id: 'y-axis-temperature',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: '平均気温(℃)',
          },
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return `${value}(℃)`;
            },
          },
        },
      ],
    },
  };

  return (
    <div className="App">
      {/* グラフコンポーネントの呼び出し */}
      <Bar data={graphData} options={graphOption} type="bar" />
    </div>
  );
}

export default Test;