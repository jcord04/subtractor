import React from "react";
// Using an ES6 transpiler like Babel
import Slider from 'react-rangeslider'
import Tone from "tone";

class MultiFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type : 'lowpass',
      frequency : 7000,
      rolloff : -12,
      Q : 1,
      gain : 0,
      filterType: 'LP24'
    };

    // List of avialable filters
    this.filterTypes = {
      LP24: { name: 'LP24', value: 'lowpass', rolloff: -24 },
      LP12: { name: 'LP12', value: 'lowpass', rolloff: -12 },
      BP12: { name: 'BP12', value: 'bandpass', rolloff: -12 },
      HP12: { name: 'HP12', value: 'highpass', rolloff: -12 },
      NOTCH: { name: 'NOTCH', value: 'notch', rolloff: -12 } 
    };

    // Create new Tone Filter instance
    this.filter = new Tone.Filter(this.state);
  }

  // Push the filter object to parent as soon as ther component is mounted
  componentDidMount() {
    this.props.pushToneComponent(this.filter);
  }

  // Push the filter object to parent whenever the state changes
  componentDidUpdate() {
    this.props.pushToneComponent(this.filter);
  }

  // Handle a frequency change
  handleFreqChange = value => {
    this.setState({ frequency: value });
    this.filter.frequency.value = this.state.frequency;
  };

  // Handle a Gain change
  handleGainChange = value => {
    this.setState({ gain: value });
    this.filter.gain.value = this.state.frequency;
  };

  // Handle a type change
  handleTypeChange = () => {
    
    // Get keys for filter types
    const keys = Object.keys(this.filterTypes);

    // Get current filter key
    const currentKey = parseInt(keys.indexOf(this.state.filterType));

    // Get the amount of items
    const keyCount = parseInt(Object.keys(this.filterTypes).length) - 1;

    // If there is a next item, use it
    if (currentKey < keyCount) {
      this.setState({ filterType: keys[currentKey + 1],  });
    }
    // Otherwise restart from begining
    else {
      this.setState({ filterType: keys[0], type: keys[0] });
    }

    // Update the filter type
    this.filter.type = this.filterTypes[this.state.filterType].value;
    this.setState({ type: this.filterTypes[this.state.filterType].value });
    this.filter.rolloff = this.filterTypes[this.state.filterType].rolloff;
    this.setState({ rolloff: this.filterTypes[this.state.filterType].rolloff });
  };
  

  render() {
    const { frequency, gain, filterType } = this.state;

    return (
      <div className='filter-group'>
        <div className='filter-silders'>
          <span className='element-title'>FILTER</span>
          <div className='slider'>
            <Slider style={{ backgroundColor: 'blue'}}
              min={0}
              max={7000}
              value={frequency}
              orientation='vertical'
              // labels={verticalLabels}
              // handleLabel='Freq'
              onChange={this.handleFreqChange}
            />
            <span className='element-title'>FREQ</span>
          </div>
          <div className='slider'>
            <Slider
              min={0}
              max={20}
              value={gain}
              orientation='vertical'
              // labels={verticalLabels}
              // handleLabel='Q'
              onChange={this.handleGainChange}
            />
            <span className='element-title'>GAIN</span>
          </div>
        </div>
        <div className='filter-select'>
          {Object.keys(this.filterTypes).map((filterName, i) => {      
            return (
              <div key={i} className='filter-block'>
                <div className={ filterType == filterName ? 'filter-active' : null } ></div>
                <p className='name'>{ filterName }</p>
              </div>
              ) 
          })}
          <button className='type-button' onClick={this.handleTypeChange}>TYPE</button>
        </div>
      </div>
    );
  }
}

export default MultiFilter;