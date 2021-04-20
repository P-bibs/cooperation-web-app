import React from "react";

const ControlView = (props) => {
  const updatePattern = (indexToSwap) => {
    const newPattern = props.pattern[props.instrumentIndex].map((a, i) =>
      i === indexToSwap ? 1 - a : a
    );
    props.ws.send(JSON.stringify({ type: "patternUpdate", data: newPattern }));
  };

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
            className={`h-auto w-14 p-2 bg-gray-400 flex flex-col items-center  justify-center self-start text-xs`}
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
            className="h-auto w-auto flex flex-col items-center justify-center bg-gray-700 box-content"
          >
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
    </>
  );
};

export default ControlView;
