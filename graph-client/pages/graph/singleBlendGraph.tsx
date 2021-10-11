import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useAuthState } from "react-firebase-hooks/auth";
import { DeleteBlendGraphProps } from "../../components/deleteGraph";
import { SINGLE_BLEND_GRAPH } from "../../components/graphql/query";
import { Auth } from "../../context/auth";
import { DatasetsType } from "../../types/types";

const DeleteModal = () => {
  const router = useRouter();
  const id = router.query.id;
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow((props) => !props);
  };
  return (
    <span>
      <button className="button delete_button" onClick={openModal}>
        削除
      </button>
      <DeleteBlendGraphProps id={id} show={show} setShow={setShow} />
    </span>
  );
};

const Content = ({ datasets }) => {
  return (
    <>
      <Bar data={datasets} type="bar" />
    </>
  );
};

const HostContent = ({ datasets }) => {
  return (
    <>
      <DeleteModal />
      <Bar data={datasets} type="bar" />
    </>
  );
};

const SingleBlendGraph = () => {
  let userExact = false;
  const [user] = useAuthState(Auth);

  const router = useRouter();
  const id = router.query.id;

  const [getBlendGraph, { error, data }] = useLazyQuery(SINGLE_BLEND_GRAPH, {
    variables: { id },
  });
  if (error) return <p>error... {error.message}</p>;
  useEffect(() => {
    if (id) {
      getBlendGraph();
    }
  }, [id]);

  let props;
  if (data) {
    props = data.singleBlendGraph;
    if (user && props.userId) {
      if (user.uid == props.userId) {
        userExact = true;
      }
    }
    const genLabels = () => {
      let labels = [];
      for (let i = 0; i < props.graphs[0].data.length; i++) {
        labels[i] = props.graphs[0].data[i].label;
      }
      return labels;
    };

    const genDatasets = () => {
      let datasets = [];

      const graph = props.graphs;

      for (let i = 0; i < graph.length; i++) {
        let color = graph[i].color;
        if (!color) {
          color = "75,192,192";
        }
        let values = [];
        for (let ii = 0; ii < graph[i].data.length; ii++) {
          values[ii] = graph[i].data[ii].value;
        }
        const newData: DatasetsType = {
          label: graph[i].title,
          type: graph[i].graphKind.toLowerCase(),
          backgroundColor: `rgba(${color},0.4)`,
          borderColor: `rgba(${color},1)`,
          pointBorderColor: `rgba(${color},1)`,
          pointHoverBackgroundColor: `rgba(${color},1)`,
          data: values,
        };
        datasets.push(newData);
      }

      return datasets;
    };

    let datasets;
    datasets = {
      labels: genLabels(),
      datasets: genDatasets(),
    };

    return (
      <div className="container">
        <h1>{props.title}</h1>
        {userExact ? (
          <HostContent datasets={datasets} />
        ) : (
          <Content datasets={datasets} />
        )}
      </div>
    );
  } else {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }
};

export default SingleBlendGraph;
