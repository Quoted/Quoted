import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Nav from './components/Nav.jsx';
import Message from './components/Message.jsx'
import SoundIcon from './components/SoundIcon.jsx'
import Inputs from './components/Inputs.jsx'
import List from './components/List.jsx'

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      businesses: [],
      selectedBusinesses: [],
      businessCategory: 'Auto Repair',
      location: 'San Francisco',
      sendSMS: false,
      sendPhone: false,
      textInput: '',
      recordingPublicUrl: ''
    }
  }

  handleBusinessCategoryChange(event) {
    this.setState({businessCategory: event.target.value});
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  handleTextInputChange(event) {
    this.setState({textInput: event.target.value});
  }

  handleSelectedBusinesses(prop) {
    if (this.state.selectedBusinesses.indexOf(prop) === -1) {
      var currentList = this.state.selectedBusinesses;
      currentList.push(prop);
      this.setState({ selectedBusinesses: currentList}, () => console.log(this.state.selectedBusinesses));
    } else {
      var indexOfSelectedBusiness = this.state.selectedBusinesses.indexOf(prop);
      var dupData = this.state.selectedBusinesses.slice();
      dupData.splice(indexOfSelectedBusiness, 1);
      this.setState({selectedBusinesses: dupData}, () => console.log(this.state.selectedBusinesses));
    }
  }

  handleCheckBox(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
    console.log('name is: ' + name + '; value is: ' + value);
  }

  sendInfo() {
    console.log('Trying to send info', this.state.textInput);

    //Send data to server to send text messages
    if (this.state.sendSMS === true){
      $.ajax({
        method: "POST",
        url: '/messages',
        data: { textInput: this.state.textInput,
                businesses: this.state.businesses,
                businessCategory: this.state.businessCategory,
                location: this.state.location},
        success: (results) => {
          console.log('sucessfuly sent message', results);
        }, error: (err) => {  
          console.log('err recieved', err);
        }
      })
    }

    //Send data to server to send phone calls
    if (this.state.sendPhone === true) {
      $.ajax({
        method: "POST",
        url: '/call',
        data: { businesses: this.state.businesses,
                buusinessCategory: this.state.businessCategory,
                location: this.state.location
        },
        success: (results) => {
          console.log('successfully sent call', results);
        }, error: (err) => {
          console.log('err in call', err);
        }
      })
    }
  }

  fetchBusinesses(event) {
    let params = {};
    params.category = this.state.businessCategory || 'test';
    params.location = this.state.location || 'San Francisco';
    console.log('fetchBusiness params: ', params);

    $.post({
      url: '/businesses',
      data: params,
      dataType: 'json',
      success: (results) => {
        console.log('success results: ', results);
        this.setState({businesses: results});
      }, 
      error: (err) => {
        console.log('err', err);
      }
    })
  }

  componentDidMount() {
    this.fetchBusinesses();
  }

  render() {
    return (
    <div>
      <Nav  fetchBusinesses={this.fetchBusinesses.bind(this)} 
            handleBusinessCategoryChange={this.handleBusinessCategoryChange.bind(this)} 
            handleLocationChange={this.handleLocationChange.bind(this)} 
            searchParams={this.state} />
      <div className="page-header">
      <h1> <b> Quoted </b></h1>
      </div>
      <Inputs handleTextInputChange = {this.handleTextInputChange.bind(this)}
              handleCheckBox = {this.handleCheckBox.bind(this)}
              sendInfo = {this.sendInfo.bind(this)}
              state={this.state} /> 
      <List businesses={this.state.businesses} 
            fetchBusinesses={this.fetchBusinesses.bind(this)} 
            handleSelectedBusinesses={this.handleSelectedBusinesses.bind(this)} /> 
    </div>)
  }
}

export default MainContent;

// ReactDOM.render(<App />, document.getElementById('app'));