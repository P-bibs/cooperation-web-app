import React from "react";

let zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

const ControlView = (props) => {
  const updatePattern = (indexToSwap) => {
    const newPattern = props.pattern[props.instrumentIndex].map((a, i) =>
      i === indexToSwap ? 1 - a : a
    );
    props.ws.send(JSON.stringify({ type: "patternUpdate", data: newPattern }));
  };

  const instrumentNames = props.instrument.includes("Bass")
    ? [
        "Bass (note 1)",
        "Bass (note 2)",
        "Bass (note 3)",
        "Bass (note 4)",
        "Bass (note 5)",
        "Bass (note 6)",
      ]
    : props.instrument.includes("Melody")
    ? [
        "Melody (note 1)",
        "Melody (note 2)",
        "Melody (note 3)",
        "Melody (note 4)",
        "Melody (note 5)",
        "Melody (note 6)",
      ]
    : ["Kick Drum", "Snare", "Closed Hi-Hat", "Cymbal", "Clap", "Rimshot"];

  return (
    <>
      <div className="w-auto h-full flex flex-col items-center justify-center">
        <h1 className="text-lg m-3 mb-0">
          You are currently controlling:{" "}
          <span className="font-bold">{props.instrument}</span>
        </h1>

        <h2 className="h-5 m-5 mt-0 text-red-700">
          {props.warn ? "!! Your instrument is about to change !!" : ""}
        </h2>

        <div id="matrix-control-container">
          <div
            style={{ marginLeft: "160px" }}
            className={`h-auto w-14 p-2 bg-gray-400 flex flex-col items-center  justify-center self-start text-xs shadow rounded-t-sm`}
          >
            Beat 1
            <div
              className={`h-9 w-9 rounded-full ${
                props.barRestart ? "bg-yellow-300" : "bg-gray-100"
              }`}
            ></div>
          </div>
          <div
            id="matrix-control"
            className="h-auto w-auto flex flex-row items-center justify-center  box-content"
          >
            <div className="flex flex-col items-center justify-center">
              {zip(instrumentNames, props.pattern).map(
                ([name, row], rowIndex) => (
                  <div
                    id={`instrument-row-${rowIndex}`}
                    className="h-10 w-36 p-2 flex flex-row items-center justify-end box-content"
                  >
                    {name}
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-700 shadow rounded-sm">
              {props.pattern.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`p-2 flex flex-row items-center justify-center space-x-2 ${
                    rowIndex === props.instrumentIndex ? "bg-yellow-300" : ""
                  }`}
                >
                  {row.map((col, colIndex) =>
                    rowIndex === props.instrumentIndex ? (
                      <div
                        key={colIndex}
                        className={`h-10 w-10 rounded-full cursor-pointer ${
                          col === 1 ? "bg-blue-300" : "bg-gray-500"
                        }`}
                        onClick={() => updatePattern(colIndex)}
                      ></div>
                    ) : (
                      <div
                        key={colIndex}
                        className={`h-10 w-10 rounded-full ${
                          col === 1 ? "bg-blue-300" : "bg-gray-500"
                        }`}
                      ></div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlView;
