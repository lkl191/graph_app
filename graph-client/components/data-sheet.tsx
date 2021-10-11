import React from "react";
import ReactDataSheet from "react-datasheet";

import { putValue } from "./graphKind/utils/data";
import "react-datasheet/lib/react-datasheet.css";

const DataSheet = ({ props }) => {
  const propsData = props.data;
  const { labelArray, valueArray } = putValue(propsData);

  const data = [labelArray, valueArray];
  return (
    <div
      style={{
        margin: "50px auto",
        maxWidth: "800px",
      }}
    >
      <ReactDataSheet 
      data={data}
      valueRenderer={(cell) => cell.value}
      className="sheet-container "
      />
    </div>
  );
};

export default DataSheet;