import React, {Component} from 'react';
import Classes from './GameInfo/classes';
import Conditions from './GameInfo/conditions';
import DamageTypes from './GameInfo/damageTypes';
import Equipment from './GameInfo/equipment';
import Features from './GameInfo/features';
import Languages from './GameInfo/languages';
import MagicSchools from './GameInfo/magicSchools';
import Monsters from './GameInfo/monsters';
import Races from './GameInfo/races';
import Spells from './GameInfo/spells';
import Traits from './GameInfo/traits';
import WeaponProperties from './GameInfo/weaponProperties';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

class GameInfo extends Component {

	constructor(props){
		super(props);
        this.state = {page: 'spells'};
		this.navTabs = this.navTabs.bind(this);
		this.switchStatement = this.switchStatement.bind(this);
	}

	componentDidMount(){
		
	}

	navTabs(){
		const handleSelect = (eventKey) => this.setState({...this.state, page: eventKey});

		return (
		<Nav defaultActiveKey="spells" className="flex-column mr-auto" onSelect={handleSelect}>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="classes"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Classes</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="conditions"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Conditions</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="damagetypes"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Damage Types</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="equipment"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Equipment</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="features"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Features</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="languages"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Languages</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="magicschools"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Magic Schools</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="monsters"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Monsters</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="races"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Races</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="spells"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'spells'}>Spells</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="traits"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Traits</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="weaponproperties"><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Weapon Properties</Button></Nav.Link>
			</Nav.Item>
		</Nav>
		);
	}

	switchStatement(){
		switch(this.state.page){
			case 'classes':
				return (<Classes />);
			case 'conditions':
				return (<Conditions />);
			case 'damagetypes': 
				return (<DamageTypes />);
			case 'equipment':
				return (<Equipment />);
			case 'features':
				return (<Features />);
			case 'languages':
				return (<Languages />);
			case 'magicschools': 
				return (<MagicSchools />);
			case 'monsters':
				return (<Monsters />);
			case 'races':
				return (<Races />);
			case 'spells':
				return (<Spells />);
			case 'traits': 
				return (<Traits />);
			case 'weaponproperties':
				return (<WeaponProperties />);
			default:
				return (<></>);
		}
	}
	render(){
		return(
            <div>
			
			<div className="p-3 bg-secondary text-white" style={{position: 'absolute', left: '0', top: '113px', minHeight: '100%', margin: '0'}}>
				<h2>Categories</h2>
					<hr/>
				{this.navTabs()}
			</div>
			{this.switchStatement()}
			</div>
		)
	}
}


export default GameInfo;