import React from 'react'
import { Radar } from "react-chartjs-2";
import { dataArray } from './utils/data';

const RadarGraph = ({props}) => {
  const propsData = props.data
  const {labelArray, valueArray} = dataArray(propsData)

  //割合で点数をつける
    const data = {
        labels: labelArray,
        datasets: [{
          label: props.title,
          data: valueArray,
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        },]
      };
    return (
        <div>
            <Radar type="Radar" data={data} />
        </div>
    )
}

export default RadarGraph
