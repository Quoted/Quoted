import ReactDOM from 'react-dom';
import React from 'react';
import Message from './Message.jsx';
import SoundIcon from './SoundIcon.jsx';

class Inputs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  render() {
    return (                  
      <div className="row inputs"> 
        <div className="col-sm-10">
          <Message />         
          <SoundIcon />        
          <button className="btn btn-primary"> Confirm info </button>
          </div>
      </div>
    )
  }
}

export default Inputs;