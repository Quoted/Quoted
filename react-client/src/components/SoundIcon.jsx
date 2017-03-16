import ReactDOM from 'react-dom';
import React from 'react';

class SoundIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listening: false
    };

  }

  handlePress() {
    this.setState({listening: !this.state.listening})
  }

  render() {
    var style = {            
      'backgroundColor': this.state.listening ? 'green': ''
    };

    return (            
      <img style={style} onClick={this.handlePress.bind(this)} src="assets/soundIcon.png" />  
    )
  }
}

export default SoundIcon;