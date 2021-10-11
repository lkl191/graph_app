import React from 'react'
import { Scatter } from "react-chartjs-2";

const ScatterGraph = ({props}) => {
    const data = {
        datasets: [{
          label: props.title,
          data: [{
            x: -10,
            y: 0
          }, {
            x: 0,
            y: 10
          }, {
            x: 10,
            y: 5
          }, {
            x: 0.5,
            y: 5.5
          }],
          backgroundColor: 'rgb(255, 99, 132)'
        }],
      };
    
    return (
        <div>
            <Scatter type="Scatter" data={data} />
        </div>
    )
}

export default ScatterGraph
