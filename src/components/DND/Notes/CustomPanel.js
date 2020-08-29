import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleAddNote} from '../../../actions/notes';
//import {handleGrabDraggable, handleUpdateCurrent, handleNewEnvironment, handleChangeScale,changeCurrentEnv} from '../../../actions/draggable';

class CustomPanel extends Component {

	constructor(props){
		super(props);
		this.state = {}
		this.note = this.note.bind(this);
	}

	componentDidMount(){
		
    }

	note(){
		let temp = [];
		let postits = ['yellow', 'blue', 'darkBlue', 'green', 'orange', 'pink', 'purple'];
		for(let i = 0; i < postits.length; i++){
			temp.push(
				<div key={'item'+i}>
					<img src={'/images/postit/'+postits[i]+'.png'}  style={{width: '98px', height: '98px', bottom: '0'}} alt='note'  onClick={() => {this.props.handleAddNote(this.props.notesOptions.current.campaign, this.props.notesOptions.current.notepad, this.props.notesOptions.current.subnotepad, i, 300)}}/>
					<img src='/images/postit/thumbtack.png' style={{position: 'relative', width: '20px', height: '30px', left: '-60px', top: '-30px'}} alt="tack"/>
				</div>
			)
		}
		return temp;
	}

	render(){
		return(
			<div style={{zIndex: '99', alignText: 'center',padding: '30px', width: '180px', border: '1px solid', backgroundColor: 'lightGrey', position: 'absolute', right: '5px', top: '183px'}}>
				<h5>Drag Note In</h5>
				<hr/>
				{this.note()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        notes: state.notes,
        notesOptions: state.notesOptions
	}
}

export default connect(mapStateToProps, 
	{handleAddNote}
	)(CustomPanel);