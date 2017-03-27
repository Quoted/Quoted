import ReactDOM from 'react-dom';
import React from 'react';
import ListItem from './ListItem.jsx';
import $ from 'jquery'
class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (  
	    	<nav className="navbar navbar-default"> 
	    		<div className="container-fluid">
				    <form onSubmit={this.props.fetchBusinesses}>
				    		<ul className="nav navbar-nav">
				    				<li className="dropdown">
				    					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
					    					<label> Category: </label> {' '}
								 					<select value={this.props.searchParams.businessCategory} onChange={this.props.handleBusinessCategoryChange}>
								            <option value="Auto Repair">Auto Repair</option>
								            <option value="Home Repair">Home Repair</option>
								            <option value="HRSF72">HRSF72</option>
								            <option value="test">Test</option>
								          </select>
					    				</a>
				    				</li>
				    				<li> 
					    				<a>
					    					<label> Location: </label> {' '}
								 					<select value={this.props.searchParams.location} onChange={this.props.handleLocationChange}>
								            <option value="San Francisco">San Francisco</option>
								            <option value="Oakland">Oakland</option>
								          </select>    					
					    				</a>
				    				</li>
				    				<input type="submit" value="Search Businesses" className="btn btn-warning search"/>    				
				  			</ul>
				    </form>
	  			</div>
	  		</nav>
    )

  }
}

export default Nav; 
