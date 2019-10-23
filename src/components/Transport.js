import React from "react";
import ReactDOM from "react-dom";
import Tone, { Transport, Sampler } from "tone";
import Synth from "./Synth";

import Looper from './Looper'
import A1 from "../sounds/ATE Kick - 002.wav";


class Transporter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 138,
      isLoaded: false
    };
    this.transportStart = this.transportStart.bind(this);


    this.synth = new Tone.MonoSynth({
      "oscillator" : {
        "type" : "sawtooth"
     },
     "envelope" : {
       "attack" : 0.1
     }
    }).toMaster();
  }

  handlePlay = () => {
    this.sampler.triggerAttack("A1");
  }

  transportStart() {

    const synth = this.synth;

    Tone.Transport.scheduleRepeat(function() {
      synth.triggerAttackRelease("C4", "8n");
    }, "4n");


  //     //   setTimeout(() => {
  // //     Tone.Transport.stop();
  // //   }, 5000);
  //   //play a note every eighth note starting from the first measure
  //   Tone.Transport.scheduleRepeat(function() {
  //     //this.handlePlay();
  //     //console.log(this);
  //     //this.props.handlePlay();
  //   }, "4n");

    
    Tone.Transport.bpm.value = 138; 
    Tone.Transport.start();
    

  }

  render() {
    const { isLoaded } = this.state;
    return (
      <div>
        <Synth/>
        <button onClick={this.transportStart}>
          Play
        </button>
      </div>
    );
  }
}

export default Transporter;