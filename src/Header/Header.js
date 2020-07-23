import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import { Link } from 'react-router-dom';


class Header extends Component {

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="App">
				<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                  <Navbar.Brand href="/">Ruse Investments</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href="/investments">Investments</Nav.Link>
                      <Nav.Link href="/foresight">Foresight</Nav.Link>
					  <Nav.Link href="/scanners">Scanners</Nav.Link>
                    </Nav>
                    <Nav>
                      <Nav.Link href="/login">Log In</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		
	}
}

export default connect(mapStateToProps)(Header);