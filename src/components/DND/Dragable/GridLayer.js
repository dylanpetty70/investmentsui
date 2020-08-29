import React, { Component } from 'react';
import { connect } from 'react-redux';

class GridLayer extends Component {

	constructor(props){
		super(props);
		this.state = {}
		this.createGrid = this.createGrid.bind(this);
	}

	createGrid(){//75vw
		let totalWidth = .75 * document.documentElement.clientWidth;
		let temp = [];

		for(let i = this.props.draggable.scale; i < totalWidth; i += this.props.draggable.scale){
			let variableLeft = String(i + 12 - this.props.draggable.scale) + 'px';
			let variableTop = String(i + 127 - this.props.draggable.scale) + 'px';
			
			const styleTop ={
				position: 'absolute',
				width: '75vw',
				height: this.props.draggable.scale,
				border: '1px solid',
				borderColor: 'white',
				left: '10px',
				top: variableTop,
				opacity: .25,
				zIndex: 1000,
				pointerEvents: 'none'
			}
			const styleBottom ={
				position: 'absolute',
				width: this.props.draggable.scale,
				height: '75vw',
				border: '1px solid',
				borderColor: 'white',
				left: variableLeft,
				top: '127px',
				opacity: .25,
				zIndex: 1000,
				pointerEvents: 'none'
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
				{this.createGrid()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        draggable: state.draggable
	}
}

export default connect(mapStateToProps)(GridLayer);