import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { MY_BLEND_GRAPH, MY_GRAPHS } from "../components/graphql/query";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../context/auth";
import { IsGraphType } from "../types/types";
import ShowGraphs from "../components/showGraphs";

const UserGraph = () => {
  const [getMine, { data, error }] = useLazyQuery(MY_GRAPHS);
  const [user] = useAuthState(Auth);

  //更新で発火
  useEffect(() => {
    if (user) {
      getMine();
    }
  }, [user]);

  if (error) return <p>{error.message} </p>;
  if (data) {
    const props = data.myGraphs;
    return (
      <div className="container">
        <h2>My Graph</h2>
        <ShowGraphs props={props} />
        <Link href={`/graph/create-graph`}>
          <a>
            <div className="crt_graph">＋ グラフ作成</div>
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="container">
        <p>Loading</p>
      </div>
    );
  }
};

const UserBlendGraph = () => {
  const [getMine, { data, error }] = useLazyQuery(MY_BLEND_GRAPH);
  const [user] = useAuthState(Auth);

  //更新で発火
  useEffect(() => {
    if (user) {
      getMine();
    }
  }, [user]);
  if (error) return <p>{error.message} </p>;

  if (data) {
    const props = data.myBlendGraphs;
    return (
      <div className="container">
        <h1>MyBlendGraph</h1>
        {props.map((e) => (
          <div key={e.id}>
            <Link href={`/graph/singleBlendGraph?id=${e.id}`}>
              <a>
                <h3 className="graph-index">
                  <div className="flex">
                    <div>
                      <span className="graph_title">{e.title}</span>
                    </div>
                  </div>
                </h3>
              </a>
            </Link>
            <br></br>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="container">
        <p>Loading</p>
      </div>
    );
  }
};

const User = () => {
  const [change, setChange] = useState<IsGraphType>("NORMAL");
  const changeCreateGraph = (e) => {
    setChange(e.target.name);
  };

  return (
    <div className="container">
      <br></br>
      <button className="button" name="NORMAL" onClick={changeCreateGraph}>
        グラフ一覧
      </button>
      <button className="button" name="BLEND" onClick={changeCreateGraph}>
        複合グラフ一覧
      </button>
      <section>
        <ul>
          {(() => {
            switch (change) {
              case "NORMAL":
                return <UserGraph />;
              case "BLEND":
                return <UserBlendGraph />;
            }
          })()}
        </ul>
      </section>
    </div>
  );
};

export default User;
