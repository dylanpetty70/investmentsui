import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import CharacterInfo from './DND/characterInfo';
import Roller from './DND/roller';
import {handleUpdate5e, handleGrab5e} from '../actions/5eInfo';
import CreateEnv from './DND/createEnv';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import GameInfo from './DND/gameInfo';
import CampaignDetails from './DND/campaignDetails';

class DNDGuest extends Component {

	constructor(props){
		super(props);
        this.state = {page: 'gameInfo', showDice: false};
		this.navTabs = this.navTabs.bind(this);
		this.switchStatement = this.switchStatement.bind(this);
	}

	componentDidMount(){
		if(!this.props.dndInfo.generalInfo){
			this.props.handleGrab5e();
		}
	}

	navTabs(){
		const handleSelect = (eventKey) => this.setState({...this.state, page: eventKey});

		return (
		<Nav variant="tabs" defaultActiveKey="home" style={{margin: '10px'}} onSelect={handleSelect}>
			<Nav.Item>
			<Nav.Link eventKey="gameinfo">Game Info</Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link eventKey="characterinfo">Character Info</Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link eventKey="createenvironment">Create Environment</Nav.Link>
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
			case 'gameinfo':
				return (<GameInfo />);
			case 'characterinfo':
				return (<CharacterInfo />);
			case 'createenvironment':
				return (<CreateEnv />);
			case 'campaigndetails':
				return (<CampaignDetails />);
			default:
				return (<></>);
		}
	}

	render(){
		return(
            <div>
			{this.navTabs()}
			<div style={{minWidth: '75%', float: 'left'}}>
			{this.switchStatement()}
			</div>
			<div style={{right: '0', position: 'absolute', margin: '20px', maxWidth: '300px'}}>
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
})(DNDGuest);