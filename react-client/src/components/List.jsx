import ReactDOM from 'react-dom';
import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  handleChange(e) {
    this.setState({input: e.target.value});
    console.log(e.target.value);
  }

  render() {
    return (  
      <div className="list"> 
        <div className="form-group">
          <input className="checkbox" type="checkbox" id="checkAll"/>
          <label className="toggleAll" for="checkAll">ToggleAll</label>
        </div> 
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />

      </div>

    )

  }
}

export default List;