import React from "react";
import PreviewBar from "./preGraphKind/Bar";
import PreviewLine from "./preGraphKind/Line";
import PreviewPie from "./preGraphKind/Pie";
import PreviewRadar from "./preGraphKind/Radar";
import PreviewScatter from "./preGraphKind/Scatter";

const PreviewGraph = ({ graphInfo, inputData }) => {
  const kind = graphInfo.graphKind;

  return (
    <div>
      {(() => {
        switch (kind) {
          case "BAR":
            return <PreviewBar graphInfo={graphInfo} inputData={inputData} />;

          case "LINE":
            return <PreviewLine graphInfo={graphInfo} inputData={inputData} />;

          case "PIE":
            return <PreviewPie graphInfo={graphInfo} inputData={inputData} />;

          case "RADAR":
            return <PreviewRadar graphInfo={graphInfo} inputData={inputData} />;

          case "SCATTER":
            return (
              <PreviewScatter graphInfo={graphInfo} inputData={inputData} />
            );
        }
      })()}
    </div>
  );
};

export default PreviewGraph;
