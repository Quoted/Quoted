import ReactDOM from 'react-dom';
import React from 'react';
import Message from './Message.jsx';
import SoundIcon from './SoundIcon.jsx';
import $ from 'jquery';

class Inputs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: ''
    };

  }

  handleTextChange(e) {
    this.setState({textInput: e.target.value});
    // console.log(e.target.value);
    console.log(this.state.textInput);
  }

  sendInfo() {
    console.log('Trying to send info', this.state.textInput);

    //Send data to server to send text messages
    $.ajax({
      method: "POST",
      url: '/messages',
      data: {textInput: this.state.textInput},
      success: (results) => {
        console.log('sucessfuly sent message', results);
      }, error: (err) => {  
        console.log('err recieved', err);
      }
    })

    //Send data to server to send phone calls
    $.ajax({
      method: "POST",
      url: '/call',
      success: (results) => {
        console.log('successfully sent call', results);
      }, error: (err) => {
        console.log('err in call', err);
      }

    })


  }

  render() {
    return (                  
      <div className="row inputs"> 
        <div className="col-sm-10">
          <Message handleTextChange={this.handleTextChange.bind(this)}/>         
          <SoundIcon />        
          <button onClick={this.sendInfo.bind(this)} className="btn btn-primary"> Send Info </button>
          </div>
      </div>
    )
  }
}

export default Inputs;