import ReactDOM from 'react-dom';
import React from 'react';
import Message from './Message.jsx';
import SoundIcon from './SoundIcon.jsx';
import $ from 'jquery';

class Inputs extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleTextChange(e) {
  //   this.setState({textInput: e.target.value});
  //   // console.log(e.target.value);
  //   console.log(this.state.textInput);
  // }

  // sendInfo() {
  //   console.log('Trying to send info', this.state.textInput);

  //   //Send data to server to send text messages
  //   $.ajax({
  //     method: "POST",
  //     url: '/messages',
  //     data: {textInput: this.state.textInput},
  //     success: (results) => {
  //       console.log('sucessfuly sent message', results);
  //     }, error: (err) => {  
  //       console.log('err recieved', err);
  //     }
  //   })

  //   //Send data to server to send phone calls
  //   $.ajax({
  //     method: "POST",
  //     url: '/call',
  //     success: (results) => {
  //       console.log('successfully sent call', results);
  //     }, error: (err) => {
  //       console.log('err in call', err);
  //     }
  //   })
  // }

  render() {
    return (                  
      <div className="row inputs"> 
        <div className="col-sm-10">
          <tbody>
            <tr>
              <td><input  type="checkbox" 
                          name="sendSMS"
                          value={this.props.state.sendSMS}
                          onClick={this.props.handleCheckBox} /> Send SMS Message </td>
              <td><input  type="checkbox" 
                          name="sendPhone"
                          value={this.props.state.sendPhone}
                          onClick={this.props.handleCheckBox} /> Send Phone Message </td> 
            </tr>                         
          </tbody>
          <Message handleTextInputChange={this.props.handleTextInputChange}/>         
          <SoundIcon recordingPublicUrl={this.props.recordingPublicUrl} />        
          <button onClick={this.props.sendInfo} className="btn btn-primary"> Send for Help! </button>
          </div>
      </div>
    )
  }
}

export default Inputs;