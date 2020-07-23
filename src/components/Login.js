import React, {Component} from 'react';
import { connect } from 'react-redux';


class Login extends Component {

	constructor(props){
		super(props);
	}

	onChangeQues(text){
		this.setState({question: text, answer: this.state.answer})
	}

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