import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Example = (props) => {
  const [show, setShow] = useState(false);
  return <div />;
}

class Home extends Component {

 

	constructor(props){
		super(props);
        this.state = {show: false};
	}

	render(){
		return(
            <div>
            <>
                <Modal
                show={this.state.show}
                onHide={() => {this.setState({show: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Thank You!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I've now gathered all your information. Identity acquired.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({show: false})}}>Understood and Agreed</Button>
                </Modal.Footer>
                </Modal>
            </>

			<div className="App">
				<Form className="container">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Gather Information" />
                  </Form.Group>
                  <Button variant="primary" onClick={() => {this.setState({show: true})}}>
                    Submit
                  </Button>
                </Form>
			</div>
            </div>
		)
	}
}

const mapStateToProps = state => {
	return{
		
	}
}

export default connect(mapStateToProps)(Home);