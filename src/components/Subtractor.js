import React from "react";
import ReactDOM from "react-dom";
import Tone from "tone";
import MonoOscillator from './MonoOscillator';
import MultiFilter from './MultiFilter';
import PanVolume from './PanVolume';
import Reverb from './Reverb';
import Volume from './Volume';

class Subtractor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };

    // Set some Tone.js defaults
    Tone.context.latencyHint = 'fastest';
    Tone.context.lookAhead = 0.2;
    Tone.Transport.bpm.value = 138;
  }

  // Object for Osc1
  oscillator1ToneComponent = ( oscillator ) => { this.oscillator1 = oscillator; }

  // Object for Osc2
  oscillator2ToneComponent = ( oscillator ) => { this.oscillator2 = oscillator; }

  // Object for Multi Filter
  multiFilterToneComponent = ( filter ) => { this.multiFilter = filter; }

  // Object for panVolume1
  panVolume1ToneComponent = ( panVole ) => { this.panVolume1 = panVole; }

  // Object for panVolume1
  panVolume2ToneComponent = ( panVole ) => { this.panVolume2 = panVole; }

  // Object for reverb
  reverbToneComponent = ( reverb ) => { this.reverb = reverb; }

  // Object for Reverb Volume 
  volumeToneComponent = ( volume ) => { this.volumeReverb = volume; }

  // Play a sequence of notes
  play = () => {
    const notes = [
      "C2", "C3", "C4", "C2", "C3", "C4", "C2", "C3", "C4", "C2", "C3", "C4", "C2", "C3", "C4", "C2", "C3", 
      "C2", "C3", "C4", "C2", "C3", "C4", "C2", "C3", "C4", "D2", "D3", "F4", "D2", "D3", "F4", "D2", "D3",
      "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2",
      "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2",
      "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2",
      "D#2", "D#3", "G4", "D#2", "D#3", "G4", "D#2", "D#3", "F2", "F3", "A4", "F2", "F3", "A4", "F2", "F3",
      "G2", "G3", "A#4", "G2", "G3", "D5", "G2", "G3", "A#4", "G2", "G3", "D5", "G2", "G3", "A#4", "G2",
      "G2", "G3", "A#4", "G2", "G3", "D5","G2", "G3", "A#4", "G2", "G3", "D5","G2", "G3", "A#4", "G2", 
    ];

    // Connect the elements together
    this.oscillator1.chain(this.panVolume1, this.multiFilter);
    this.oscillator2.chain(this.panVolume2, this.multiFilter);
    this.oscillator1.detune.value = 20;

    // Split the output to master and reverb (like an audio bus)
    this.multiFilter.fan(this.reverb, Tone.Master);

    // Mix the Reverb to master
    this.reverb.chain(this.volumeReverb, Tone.Master);

    // Grab self
    const self = this;

    // Create a new sequence with the synth and notes
    const synthPart = new Tone.Sequence(
      function(time, note) {
        self.oscillator1.triggerAttackRelease(note, '16n');
        self.oscillator2.triggerAttackRelease(note, '16n');
      },
      notes,
      "16n"
    );

    Tone.Transport.on("start", function (time) {
      synthPart.start();
    });

    Tone.Transport.on("stop", function (time) {
      synthPart.stop();
    });
  }


  handlePlayStop = () => {
    if (this.state.playing) {
      this.setState({ playing: false });
      Tone.Transport.stop();
    }
    else {
      this.setState({ playing: true });
      Tone.Transport.start();
      this.play();
    }
  }

  // Render the DOM
  render() {
    return (
      <>
        <div className='subtractor'>
          <div className='main-panel'>
            <div className='synth-group'>
              <p className='synth-name'>OSCILLATOR 1</p>
              <MonoOscillator waveform={'sawtooth'} cents={20} pushToneComponent={this.oscillator1ToneComponent}/>
              <PanVolume pan={-0.45} pushToneComponent={this.panVolume1ToneComponent} />
            </div>
            <div className='synth-group'>
              <p className='synth-name'>OSCILLATOR 2</p>
              <MonoOscillator waveform={'sawtooth'} cents={-5} pushToneComponent={this.oscillator2ToneComponent}/>
              <PanVolume pan={0.45} pushToneComponent={this.panVolume2ToneComponent} />
            </div>
          </div>
          <div className='fx-panel'>
            <MultiFilter pushToneComponent={this.multiFilterToneComponent}/>
            <div className='reverb-group'>
              <span className='element-title'>REVERB</span>
              <Reverb roomSize={0.55} pushToneComponent={this.reverbToneComponent} />
              <Volume volume={-12} pushToneComponent={this.volumeToneComponent} />
            </div>
            <button className='play-button' onClick={this.handlePlayStop}>{ this.state.playing ? 'Stop' : 'Play' }</button>
          </div>
        </div>
      </>
    );
  }
}

export default Subtractor;
