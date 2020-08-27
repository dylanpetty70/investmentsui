import React, {Component} from 'react';
import { connect } from 'react-redux';


class WeaponProperties extends Component {



	render(){
		return(
			<div className="App">
				{console.log('WeaponProperties')}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		
	}
}

export default connect(mapStateToProps)(WeaponProperties);