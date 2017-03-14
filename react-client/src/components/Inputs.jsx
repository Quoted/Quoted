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
      <div> 
        <Message /> 
        <SoundIcon />        
        <h1> Confirm info </h1>
      </div>
    )
  }
}

export default Inputs;