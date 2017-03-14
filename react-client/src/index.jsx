import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Nav from './components/Nav.jsx';
import Message from './components/Message.jsx'
import SoundIcon from './components/SoundIcon.jsx'
import Inputs from './components/Inputs.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }
/*
  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
*/

  render () {
    return (<div>
      <Nav />
      <h1>Quoted</h1>
      <Inputs />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));