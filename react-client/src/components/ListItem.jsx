import ReactDOM from 'react-dom';
import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,

    }
  }

  handleSelectedBusinessToggle (event) {
    var self = this;
    this.setState({selected: !this.state.selected}, () => self.props.handleSelectedBusinesses(event.target.value));
  }

  render() {
    var style = {            
      'backgroundColor': this.state.selected ? true : ''
    };

    return (            
      <div style={style} className="listItem container" onClick={() => this.props.handleSelectedBusinesses(this.props.business.businessName)} >
        <div className="row" >
          <div className="col-md-3 col-lg-3"> 
            <img className="businessImage" src={this.props.business.businessPictureUrl} /> 
            <img className="businessYelpRating" src={this.props.business.businessRatingUrl} />
          </div>
          <div className="col-md-9 col-lg-9"> 
            <div> Name: {this.props.business.businessName}</div>
            <div> Address: {this.props.business.businessAddress}</div>
            <div> Phone: {this.props.business.businessPhone}</div>
          </div>
          <div className="left"> {this.props.business.businessDescription} </div> 
        </div>
      </div> 
    )
  }
}
            // <div className="col-md-9 col-lg-9"> <img className="businessYelpRating" src={this.props.business.businessRatingUrl} /> </div>

export default ListItem;