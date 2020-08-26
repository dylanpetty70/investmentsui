import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import ToggleButton from 'react-bootstrap/ToggleButton'
import CampaignDetails from './DND/campaignDetails';
import CharacterInfo from './DND/characterInfo';
import CreateEnv from './DND/createEnv';
import Monsters from './DND/monsters';
import Home from './DND/home';
import Roller from './DND/roller';
import {handleUpdate5e, handleGrab5e} from '../actions/5eInfo';
import {handleGrabDraggable, handleNewEnvironment} from '../actions/draggable';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

class DND extends Component {

	constructor(props){
		super(props);
        this.state = {page: 'home', showDice: false};
		this.redirectNonuser = this.redirectNonuser.bind(this);
		this.navTabs = this.navTabs.bind(this);
		this.switchStatement = this.switchStatement.bind(this);
	}

	componentDidMount(){
		if(!this.props.dndInfo.generalInfo){
			this.props.handleGrab5e();
		}
		
		this.props.handleGrabDraggable('first');
	}

	redirectNonuser(){
		//if(!this.props.dndInfo.status){
		//	return <Redirect to="/404" />
		//}
	}

	//description of next session
	//general overview of world
	//Monsters in next session vs. monsters used
	//Names/characters/familiars
	//strategies for combat
	//Moveable environment for playing
	//environment that players see separately

	//dnd board: conditions, damage types, magic-schools, weapon properties,  spells

	navTabs(){
		const handleSelect = (eventKey) => this.setState({...this.state, page: eventKey});

		return (
		<Nav variant="tabs" defaultActiveKey="home" style={{margin: '10px'}} onSelect={handleSelect}>
			<Nav.Item>
			<Nav.Link eventKey="home">Dashboard</Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link eventKey="createenvironment">Create Environment</Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link eventKey="monsters">Monsters</Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link eventKey="campaigndetails">Campaign Details</Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link eventKey="characterinfo">Character Info</Nav.Link>
			</Nav.Item>
			<ButtonGroup toggle className="mb-2">
				<ToggleButton
				  type="checkbox"
				  variant="outline-secondary"
				  checked={this.state.showDice}
				  value='1'
				  style={{marginLeft: '20px'}}
				  onChange={() => this.setState({...this.state, showDice: !this.state.showDice})}
				>
				  Toggle Dice Roller
				</ToggleButton>
			</ButtonGroup>
		</Nav>
		);
	}

	switchStatement(){
		switch(this.state.page){
			case 'home':
				return (<Home />);
			case 'createenvironment':
				return (<CreateEnv />);
			case 'monsters':
				return (<Monsters />);
			case 'campaigndetails': 
				return (<CampaignDetails />);
			case 'characterinfo':
				return (<CharacterInfo />);
			default:
				return (<></>);
		}
	}

	render(){
		return(
            <div>
            {this.redirectNonuser()}
			{this.navTabs()}
			<div style={{minWidth: '75%', float: 'left'}}>
			{this.switchStatement()}
			</div>
			<div style={{right: '0', position: 'absolute', margin: '10px', maxWidth: '300px'}}>
			{(this.state.showDice) ? <Roller /> : <></>}
			</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        dndInfo: state.dndInfo,
	}
}

export default connect(mapStateToProps, {
	handleUpdate5e,
	handleGrab5e,
	handleGrabDraggable,
	handleNewEnvironment
})(DND);