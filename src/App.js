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
    value: 'inch',
  },
  {
    key: 'feet',
    text: 'feet (ft)',
    value: 'foot',
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
        amountToConvert: null,
        unitsConverted: [],
      }; 
      this.handleBaseUnitChange = this.handleBaseUnitChange.bind(this);
      this.handleAmountChange = this.handleAmountChange.bind(this);
      this.getBaseUnitOption = this.getBaseUnitOption.bind(this);
      this.getAllTargetOptions = this.getAllTargetOptions.bind(this);
      this.handleTargetUnitChange = this.handleTargetUnitChange.bind(this);
      this.textContentToValue = this.textContentToValue.bind(this);
      this.valueToKey = this.valueToKey.bind(this);
  }

  textContentToValue(textContent){
    let i=0;
    while(this.state.AllTargetOptions[i].text !== textContent){
      i++;
    }
    // console.log(this.state.AllTargetOptions[i].value);
    return this.state.AllTargetOptions[i].value;
  }

  valueToKey(value){
    let i=0;
    while(this.state.AllTargetOptions[i].value !== value){
      i++;
    }
    // console.log(this.state.AllTargetOptions[i].key);
    return this.state.AllTargetOptions[i].key;
  }


  getBaseUnitOption(text){
    // console.log('text ', text);
    let i=0;
    while(i<this.state.AllBaseOptions.length && this.state.AllBaseOptions[i].text !== text){
      // console.log('i ', i);
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
    // console.log(arr);
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
    // console.log(arr);
    if(found) return arr;
  }

  handleBaseUnitChange(event) {
    let text = event.target.textContent;
    var baseUO = 0;
    // console.log('text ', text);
    //if previously no option had been selected then text contains all the options
    //and baseUnit will keep its zero initialization value
    if(text.length < 20){
      baseUO = this.getBaseUnitOption(text); //get the option selected
    } else {
      text = this.state.AllBaseOptions[baseUO].text; //pounds (lb)
    }
    //set state with the value selected and the target units
    this.setState({baseUnitOption: baseUO,
      AllTargetOptions: this.getAllTargetOptions(text),
      selTargetOptions:[],
        });
  }

  calculateConversions(amount){
    // console.log('amount ', amount);
    // console.log('sel options', this.state.selTargetOptions);
    // console.log('units converted', this.state.unitsConverted);
    if(amount) {
      // console.log('need to convert');
      //keep in an array the converted units
      var unitsConverted = [];
      switch(this.state.AllBaseOptions[this.state.baseUnitOption].key) {
        case 'pounds':
          //right now it is just pounds to kgs
          unitsConverted.push(amount*0.453592);
          break;
        case 'kilograms':
          //right now it is just kgs to lbs
          unitsConverted.push(amount*2.20462);
          break;
        case 'centimeters':
          //convert centimeters to all target options selected
            for(let i=0; i <this.state.selTargetOptions.length; i++){
              switch(this.valueToKey(this.state.selTargetOptions[i])){
                case 'meters':
                  unitsConverted.push(amount/100);
                  break;
                case 'kilometers':
                  unitsConverted.push(amount/10000);
                  break;
                case 'inches':
                  unitsConverted.push(amount*0.393701);
                  break;
                case 'feet':
                    unitsConverted.push(amount*0.0328084);
                  break;
                case 'miles':
                    unitsConverted.push(amount*0.0000062137);
                  break;
                default:
                  unitsConverted.push(0);
              }
            }
          break;
        case 'meters':
          //convert meters to all target options selected
          for(let i=0; i <this.state.selTargetOptions.length; i++){
            switch(this.valueToKey(this.state.selTargetOptions[i])){
              case 'centimeters':
                unitsConverted.push(amount*100);
                break;
              case 'kilometers':
                unitsConverted.push(amount/1000);
                break;
              case 'inches':
                unitsConverted.push(amount*39.3701);
                break;
              case 'feet':
                  unitsConverted.push(amount*3.28084);
                break;
              case 'miles':
                  unitsConverted.push(amount*0.000621371);
                break;
              default:
                unitsConverted.push(0);
            }
          }
          break;
        case 'inches':
          //convert inches to all target options selected
          for(let i=0; i <this.state.selTargetOptions.length; i++){
            switch(this.valueToKey(this.state.selTargetOptions[i])){
              case 'centimeters':
                unitsConverted.push(amount*2.54);
                break;
              case 'meters':
                unitsConverted.push(amount*0.0254);
                break;
              case 'kilometers':
                unitsConverted.push(amount*0.0000254);
                break;
              case 'feet':
                  unitsConverted.push(amount*0.0833333);
                break;
              case 'miles':
                  unitsConverted.push(amount*0.0000157828);
                break;
              default:
                unitsConverted.push(0);
            }
          }
          break;
        case 'feet':
          //convert feet to all target options selected
          for(let i=0; i <this.state.selTargetOptions.length; i++){
            switch(this.valueToKey(this.state.selTargetOptions[i])){        
              case 'centimeters':
                unitsConverted.push(amount*30.48);
                break;
              case 'meters':
                unitsConverted.push(amount*0.3048);
                break;
              case 'kilometers':
                unitsConverted.push(amount*0.0003048);
                break;
              case 'inches':
                  unitsConverted.push(amount*12);
                break;
              case 'miles':
                  unitsConverted.push(amount*0.000189394);
                break;
              default:
                unitsConverted.push(0);
            }
          }
          break;
        case 'miles':
          //convert miles to all target options selected
          for(let i=0; i <this.state.selTargetOptions.length; i++){
            switch(this.valueToKey(this.state.selTargetOptions[i])){        
              case 'centimeters':
                unitsConverted.push(amount*160934);
                break;
              case 'meters':
                unitsConverted.push(amount*1609.34);
                break;
              case 'kilometers':
                unitsConverted.push(amount*1.60934);
                break;
              case 'inches':
                  unitsConverted.push(amount*63360);
                break;
              case 'feet':
                  unitsConverted.push(amount*0.5280);
                break;
              default:
                unitsConverted.push(0);
            }
          }
          break;
        default:
          break;
      }
    }
    // console.log(unitsConverted);
    this.setState({unitsConverted: unitsConverted})
  }

  handleAmountChange(event) {
    // console.log('amount change', event.target.value);
    //verify that value is a number
    let amount = parseFloat(event.target.value);
    if(amount){
      //store the value in state
      this.setState({amountToConvert: amount});
      //calculate the conversions if at least 1 target unit has been selected
      if(this.state.selTargetOptions.length){
        this.calculateConversions(amount);
      } 
    } else {
      // console.log('amount is empty or not a number')
      //delete previous calculated conversions
      this.calculateConversions(0);
      this.setState({amountToConvert: null});
    }
  }

  handleTargetUnitChange(event) {
    var selArr=[];
    var sel = document.getElementById("convert-to-dropdown").querySelectorAll("a");  
    //if text then an option from the dropdown menu was selected
    if(event.target.textContent){
      //loop through all the previous selected options
      for(let i = 0; i<sel.length; i++){
        // console.log('i ', i, ' ', sel[i].textContent);
        selArr.push(this.textContentToValue(sel[i].textContent));
      }
      //then add the option just selected
      selArr.push(this.textContentToValue(event.target.textContent));
      this.setState({selTargetOptions: selArr},
        function(){
          this.calculateConversions(this.state.amountToConvert)
        });
    } else { //an option was unselected or deleted
      selArr = this.state.selTargetOptions; //all the previous selected options
      let idx =selArr.indexOf(this.textContentToValue(event.target.parentNode.textContent)); //this is the just removed option
      selArr.splice(idx, 1); //remove the option
      this.setState({selTargetOptions: selArr});
    }
  }

  render(){
  return (
    <div className="main">
      <Segment style={{background: "lightblue", color: "midnightblue", fontSize: "16px"}}> 
        To start select the base unit on the left and the target unit on the right:
        <Segment.Group horizontal style={{background: "royalblue"}}>
          <Segment style={{width: "-webkit-fill-available", maxWidth: "400px", background: "royalblue"}}>
          <Input
            label={
              <Dropdown 
                style={{width: "auto", maxWidth: "fit-content", background:"azure"}}
                id="base-unit-dropdown" placeholder='Base Unit' 
                fluid
                selection
                options = {this.state.AllBaseOptions}
                onChange={this.handleBaseUnitChange}
              />}
            labelPosition='right'
            placeholder='Enter amount to convert...'
            onChange={this.handleAmountChange}
          />
          </Segment>
          <Segment style={{margin: "0 20px", width: "auto"}}>
          <Dropdown id = "convert-to-dropdown" placeholder='Convert to' 
            style={{background: "azure"}}
            fluid 
            multiple selection 
            options = {this.state.AllTargetOptions}
            onChange = {this.handleTargetUnitChange}
            value = {this.state.selTargetOptions}/>
          </Segment>
        </Segment.Group>
      </Segment>
      <Segment.Group className="target-options">
        <Segment style={{margin: "0 auto", background: "lightblue", display: "inline-block", width: "100%", textAlign:"left"}}>
            {this.state.selTargetOptions.map((target, idx) =>
                <div style={{display:"inline-block"}}>
                <Input
                  style={{opacity: "1", margin: "5px 10px"}}
                  key = {target}
                  label={{ basic: true, 
                    content: this.valueToKey(target)
                  }}
                  labelPosition='right'
                  disabled
                  value = {this.state.unitsConverted ? this.state.unitsConverted[idx]:''}
                />
              </div>
            )}
        </Segment>
      </Segment.Group>
    </div>
  );
  }
}

export default App;
