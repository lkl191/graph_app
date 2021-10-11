import React from "react";
import { Pie } from "react-chartjs-2";

const PreviewPie = ({ graphInfo, inputData }) => {
  let color = [];
  let r = 255;
  let g = 255;
  let b = 255;

  for (let i = 0; i < inputData.label.length; i++) {
    switch (i % 3) {
      case 0:
        r -= 100;
        break;
      case 1:
        g -= 100;
        break;
      case 2:
        b -= 100;
        break;
      default:
        break;
    }
    if (r < 0) r = 255;
    if (g < 0) g = 225;
    if (b < 0) b = 200;

    color.push(`rgb(${r}, ${g}, ${b})`);
  }
  const data = {
    labels: inputData.label,
    datasets: [
      {
        label: graphInfo.title,
        data: inputData.value,
        backgroundColor: color,
        //[
        //  "rgb(155, 155, 255)",
        //  "rgb(255, 255, 155)",
        //  "rgb(255, 155, 255)",
        //  "rgb(155, 255, 255)",
        //],
        hoverOffset: 10,
      },
    ],
  };
  return (
    <div>
      <Pie type="Pie" data={data}></Pie>
    </div>
  );
};

export default PreviewPie;
