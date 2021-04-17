import ControlView from "./ControlView";
import React from "react";
import { Button } from "@material-ui/core";

export default class WebSocketOpener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
      websocketOpen: false,
    };
  }

  attemptConnection() {
    let port = "7474";
    let address = `wss://cooperation.ngrok.io:${port}`;
    console.log("attempting connection at " + address);
    let ws = new WebSocket(address);

    this.setState({
      ws: ws,
    });

    ws.onopen = (event) => {
      console.log("Socket opened");
      this.setState({
        websocketOpen: true,
      });
    };

    ws.onmessage = (event) => {};

    ws.onclose = (event) => {
      console.log("SOCKET CLOSED");
      this.setState({
        websocketOpen: false,
      });
    };

    ws.onerror = (event) => {
      console.group();
      console.error("SOCKET ERROR");
      console.log(event);
      console.groupEnd();
    };
  }

  render() {
    if (!this.state.websocketOpen) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1>Would you like to connect?</h1>
          <Button variant="contained" onClick={() => this.attemptConnection()}>
            Connect
          </Button>
        </div>
      );
    } else {
      return <ControlView ws={this.state.websocket} />;
    }
  }
}
