import React, {Component} from 'react';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
import dilbert from '../images/dilbert2.gif';


class Foresight extends Component {

	render(){
		return(
			<div className="App">
				<Image src={dilbert} fluid/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		
	}
}

export default connect(mapStateToProps)(Foresight);