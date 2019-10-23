import React from "react";
import { Knob } from 'react-rotary-knob';
import Tone from "tone";

class PanVolume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan : this.props.pan,
      volume : -12,
      mute : false
    };

    // Create new Tone Filter instance
    this.panVol = new Tone.PanVol(this.state);
  }

  // Push the panVol object to parent as soon as ther component is mounted
  componentDidMount() {
    this.props.pushToneComponent(this.panVol);
  }

  // Push the panVol object to parent whenever the state changes
  componentDidUpdate() {
    this.props.pushToneComponent(this.panVol);
  }

  // Handle a Pan change
  handlePanChange = (val) => {
    this.setState({ pan: val })
    this.panVol.pan.value = this.state.pan;
  }

  // Handle a Volume change
  handleVolumeChange = (val) => {
    this.setState({ volume: val })
    this.panVol.volume.value = this.state.volume;
  }

  render() {
    const { pan, volume } = this.state;

    return (
      <div className='knob-group'>
        <span className='element-title'>OUTPUT</span>
        <div className='knob'>
          <Knob onChange={this.handlePanChange}
            clampMin={30}
            clampMax={330}
            step={10}
            rotateDegrees={180}
            min={-1}
            max={1}
            value={pan}
          />
          <span className='element-title'>PAN</span>
        </div>
        <div className='knob'>
          <Knob onChange={this.handleVolumeChange}
            clampMin={50}
            clampMax={310}
            step={10}
            rotateDegrees={180}
            min={-75}
            max={-12}
            value={volume}
          />
          <span className='element-title'>VOLUME</span>
        </div>
      </div>
    );
  }
}

export default PanVolume;