import React from "react";

const Instructions = (props) => {
  return (
    <>
      <div>
        Once you connect, you'll be assigned an instrument. Your assigned
        instrument will be displayed as a message on the screen.
      </div>
      <br />
      <div>
        You'll also see a grid of lights much like the "matrix control" object
        from Max. This matrix control represents a drum-machine-like sequencer.
        One row of the matrix will be highlighted. This is the row that
        corresponds to your instrument. You can click the lights in your row to
        turn them on and off, which corresponds to toggling whether or not your
        instrument will sound for a certain beat of that sequence.
      </div>
      <br />
      <div>
        After some time, you'll see a warning appear that will tell you your
        instrument is about to change. Roughly 10 seconds later, your instrument
        will change and the matrix will be wiped. You'll start by getting a
        drum, then a bass synth, then a lead synth.
      </div>
    </>
  );
};

export default Instructions;
