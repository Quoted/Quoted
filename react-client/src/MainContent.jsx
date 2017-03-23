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
      queryString: '',
      businessCategory: '',
      location: ''
    }
    // var this.fetchBusinesses = this.fetchBusinesses.bind(this);
  }

  handleQueryChange(event) {
    // event.preventDefault();    
    console.log('queryString clicked');
    this.setState({queryString: event.target.value});
  }

  handleBusinessCategoryChange(event) {
    // event.preventDefault(); 
    console.log('businessCategory clicked');
    this.setState({businessCategory: event.target.value});
  }

  handleLocationChange(event) {
    // event.preventDefault(); 
    console.log('location clicked');
    this.setState({location: event.target.value});
  }

  fetchBusinesses(event) {
    let params = {};
    params.term = this.state.queryString || 'test';
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
            handleQueryChange={this.handleQueryChange.bind(this)} 
            handleBusinessCategoryChange={this.handleBusinessCategoryChange.bind(this)} 
            handleLocationChange={this.handleLocationChange.bind(this)} 
            searchParams={this.state} />
      <div className="page-header">
      <h1> <b> Quoted </b></h1>
      </div>
      <Inputs />
      <List businesses={this.state.businesses} fetchBusinesses={this.fetchBusinesses.bind(this)}/> 
    </div>)
  }
}

export default MainContent;

// ReactDOM.render(<App />, document.getElementById('app'));