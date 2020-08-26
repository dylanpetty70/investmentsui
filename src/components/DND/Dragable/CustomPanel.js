import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleAddNewItem, handleUpdateCurrent, handleNewEnvironment, handleChangeScale} from '../../../actions/draggable';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CustomPanel extends Component {

	constructor(props){
		super(props);
		this.state = {tempItem: '',
						tempScale: '',
						scaleError: false
						}
		
	}

	componentDidMount(){
		
    }


	render(){
		return(
			<div style={{width: '22vw', border: '1px solid', backgroundColor: 'lightGrey', position: 'absolute', right: '5px', top: '128px', height: '100vh'}}>
				<Form inline={true} style={{margin: '10px'}}>
				<Form.Group>
                    <Form.Control placeholder={this.props.draggable.scale} style={{width: '50px'}} onChange={(text) => {this.setState({...this.state, tempScale: text.target.value})}} />
                </Form.Group>
                <Button variant="primary" onClick={() => {(!isNaN(Number(this.state.tempScale))) ? this.props.handleChangeScale(this.state.tempScale, this.props.envOptions.current) : this.setState({...this.state, scaleError: true})}}>Change Scale</Button>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        draggable: state.draggable,
		envOptions: state.envOptions
	}
}

export default connect(mapStateToProps, {handleAddNewItem, handleUpdateCurrent, handleNewEnvironment, handleChangeScale})(CustomPanel);