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
    key: 'feet',
    text: 'feets (ft)',
    value: 'feet',
  },
  {
    key: 'miles',
    text: 'miles (ml)',
    value: 'mile',
  },
]

function getAllBaseOptions(){
  return weightOptions.concat(lengthOptions);
}

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        baseUnitOption: null,
        AllBaseOptions: getAllBaseOptions(),
        AllTargetOptions: null,
      }; 
      this.handleChange = this.handleChange.bind(this);
      this.getBaseUnitOption = this.getBaseUnitOption.bind(this);
      this.getAllTargetOptions = this.getAllTargetOptions.bind(this);
  }

  getBaseUnitOption(text){
    let i=0;
    while(this.state.AllBaseOptions[i].text !== text){
      i++;
    }
    return i;
  }

  getAllTargetOptions(text){
    
    let arr=[];
    let found = false;
    //search text in the weight options and return a new array not containing text
    weightOptions.forEach(function(wo){
      if(wo.text !== text){
        arr.push(wo);
      } else {
        found = true;
      }
    });
    if(found) return arr;

    arr =[];
    //search text in the length options and return a new array not containing text
    lengthOptions.forEach(function(wo){
      if(wo.text !== text){
        arr.push(wo);
      } else {
        found = true;
      }
    });
    if(found) return arr;
  }

  handleChange(event) {
    let text = event.target.textContent;
    console.log('text ', text);
    this.setState({baseUnitOption: this.getBaseUnitOption(text),
      AllTargetOptions: this.getAllTargetOptions(text)
      });
  }


  render(){
  return (
    <div>
      <Segment.Group horizontal>
        <Segment>
          <Dropdown placeholder='Base Unit' 
            fluid
            selection
            options = {this.state.AllBaseOptions}
            onChange={this.handleChange}
            />
        </Segment>
        <Segment>
        <Dropdown placeholder='Convert to' 
          fluid 
          multiple selection 
          options = {this.state.AllTargetOptions}/>
        </Segment>
      </Segment.Group>
      <Segment.Group horizontal>
        <Segment>
          <Input
            label={{ basic: true, 
              content: this.state.baseUnitOption !== null ? this.state.AllBaseOptions[this.state.baseUnitOption].key : '' }}
              // content: ''}}
            labelPosition='right'
            placeholder='Enter amount to convert...'
          />
        </Segment>
      <Segment>
        <Input
          label={{ basic: true, content: '' }}
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
