import ReactDOM from 'react-dom';
import React from 'react';
import Message from './Message.jsx';
import SoundIcon from './SoundIcon.jsx';
import $ from 'jquery';

class Inputs extends React.Component {
  constructor(props) {
    super(props);
  }
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