import React from "react";
import Tone from "tone";
import Slider from 'react-rangeslider'
import { Knob } from 'react-rotary-knob';
import sineIcon from '../images/oscillator_sine.png';
import sawIcon from '../images/oscillator_saw.png';
import squareIcon from '../images/oscillator_square.png';
import triangleIcon from '../images/oscillator_triangle.png';

class MonoOscillator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detune : this.props.cents,
      oscillator : {
        type : this.props.waveform,
      },
      filter : {
        Q : 1,
        type : 'lowpass',
        rolloff : -24
      },
      envelope : {
        attack : 0.0001,
        decay : 0.9,
        sustain : 0.22,
        release : 0.1,
      },
      filterEnvelope : {
        attack : 0.0001,
        decay : 0.2,
        sustain : 0.1,
        release : 0.1,
        baseFrequency : 200,
        octaves : 7,
        exponent : 2
      }
    };

    // Default Osc Types
    this.ocsTypes = {
      sawtooth: { value: 'sawtooth', name: 'Sawtooth', img: sawIcon },
      sine: { value: 'sine', name: 'Sine', img: sineIcon },
      square: { value: 'square', name: 'Square', img: squareIcon },
      triangle: { value: 'triangle', name: 'Triangle', img: triangleIcon }
    };

    // Create new Tone.MonoSynth
    this.monoSynth = new Tone.MonoSynth(this.state);
  }

  // Push the oscillator object to parent as soon as ther component is mounted
  componentDidMount() {
    this.props.pushToneComponent(this.monoSynth);
  }

  // Push the oscillator object to parent whenever the state changes
  componentDidUpdate() {
    this.props.pushToneComponent(this.monoSynth);
  }

  // Handle Cent down change
  handleCentDown = () => {
    if (this.state.detune > -50) {
      let centCal = this.state.detune - 5;
      this.setState({ detune: centCal});
      this.monoSynth.oscillator.detune.value = this.state.detune
    }
  }

  // Handle Cent up change
  handleCentUp = () => {
    if (this.state.detune < 50) {
      let centCal = this.state.detune + 5;
      this.setState({ detune: centCal});
      this.monoSynth.oscillator.detune.value = this.state.detune
    }
  }

  // Handle amp attack change
  handleAmpAttackChange = (val) => {
    var envelope = {...this.state.envelope}
    envelope.attack = val;
    this.setState({ envelope })
    this.monoSynth.envelope.attack = this.state.envelope.attack;
  }

  // Handle amp decay change
  handleAmpDecayChange = (val) => {
    var envelope = {...this.state.envelope}
    envelope.decay = val;
    this.setState({ envelope })
    this.monoSynth.envelope.decay = this.state.envelope.decay;
  }

  // Handle amp sustain change
  handleAmpSustainChange = (val) => {
    var envelope = {...this.state.envelope}
    envelope.sustain = val;
    this.setState({ envelope })
    this.monoSynth.envelope.sustain = this.state.envelope.sustain;
  }

  // Handle amp release change
  handleAmpReleaseChange = (val) => {
    var envelope = {...this.state.envelope}
    envelope.release = val;
    this.setState({ envelope })
    this.monoSynth.envelope.release = this.state.envelope.release;
  }

  // Handle filter attack change
  handleFilterAttackChange = (val) => {
    var filterEnvelope = {...this.state.filterEnvelope}
    filterEnvelope.attack = val;
    this.setState({ filterEnvelope })
    this.monoSynth.filterEnvelope.attack = this.state.filterEnvelope.attack;
  }

  // Handle filter decay change
  handleFilterDecayChange = (val) => {
    var filterEnvelope = {...this.state.filterEnvelope}
    filterEnvelope.decay = val;
    this.setState({ filterEnvelope })
    this.monoSynth.filterEnvelope.decay = this.state.filterEnvelope.decay;
  }

  // Handle filter sustain change
  handleFilterSustainChange = (val) => {
    var filterEnvelope = {...this.state.filterEnvelope}
    filterEnvelope.sustain = val;
    this.setState({ filterEnvelope })
    this.monoSynth.filterEnvelope.sustain = this.state.filterEnvelope.sustain;
  }

  // Handle filter release change
  handleFilterReleaseChange = (val) => {
    var filterEnvelope = {...this.state.filterEnvelope}
    filterEnvelope.release = val;
    this.setState({ filterEnvelope })
    this.monoSynth.filterEnvelope.release = this.state.filterEnvelope.release;
  }

  // Handle osc type change up
  handlePreviousWaveChange = () => {
    
    // Get keys for filter types
    const keys = Object.keys(this.ocsTypes);

    // Get current filter key
    const currentKey = parseInt(keys.indexOf(this.state.oscillator.type));

    // Get the amount of items
    const keyCount = parseInt(Object.keys(this.ocsTypes).length) - 1;

    // If there is a next item, use it
    if (currentKey > 0) {
      this.setState({ oscillator: { type: keys[currentKey - 1] }});
    }
    // Otherwise restart from begining
    else {
      this.setState({ oscillator: { type: keys[keyCount] }});
    }
    this.monoSynth.oscillator.type = this.state.oscillator.type;
  }

  // Handle osc type change down
  handleNextWaveChange = () => {
    
    // Get keys for filter types
    const keys = Object.keys(this.ocsTypes);

    // Get current filter key
    const currentKey = parseInt(keys.indexOf(this.state.oscillator.type));
    
    // Get the amount of items
    const keyCount = parseInt(Object.keys(this.ocsTypes).length) - 1;

    // If there is a next item, use it
    if (currentKey < keyCount) {
      this.setState({ oscillator: { type: keys[currentKey + 1] }});
    }
    // Otherwise restart from begining
    else {
      this.setState({ oscillator: { type: keys[0] }});
    }
    this.monoSynth.oscillator.type = this.state.oscillator.type;
  }

  render() {
    return (
      <>
        <div className='osc'>
          <div className='wave-display'>
            <span  className='element-title'>WAVE</span>
            <img className='waveform' src={ this.ocsTypes[this.state.oscillator.type].img } />
            <div>
              <button onClick={this.handlePreviousWaveChange}>&lt;</button>
              <button onClick={this.handleNextWaveChange}>&gt;</button>
            </div>
          </div>
          <div className='cent-display'>
            <span  className='element-title'>CENTS</span>
            <p className='cent-amt'>{ this.state.detune }</p>
            <div>
              <button onClick={this.handleCentDown}>&lt;</button>
              <button onClick={this.handleCentUp}>&gt;</button>
            </div>
          </div>
        </div>
        <div className='slider-group'>
        <span className='element-title'>AMP ENVELOPE</span>
          <div className='slider'>
            <Slider
              min={0}
              max={1}
              step={0.01}
              tooltip={false}
              value={this.state.envelope.attack}
              orientation='vertical'
              onChange={this.handleAmpAttackChange}
            />
            <span className='element-title'>A</span>
          </div>
          <div className='slider'>
            <Slider
              min={0}
              max={1}
              step={0.01}
              tooltip={false}
              value={this.state.envelope.decay}
              orientation='vertical'
              onChange={this.handleAmpDecayChange}
            />
            <span className='element-title'>D</span>
          </div>
          <div className='slider'>
            <Slider
              min={0}
              max={1}
              step={0.01}
              tooltip={false}
              value={this.state.envelope.sustain}
              orientation='vertical'
              onChange={this.handleAmpSustainChange}
            />
            <span className='element-title'>S</span>
          </div>
          <div className='slider'>
            <Slider
              min={0}
              max={1}
              step={0.01}
              tooltip={false}
              value={this.state.envelope.release}
              orientation='vertical'
              onChange={this.handleAmpReleaseChange}
            />
            <span className='element-title'>R</span>
          </div>
        </div>
        <div className='slider-group'>
          <span className='element-title'>FILTER ENVELOPE</span>
          <div className='slider'>
            <Slider
              min={0}
              max={1}
              step={0.01}
              tooltip={false}
              value={this.state.filterEnvelope.attack}
              orientation='vertical'
              onChange={this.handleFilterAttackChange}
            />
            <span className='element-title'>A</span>
          </div>
          <div className='slider'>
            <Slider
              min={0}
              max={1}
              step={0.01}
              tooltip={false}
              value={this.state.filterEnvelope.decay}
              orientation='vertical'
              onChange={this.handleFilterDecayChange}
            />
            <span className='element-title'>D</span>
          </div>
          <div className='slider'>
            <Slider
              min={0}
              max={1}
              step={0.01}
              tooltip={false}
              value={this.state.filterEnvelope.sustain}
              orientation='vertical'
              onChange={this.handleFilterSustainChange}
            />
            <span className='element-title'>S</span>
          </div>
          <div className='slider'>
            <Slider
              min={0}
              max={1}
              step={0.01}
              tooltip={false}
              value={this.state.filterEnvelope.release}
              orientation='vertical'
              onChange={this.handleFilterReleaseChange}
            />
            <span className='element-title'>R</span>
          </div>
        </div>
      </>
    );
  }
}

export default MonoOscillator;