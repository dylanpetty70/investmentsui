import React, {Component} from 'react';
import { connect } from 'react-redux';


class Login extends Component {


	render(){
		return(
			<div className="App">
				<p>
				  Login Page
				</p>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		
	}
}

export default connect(mapStateToProps)(Login);