import ReactDOM from 'react-dom';
import React from 'react';
import ListItem from './ListItem.jsx';
import $ from 'jquery'
class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: []
    };

  }

  handleChange(e) {
    this.setState({input: e.target.value});
    console.log(e.target.value);
  }

  fetchBusinesses() {
    console.log('clicked')
    $.get({
      url: '/businesses',      
      success: (results) => {
        results = JSON.parse(results);                
        this.setState({businesses: results});
      }, error: (err) => {
        console.log('err', err);
      }
    })
  }

  componentDidMount() {
    this.fetchBusinesses();
  }

  render() {
    return (  
      <div className="list"> 
        <div className="form-group">
          <input className="checkbox" type="checkbox" id="checkAll"/>
          <label className="toggleAll" for="checkAll">ToggleAll</label>
        </div> 
        {
          
          this.state.businesses.map((business) => {
            return <ListItem phone={business.BusinessPhone} name={business.BusinessName} />
          })
        }
        <button onClick={this.fetchBusinesses.bind(this)} /> Hello <button />
      </div>

    )

  }
}

export default List;