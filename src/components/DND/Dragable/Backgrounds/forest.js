import React, { Component } from 'react';
import { connect } from 'react-redux';

class Forest extends Component {

	constructor(props){
		super(props);
		this.state = {}
		this.createForest = this.createForest.bind(this);
	}

	createForest(){//75vw
		let totalWidth = .75 * document.documentElement.clientWidth;
		let temp = [];

		for(let i = this.props.draggable.scale; i < totalWidth; i += this.props.draggable.scale){
			let variableLeft = String(i + 12 - this.props.draggable.scale) + 'px';
			let variableTop = String(i + 130 - this.props.draggable.scale) + 'px';
			
			const styleTop ={
				position: 'absolute',
				width: totalWidth,
				height: this.props.draggable.scale,
				border: '1px solid',
				borderColor: 'darkGrey',
				left: '5px',
				top: variableTop,
				opacity: .4
			}
			const styleBottom ={
				position: 'absolute',
				width: this.props.draggable.scale,
				height: totalWidth,
				border: '1px solid',
				borderColor: 'darkGrey',
				left: variableLeft,
				top: '128px',
				opacity: .4
			}

			let bottomKey = i + 'Bottom';
			let topKey = i + 'Top';

			temp.push(
			<div key={topKey} style={styleTop}>
			</div>
			)
			temp.push(
			<div key={bottomKey} style={styleBottom}>
			</div>
			)
		}
		return temp;
	}

	render(){
		return(
			<div>
				{this.createForest)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		draggable: state.draggable
	}
}

export default connect(mapStateToProps)(Forest);