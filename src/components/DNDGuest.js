import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import CharacterInfo from './DND/characterInfo';
import Roller from './DND/roller';
import {handleUpdate5e, handleGrab5e} from '../actions/5eInfo';

class DNDGuest extends Component {

	constructor(props){
		super(props);
        this.state = {page: 'home'};
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
			<Nav.Link eventKey="home">Dashboard</Nav.Link>
			</Nav.Item>
		</Nav>
		);
	}

	switchStatement(){
		switch(this.state.page){
			case 'home':
				return (<CharacterInfo />);
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
			<Roller />
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