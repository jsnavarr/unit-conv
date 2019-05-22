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
    console.log('text ', text);
    let i=0;
    while(i<this.state.AllBaseOptions.length && this.state.AllBaseOptions[i].text !== text){
      console.log('i ', i);
      i++;
    }
    if(i<this.state.AllBaseOptions.length)
      return i;
    return null;
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
    console.log(arr);
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
    console.log(arr);
    if(found) return arr;
  }

  handleBaseUnitChange(event) {
    let text = event.target.textContent;
    var baseUO = 0;
    console.log('text ', text);
    //if previously no option has been selected then text contains all the options
    //and baseUnit will keep its zero initialization value
    if(text.length < 20){
      baseUO = this.getBaseUnitOption(text); //get the option selected
    } else {
      text = this.state.AllBaseOptions[baseUO].text; //pounds (lb)
    }
      
    if(baseUO !== null) { //if an option was selected
      this.setState({baseUnitOption: baseUO,
        AllTargetOptions: this.getAllTargetOptions(text)
        });  
    }
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
    <div class="main">
      <Segment> To start select the base unit on the left and the target unit on the right:
        <Segment.Group horizontal>
          <Segment style={{width: "-webkit-fill-available", maxWidth: "400px"}}>
          <Input
            label={
              <Dropdown 
                style={{width: "auto", maxWidth: "fit-content"}}
                id="base-unit-dropdown" placeholder='Base Unit' 
                fluid
                selection
                options = {this.state.AllBaseOptions}
                onChange={this.handleBaseUnitChange}
              />}
            // label={{ basic: true, 
              // content: this.state.baseUnitOption !== null ? this.state.AllBaseOptions[this.state.baseUnitOption].key : '' }}
            labelPosition='right'
            placeholder='Enter amount to convert...'
          />

            {/* <Dropdown id="base-unit-dropdown" placeholder='Base Unit' 
              fluid
              selection
              options = {this.state.AllBaseOptions}
              onChange={this.handleBaseUnitChange}
              /> */}
          </Segment>
          <Segment style={{margin: "0 20px", width: "auto"}}>
          <Dropdown id = "convert-to-dropdown" placeholder='Convert to' 
            fluid 
            multiple selection 
            options = {this.state.AllTargetOptions}
            onChange = {this.handleTargetUnitChange}/>
          </Segment>
        </Segment.Group>
      </Segment>

      <Segment.Group>
        {/* <Segment floated='left' style={{width: "auto", maxWidth: "300px"}}>
          <Input
            label={<Dropdown id="base-unit-dropdown" placeholder='Base Unit' 
            fluid
            selection
            options = {this.state.AllBaseOptions}
            onChange={this.handleBaseUnitChange}
            />}
            // label={{ basic: true, 
              // content: this.state.baseUnitOption !== null ? this.state.AllBaseOptions[this.state.baseUnitOption].key : '' }}
            labelPosition='right'
            placeholder='Enter amount to convert...'
          />
        </Segment> */}
        {/* <Segment.Group> */}
            {this.state.selTargetOptions.map((target, idx) =>
              <Segment inverted color='teal' style={{margin: "0 auto", maxWidth: "400px"}}>
                <Input
                  key = {target}
                  label={{ basic: true, 
                    content: target }}
                  labelPosition='right'
                  disabled
                />
              </Segment>
            )}
        {/* </Segment.Group> */}
      </Segment.Group>
    </div>
  );
  }
}

export default App;
