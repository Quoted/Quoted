import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

  }

  handleChange(e) {
  }
  handleSubmit () {
   console.log('this', this)
    console.log('username', this.state.username);
    console.log('password', this.state.password);

    const signupParams = {
      username: this.state.username,
      password: this.state.password,
      number: this.state.number 
    }

    $.ajax({
      method: 'POST',
      url: '/login',
      data: signupParams,
      success: (result) => {
        console.log('result', result);       
      },
      error: (err) => {
        console.log('err', err);
      }
    }); 
  }

  render() {
    return (            
        <div className="container">
          <form className="form-signin">
            <h2 className="form-signin-heading">Please Sign In</h2>
            <label for="inputEmail" className="sr-only">Username: </label>
            <input type="text" id="inputEmail" onChange={(e) => {this.setState({username: e.target.value})}} className="form-control" placeholder="Username" required autofocus />
            <label for="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" onChange={(e) => {this.setState({password: e.target.value})}} className="form-control" placeholder="Password" required />
            <div className="checkbox">
              <label>                
                <input type="checkbox" value="remember-me" /> 
                Remember Me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleSubmit.bind(this) } >Sign in </button>
          </form>          
      </div>
    )
  }
}

export default Login;