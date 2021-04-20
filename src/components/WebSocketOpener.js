import ControlView from "./ControlView";
import React from "react";
import { Button } from "@material-ui/core";

export default class WebSocketOpener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
      readyToGo: false,
      instrument: "",
      instrumentIndex: null,
      barRestart: false,
      warn: false,
      pattern: [],
    };
  }

  attemptConnection() {
    let port = "";
    let address = `wss://cooperation.ngrok.io:${port}`;
    console.log("attempting connection at " + address);
    let ws = new WebSocket(address);

    this.setState({
      ws: ws,
    });

    ws.onopen = (event) => {
      console.log("Socket opened");
    };

    ws.onmessage = (event) => {
      let deserialized = JSON.parse(event.data);
      if (deserialized.type === "instrument") {
        this.setState({
          instrumentIndex: deserialized.data[0],
          instrument: deserialized.data[1],
        });
      } else if (deserialized.type === "patternUpdate") {
        this.setState({ pattern: deserialized.data, readyToGo: true });
      } else if (deserialized.type === "barRestart") {
        this.setState({ barRestart: true }, () => {
          setTimeout(() => {
            this.setState({ barRestart: false });
          }, 200);
        });
      } else if (deserialized.type === "warn") {
        this.setState({ warn: deserialized.data });
      } else {
        console.log("UNRESOLVED MESSAGE");
        console.log(deserialized);
      }
    };

    ws.onclose = (event) => {
      console.log("SOCKET CLOSED");
      this.setState({
        readyToGo: false,
      });
    };

    ws.onerror = (event) => {
      console.group();
      console.error("SOCKET ERROR");
      console.log(event);
      console.groupEnd();
    };

    window.onbeforeunload = () => {
      ws.close();
    };
  }

  render() {
    if (!this.state.readyToGo) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1>Would you like to connect?</h1>
          <Button variant="contained" onClick={() => this.attemptConnection()}>
            Connect
          </Button>
        </div>
      );
    } else {
      return (
        <ControlView
          ws={this.state.ws}
          instrumentIndex={this.state.instrumentIndex}
          instrument={this.state.instrument}
          pattern={this.state.pattern}
          barRestart={this.state.barRestart}
          warn={this.state.warn}
        />
      );
    }
  }
}
