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
        selTargetOptions:[],
      }; 
      this.handleBaseUnitChange = this.handleBaseUnitChange.bind(this);
      this.getBaseUnitOption = this.getBaseUnitOption.bind(this);
      this.getAllTargetOptions = this.getAllTargetOptions.bind(this);
      this.handleTargetUnitChange = this.handleTargetUnitChange.bind(this);
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

  handleBaseUnitChange(event) {
    let text = event.target.textContent;
    // console.log('text ', text);
    this.setState({baseUnitOption: this.getBaseUnitOption(text),
      AllTargetOptions: this.getAllTargetOptions(text)
      });
  }

  handleTargetUnitChange(event) {
    var selArr=[];
    var sel = document.getElementById("convert-to-dropdown").querySelectorAll("a");  
    //if text then an option from the dropdown menu was selected
    if(event.target.textContent){
      //get the options selected but it does not have the last one which is 'text'
      for(let i = 0; i<sel.length; i++){
        console.log('i ', i, ' ', sel[i].textContent);
        selArr.push(sel[i].textContent)
      }
      selArr.push(event.target.textContent);
      this.setState({selTargetOptions: selArr});
    } else { //an option was unselected
      selArr = this.state.selTargetOptions; //all the previous selected options
      let idx =selArr.indexOf(event.target.parentNode.textContent); //this is the just removed option
      selArr.splice(idx, 1); //remove the option
      this.setState({selTargetOptions: selArr});
    }
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
            onChange={this.handleBaseUnitChange}
            />
        </Segment>
        <Segment>
        <Dropdown id = "convert-to-dropdown" placeholder='Convert to' 
          fluid 
          multiple selection 
          options = {this.state.AllTargetOptions}
          onChange = {this.handleTargetUnitChange}/>
        </Segment>
      </Segment.Group>
      <Segment.Group horizontal>
        <Segment>
          <Input
            label={{ basic: true, 
              content: this.state.baseUnitOption !== null ? this.state.AllBaseOptions[this.state.baseUnitOption].key : '' }}
            labelPosition='right'
            placeholder='Enter amount to convert...'
          />
        </Segment>
      <Segment>
        {/* {this.state..map((guess, idx) => */}
        <Input
          label={{ basic: true, 
            content: this.state.AllTargetOptions !== null ? this.state.AllBaseOptions[this.state.baseUnitOption].key : '' }}
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
