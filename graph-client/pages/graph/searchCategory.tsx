import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { GRAPH_CATEGORY } from "../../components/graphql/query";
import ShowGraphs from "../../components/showGraphs";

const SearchCate = () => {
  const [getGraph, { data }] = useLazyQuery(GRAPH_CATEGORY);

  const router = useRouter();
  const category = router.query.category;

  useEffect(() => {
    if (category) {
      getGraph({
        variables: { category: category },
      });
    }
  }, [category]);

  if (data) {
    const props = data.graphCate;
    return (
      <div className="container">
        <p>
          "{category}"の検索結果 {props.length}件
        </p>
        <ShowGraphs props={props} />
      </div>
    );
  } else {
    return <div className="container">Loading...</div>;
  }
};

export default SearchCate;
