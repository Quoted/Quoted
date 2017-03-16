import ReactDOM from 'react-dom';
import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  // handleChange(e) {
  //   this.setState({input: e.target.value});
  //   console.log(e.target.value);
  // }

  render() {
    return (            
      <div className="form-group message">
      <label for="textArea" className="col-lg-4 control-label">Message</label>
      <div >
        <textarea className="form-control col-md-8" rows="8" id="textArea" onChange={(e) => {this.props.handleTextChange(e)}}></textarea>
        <span className="help-block">Enter your text message here</span>
      </div>
      </div> 
    )

  }
}

export default Message;