import ReactDOM from 'react-dom';
import React from 'react';

class ListItem extends React.Component {
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
      <div className="listItem container">
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