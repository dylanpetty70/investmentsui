import React, { Component } from 'react';
import Container from './Container';
import DragLayer from './CustomDragLayer';
import { connect } from 'react-redux';
import {handleGrabDraggable, handleAddNewItem, handleUpdateCurrent, handleNewEnvironment} from '../../../actions/draggable';
import CustomPanel from './CustomPanel';
import GridLayer from './GridLayer';




class Environment extends Component {

	constructor(props){
		super(props);
		this.state = {tempItem: ''}
	}

	componentDidMount(){
    }

	render(){
		return(
			<div style={{width: '95vw', margin: '5px'}}>
            <div style={{height: '75vw', width: '75vw', position: 'flex'}}>
				<GridLayer />
				<Container snapToGridAfterDrop={true} />
				<DragLayer snapToGridWhileDragging={true}/>
            </div>
				<CustomPanel />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        draggable: state.draggable,
		envOptions: state.envOptions
	}
}

export default connect(mapStateToProps, {handleAddNewItem, handleGrabDraggable, handleUpdateCurrent, handleNewEnvironment})(Environment);