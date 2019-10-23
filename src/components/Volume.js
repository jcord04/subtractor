import React from "react";
import { Knob } from 'react-rotary-knob';
import Tone from "tone";

class Volume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: this.props.volume,
      mute : false
    };

    // Create new Tone Volume instance
    this.volume = new Tone.Volume(this.state);
  }

  // Push the reverb object to parent as soon as ther component is mounted
  componentDidMount() {
    this.props.pushToneComponent(this.volume);
  }

  // Push the reverb object to parent whenever the state changes
  componentDidUpdate() {
    this.props.pushToneComponent(this.volume);
  }

  // Handle a Volume change
  handleVolumeChange = (val) => {
    this.setState({ volume: ( val ) })
    this.volume.value = this.state.volume;
  }

  render() {
    const { volume } = this.state;

    return (
      <div style={{ width: '50px' }}>
        <div className='knob' style={{ width: '50px' }}>
          <Knob onChange={this.handleVolumeChange}
            clampMin={50}
            clampMax={310}
            step={10}
            rotateDegrees={180}
            min={-75}
            max={-5}
            value={ volume }
          />
          <span className='element-title'>MIX</span>
        </div>
      </div>
    );
  }
}

export default Volume;