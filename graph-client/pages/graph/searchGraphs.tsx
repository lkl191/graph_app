import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SEARCH_GRAPHS } from "../../components/graphql/query";
import ShowGraphs from "../../components/showGraphs";

const SearchGraphs = () => {
  const [searchWord, setSearchWord] = useState("");
  const [getGraph, { data }] = useLazyQuery(SEARCH_GRAPHS);

  const router = useRouter();
  const word = router.query.word;

  useEffect(() => {
    getGraph({
      variables: { searchWord: word },
    });
  }, [word]);

  let props;
  if (data) {
    props = data.searchGraphs;
  }

  return (
    <div className="container">
      <input
        type="text"
        className="input_text search_input"
        placeholder="Search Graph"
        onChange={(e) => setSearchWord(e.target.value)}
      />

      <Link href={`/graph/searchGraphs?word=${searchWord}`}>
        <button className="button">検索</button>
      </Link>
      {props && (
        <>
        <p>"{word}"の検索結果 {props.length}件</p>
          <ShowGraphs props={props} />
        </>
      )}
    </div>
  );
};

export default SearchGraphs;
