import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Nav from './components/Nav.jsx';
import Message from './components/Message.jsx'
import SoundIcon from './components/SoundIcon.jsx'
import Inputs from './components/Inputs.jsx'
import List from './components/List.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }

  render () {
    return (<div>
      <Nav />
      <div className="page-header">
        <h1> <b> Quoted </b></h1>
      </div>
      <Inputs />
      <List /> 
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));