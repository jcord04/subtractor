import React from "react";
import { Knob } from 'react-rotary-knob';
import Tone from "tone";

class Reverb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomSize: this.props.roomSize,
      dampening: 3000,
    };

    // Create new Tone Freeverb instance & connect it to the volume
    this.reverb = new Tone.Freeverb(this.state);
  }

  // Push the reverb object to parent as soon as ther component is mounted
  componentDidMount() {
    this.props.pushToneComponent(this.reverb);
  }

  // Push the reverb object to parent whenever the state changes
  componentDidUpdate() {
    this.props.pushToneComponent(this.reverb);
  }

  // Handle a Pan change
  handleRoomSizeChange = (val) => {
    this.setState({ roomSize: ( val / 100 ) })
    this.reverb.roomSize.value = this.state.roomSize;
  }

  render() {
    const { roomSize } = this.state;

    return (
      <div style={{ width: '50px' }}>
        <div className='knob' style={{ width: '50px' }}>
          <Knob onChange={this.handleRoomSizeChange}
            clampMin={30}
            clampMax={330}
            step={10}
            rotateDegrees={180}
            min={0}
            max={100}
            value={ roomSize * 100 }
          />
          <span className='element-title'>SIZE</span>
        </div>
      </div>
    );
  }
}

export default Reverb;