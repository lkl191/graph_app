import React from 'react'
import { Pie } from "react-chartjs-2";
import { dataArray } from './utils/data';

const PieGraph = ({props}) => {
  let color = [];
  let r = 255;
  let g = 255;
  let b = 255;

  for (let i = 0; i < props.data.length; i++) {
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

  const propsData = props.data
  const {labelArray, valueArray} = dataArray(propsData)
    const data = {
        labels: labelArray,
        datasets: [{
          label: props.title,
          data: valueArray,
          backgroundColor: color,
          hoverOffset: 4,
          
        }]
      };
    return (
        <div>
            <Pie type="Pie" data={data} ></Pie>
        </div>
    )
}

export default PieGraph
