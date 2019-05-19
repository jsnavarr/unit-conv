import React, {Component} from 'react';
import {Segment, Input, Dropdown} from 'semantic-ui-react';

import './App.css';

const weightOptions = [
  {
    key: 'pounds',
    text: 'pounds (lb)',
    value: 'pound',
  },
  {
    key: 'kilograms',
    text: 'kilograms (kg)',
    value: 'kilogram',
  },
]
const lengthOptions = [
  {
    key: 'centimeters',
    text: 'centimeters (cm)',
    value: 'centimeter',
  },
  {
    key: 'meters',
    text: 'meters (m)',
    value: 'meter',
  },
  {
    key: 'kilometers',
    text: 'kilometers (km)',
    value: 'kilometer',
  },
  {
    key: 'inches',
    text: 'inches',
    value: 'inche',
  },
  {
    key: 'feets',
    text: 'feets (ft)',
    value: 'feet',
  },
  {
    key: 'miles',
    text: 'miles (ml)',
    value: 'mile',
  },
]

function getAllOptions(){
  return weightOptions.concat(lengthOptions);
}

// function App() {
class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        baseUnitValue: '',
      }; 
      this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({baseUnitValue: event.target.value});
    console.log('hola', event.target)
  }
  render(){
  return (
    <div>
      <Segment.Group horizontal>
        <Segment>
          <Dropdown placeholder='Base Unit' 
            fluid
            selection
            options = {getAllOptions()}
            value={this.state.baseUnitValue}
            onChange={this.handleChange}
            />
        </Segment>
        <Segment>
        <Dropdown placeholder='Convert to' 
          fluid 
          multiple selection 
          options = {[]}/>
        </Segment>
      </Segment.Group>
      <Segment.Group horizontal>
        <Segment>
          <Input
            label={{ basic: true, content: 'kg' }}
            labelPosition='right'
            placeholder='Enter amount to convert...'
          />
        </Segment>
      <Segment>
        <Input
          label={{ basic: true, content: 'kg' }}
          labelPosition='right'
          placeholder='Enter amount to convert...'
        />
      </Segment>
      </Segment.Group>
    </div>
  );
  }
}

export default App;
