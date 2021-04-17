import React from "react";

export default class ControlView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pattern: [false, false, false, false, false, false, false, false],
    };
  }

  updatePattern(indexToSwap) {
    this.setState(
      (prevState, props) => ({
        pattern: prevState.pattern.map((a, j) => (indexToSwap === j ? !a : a)),
      }),
      () => {
        this.props.ws.send(
          JSON.stringify({ type: "patternUpdate", data: this.state.pattern })
        );
      }
    );
  }

  render() {
    return (
      <>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-lg m-3">
            You are currently controlling:{" "}
            <span className="font-bold">{this.props.instrument}</span>
          </h1>
          <div
            id="matrix-control"
            className="h-10 w-auto p-2 flex flex-row items-center justify-center bg-gray-700 box-content space-x-2"
          >
            {this.state.pattern.map((x, i) => {
              return (
                <div
                  className={`h-10 w-10 rounded-full cursor-pointer ${
                    x ? "bg-blue-300" : "bg-gray-500"
                  }`}
                  onClick={() => this.updatePattern(i)}
                ></div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
