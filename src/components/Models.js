import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Route, Switch } from 'react-router-dom';
import JacobValuation from './Models/JacobValuation';



class Models extends Component {

	render(){
		return(
			<div className="App">
				<div className="p-3 bg-secondary text-white" style={{position: 'absolute', left: '0', minHeight: '100%', margin: '0'}}>
					<h2>Models</h2>
					<hr/>
                    <Nav defaultActiveKey="/models" className="flex-column mr-auto">
						<Nav.Item style={{textAlign: 'left'}}>
							<Nav.Link href="/models/jacobvaluation" style={{color: 'white', fontSize: '20px'}}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}}>Jacob's Valuation</Button></Nav.Link>
						</Nav.Item>
                    </Nav>
				</div>
				<div style={{marginLeft: '212px'}}>
				<Switch>
					<Route exact path="/models" component={JacobValuation} />
					<Route path="/models/jacobvaluation" component={JacobValuation} />
				</Switch>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		
	}
}

export default connect(mapStateToProps)(Models);