import React, { Component } from 'react';
import Container from './Container';
import DragLayer from './CustomDragLayer';
import { connect } from 'react-redux';
import {handleGrabDraggable, handleAddNewItem, handleUpdateCurrent, handleNewEnvironment} from '../../../actions/draggable';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomPanel from './CustomPanel';
import GridLayer from './GridLayer';

//create backgrounds
//get images for background elements
//create ability to create and save environments


class Environment extends Component {

	constructor(props){
		super(props);
		this.state = {tempItem: ''}
		this.objectItems = this.objectItems.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount(){

    }

	objectItems(){
		let temp = [];
		if(this.props.draggable.items){
			for(let i = 0; i < Object.keys(this.props.draggable.items).length; i++){
				temp.push(<option key={i} value={Object.keys(this.props.draggable.items)[i]}>{Object.keys(this.props.draggable.items)[i]}</option>)
			}
		}
		return temp;
	}

	handleClick(){
		if(this.state.tempItem !== ''){
			let current = this.props.draggable.current;
			current.push({item: this.state.tempItem, pLeft: 80, pTop: 20});
			this.props.handleUpdateCurrent(this.props.envOptions.current, current); 
		}
	}

	render(){
		return(
			<div style={{width: '95vw', margin: '5px'}}>
            <div style={{height: '75vw', width: '75vw', position: 'flex'}}>
				<GridLayer />
				<Container snapToGridAfterDrop={true} />
				<DragLayer snapToGridWhileDragging={true}/>
            </div>
				<div style={{position: 'absolute', top: '67px', right: '10px'}}>
					<Form inline='true'>
					<Button variant="outline-success" style={{float: 'left', width: '100px'}} onClick={() => {this.handleClick()}}>Add Item</Button>
					<Form.Control defaultValue='Select One' as="select" style={{float: 'left', width: '200px'}} custom onChange={(text) => {this.setState({...this.state, tempItem: text.target.value})}}>
						<option value='Select One'>Select One</option>
						{this.objectItems()}
					</Form.Control>
					</Form>
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