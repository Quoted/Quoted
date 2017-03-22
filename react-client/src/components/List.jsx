import ReactDOM from 'react-dom';
import React from 'react';
import ListItem from './ListItem.jsx';
import $ from 'jquery'
class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (  
      <div className="list"> 
        <div className="form-group">
          <input className="checkbox" type="checkbox" id="checkAll"/>
          <label className="toggleAll" for="checkAll">ToggleAll</label>
        </div> 
        {
          this.props.businesses.map((business) => {
            return <ListItem business={business} key={business._id}/>
          })
        }
        <button onClick={this.props.fetchBusinesses}> Refresh </button>  
      </div>
    )

  }
}

export default List;