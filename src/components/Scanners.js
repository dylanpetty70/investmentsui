import React, {Component} from 'react';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
import dilbert from '../images/dilbert3.gif';


class Scanners extends Component {

	constructor(props){
		super(props);
	}

	onChangeQues(text){
		this.setState({question: text, answer: this.state.answer})
	}

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

export default connect(mapStateToProps)(Scanners);