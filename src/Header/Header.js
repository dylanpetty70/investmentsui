import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';


class Header extends Component {


	render(){
		return(
			<div className="App">
				<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                {(this.props.userStatus === true) ?
                    <>
                  <Navbar.Brand href="/">Ruse Investments</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href="/models">Models</Nav.Link>
                    </Nav>
                    <Nav>
                      <Nav.Link href="/login">Log In</Nav.Link>
                      <Nav.Link><div style={{paddingLeft: '30px',color: 'white'}}>Hello, {this.props.user.firstName}</div></Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                    </>
                    : 
                    <>
                    <Navbar.Brand href="/">Ruse Investments</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/login">Log In</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    </>
                    }
                    
                </Navbar>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		userStatus: state.userStatus,
        user: state.user,
	}
}

export default connect(mapStateToProps)(Header);