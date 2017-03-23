import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import App from './index.jsx';
import SignUp from './components/SignUp.jsx'
import MainContent from './MainContent.jsx'
import Login from './components/Login.jsx'
// import {Router, Route, browserHistory, IndexRoute, HashRouter} from 'react-router';
import {HashRouter, Route,IndexRoute, Link} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  alertHello() {
    alert('hello')
  }
  render () {
    return (
      <HashRouter>
          <div>
              <Route exact path="/" component={MainContent} /> 
              <Route path="/SignUp" component={SignUp} />
              <Route path="/Login" component={Login} />
          </div>
      </ HashRouter>
    ) 
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
