import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const PreviewBlend = ({ graphInfo }) => {
  const [dataArray, setDataArray] = useState([]);
  let [graphData, setGraphData] = useState([
    {
      labels: [],
      values: [],
    },
  ]);

  const pushGraphData = () => {
    let labels = [];
    let values = [];
    for (let i = 0; i < graphInfo.data.length; i++) {
      labels[i] = graphInfo.data[i].label;
      values[i] = graphInfo.data[i].value;
    }
    return {
      labels,
      values,
    };
  };

  useEffect(() => {
    if (graphInfo) {
      setDataArray([...dataArray, graphInfo]);
      setGraphData([...graphData, pushGraphData()]);
    }
  }, [graphInfo]);

  useEffect(() => {
    //console.log(graphData);
  }, [graphData]);

  const generateDatasets = () => {
    let type, data, label, backgroundColor;

    type = graphInfo.graphKind.toLowerCase();
    data = graphData[0].values;
    label = graphInfo.title;
    backgroundColor = `rgba(${color},0.4)`;

    return {
      type,
      data,
      label,
      backgroundColor,
    };
  };

  const color = `192, 192, 192`;

  const datasets = {
    labels: graphData[0].labels,
    datasets: [generateDatasets()],
  };

  return (
    <>
      <Bar data={datasets} type={graphInfo.graphKind} />
    </>
  );
};

export default PreviewBlend;
