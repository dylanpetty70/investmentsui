import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import ToggleButton from 'react-bootstrap/ToggleButton';
import CampaignDetails from './DND/campaignDetails';
import CharacterInfo from './DND/characterInfo';
import CreateEnv from './DND/createEnv';
import GameInfo from './DND/gameInfo';
import Roller from './DND/roller';
import {handleUpdate5e, handleGrab5e} from '../actions/5eInfo';
import {handleGrabDraggable, handleNewEnvironment, changeCurrentEnv, handleGrabOptions} from '../actions/draggable';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

class DND extends Component {

	constructor(props){
		super(props);
        this.state = {page: 'gameinfo', showDice: false};
		this.redirectNonuser = this.redirectNonuser.bind(this);
		this.navTabs = this.navTabs.bind(this);
		this.switchStatement = this.switchStatement.bind(this);
	}

	componentDidMount(){
		this.props.handleGrabOptions();
		if(!this.props.envOptions.current) { 
			setTimeout(this.props.changeCurrentEnv(this.props.envOptions.all[0]), 500) 
		}
		if(!this.props.dndInfo.generalInfo){
			this.props.handleGrab5e();
		}
		if(this.props.envOptions.current){
			this.props.handleGrabDraggable(this.props.envOptions.current);
		} else {
			this.props.handleGrabDraggable(this.props.envOptions.all[0])
		}
	}

	redirectNonuser(){
		if(!this.props.dndInfo.status){
			return <Redirect to="/404" />
		}
	}

	//campaignDetails
		//description of next session
		//general overview of world
		//Names/characters/familiars
		//one note type structure by the same gameinfo navigation
		//campaign  selectable
	
	//Tag things in each gameinfo component
	//audio for game ambiance https://freepd.com/music/Ancient%20Rite.mp3

	//dashboard: per user, tag things you want in your dashboard - future feature

	navTabs(){
		const handleSelect = (eventKey) => this.setState({...this.state, page: eventKey});

		return (
		<Nav variant="tabs" defaultActiveKey="gameinfo" style={{margin: '10px'}} onSelect={handleSelect}>
			<Nav.Item>
			<Nav.Link eventKey="gameinfo">Game Info</Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link eventKey="createenvironment">Create Environment</Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link eventKey="characterinfo">Character Info</Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link eventKey="campaigndetails">Campaign Details</Nav.Link>
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
			case 'createenvironment':
				return (<CreateEnv />);
			case 'gameinfo':
				return (<GameInfo />);
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
		envOptions: state.envOptions
	}
}

export default connect(mapStateToProps, {
	handleUpdate5e,
	handleGrab5e,
	handleGrabDraggable,
	handleNewEnvironment,
	changeCurrentEnv, 
	handleGrabOptions
})(DND);