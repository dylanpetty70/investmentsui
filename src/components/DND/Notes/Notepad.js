import React, { Component } from 'react';
import Container from './Container';
import DragLayer from './CustomDragLayer';
import { connect } from 'react-redux';
import {handleChangeCampaign, handleAddCampaign, handleAddNotepad, handleAddSubnotepad, handleAddNote, handleGrabCampaigns, changeNotepad, changeSubnotepad} from '../../../actions/notes';
import CustomPanel from './CustomPanel';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import {GrAdd} from 'react-icons/gr';


class Notepad extends Component {

	constructor(props){
		super(props);
		this.state = {showAddNotepad: false, 
					showAddSubnotepad: false, 
					showAddCampaign: false,
					tempNotepadName: '', 
					tempSubnotepadName: '',
					tempCampaignName: '',
					subnotepads: [],
					boxes: {},
					items: []
					}
		this.subnotepads = this.subnotepads.bind(this);
		this.notepads = this.notepads.bind(this);
		this.addNotepad = this.addNotepad.bind(this);
		this.addSubnotepad = this.addSubnotepad.bind(this);
		this.updateSubState = this.updateSubState.bind(this);
		this.updateBoxes1 = this.updateBoxes1.bind(this);
	}

	componentDidMount(){
		this.updateSubState();
		if(this.props.notesOptions.current.campaign){
			this.props.handleChangeCampaign(this.props.notesOptions.current.campaign)
		} else {
			this.props.handleChangeCampaign(this.props.notesOptions.all[0])
		}
    }

	updateSubState(){
		setTimeout(() => {
			let tempsub = [];
			if(this.props.notesOptions.current.notepad !== ''){
				for(let i = 0; i < this.props.notepads[this.props.notesOptions.current.notepad].length; i++){
					tempsub.push(this.props.notepads[this.props.notesOptions.current.notepad][i].subnotepad)
				}
				this.setState({...this.state, subnotepads: tempsub});
			} else {
				this.setState({...this.state, subnotepads: ''});
			}
		}, 300)
	}

	subnotepads(){
		if(Object.keys(this.props.notepads).length !== 0 & this.props.notesOptions.current.subnotepad !== ''){
			let temp = [];
			for(let i = 0; i < this.state.subnotepads.length; i++){
				temp.push(
					<Nav.Item key={'subnotepadsitem'+i}>
						<Nav.Link style={{color: 'black', fontSize: '16px'}} eventKey={this.state.subnotepads[i]}>{this.state.subnotepads[i]}</Nav.Link>
					</Nav.Item>
				)
			}
			const handleSelect = (eventKey) => {
				this.props.changeSubnotepad(eventKey);
				this.updateSubState();
				setTimeout(this.updateBoxes1(), 600);
			}

			return (
			<Nav variant='tabs' activeKey={this.props.notesOptions.current.subnotepad} className="flex-column mr-auto" onSelect={handleSelect}>
				{temp}
				<Nav.Item>
				<Nav.Link style={{color: 'blue', fontSize: '16px'}}  onClick={() => {this.setState({...this.state, showAddSubnotepad: true})}}>+ Note</Nav.Link>
				</Nav.Item>
			</Nav>
			);
		} else {
			return(<Nav variant='tabs' defaultActiveKey={''} className="flex-column mr-auto">
				<Nav.Item>
				<Nav.Link style={{color: 'blue', fontSize: '16px'}}  onClick={() => {this.setState({...this.state, showAddSubnotepad: true})}}>+ Note</Nav.Link>
				</Nav.Item>
			</Nav>)
		}
	}	

	updateBoxes1(){
        let items = [];
		console.log('here')
        if(this.props.notesOptions.current.subnotepad !== '' & Object.keys(this.props.notepads).length > 0){
            for(let i = 0; i < this.props.notepads[this.props.notesOptions.current.notepad].length; i++){
                if(this.props.notepads[this.props.notesOptions.current.notepad][i].notepad === this.props.notesOptions.current.subnotepad){
					if(this.props.notepads[this.props.notesOptions.current.notepad][i].notes){
						items = this.props.notepads[this.props.notesOptions.current.notepad][i].notes;
					}
	            }
            }
        }
		let temp = {};
		if(items.length > 0){
		for(let i = 0; i < items.length; i++){
		temp[['id' + i]] = {id: 'id'+i, top: Number(items[i].pTop), left: Number(items[i].pLeft), object: items[i].object, size: items[i].size};
		}
		this.setState({...this.state, boxes: temp, items: items});
		} else {
			temp = {};  
			this.setState({...this.state, boxes: temp, items: items});
		}
    };
	
	notepads(){
		if(this.props.notepads !== {} & this.props.notesOptions.current.notepad !== ''){
			let notepads = Object.keys(this.props.notepads)
			const handleSelect = (eventKey) => {
				this.props.changeNotepad(eventKey, this.props.notepads[eventKey]);
				this.updateSubState();
				setTimeout(this.updateBoxes1(), 600);
			}
			let temp = [];
			for(let i = 0; i < notepads.length; i++){
				temp.push(<Nav.Item key={'notepadsitem'+i}>
					<Nav.Link style={{color: 'black', fontSize: '16px'}} eventKey={notepads[i]}>{notepads[i]}</Nav.Link>
				</Nav.Item>)
			}

			return (
			<Nav variant='tabs' activeKey={this.props.notesOptions.current.notepad} style={{marginLeft: '30px'}} className="flex-row mr-auto" onSelect={handleSelect}>
				{temp}
				<Nav.Item>
				<Nav.Link style={{color: 'blue',fontSize: '16px'}} onClick={() => {this.setState({...this.state, showAddNotepad: true})}}>+ Notepad</Nav.Link>
				</Nav.Item>
			</Nav>
			);
		} else {
			return(<Nav variant='tabs' activeKey={''} style={{marginLeft: '30px'}} className="flex-row mr-auto">
				<Nav.Item>
				<Nav.Link style={{color: 'blue',fontSize: '16px'}} onClick={() => {this.setState({...this.state, showAddNotepad: true})}}>+ Notepad</Nav.Link>
				</Nav.Item>
			</Nav>)
		}
	}

	addCampaign(){
        return(
            <Modal
                show={this.state.showAddCampaign}
                onHide={() => {this.setState({...this.state, showAddCampaign: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Campaign</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder='Name' onChange={(text) =>{this.setState({...this.state, tempCampaignName: text.target.value})}}/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showAddCampaign: false});  this.props.handleAddCampaign(this.state.tempCampaignName); this.updateSubState();}}>Create</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showAddCampaign: false});}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

	addNotepad(){
        return(
            <Modal
                show={this.state.showAddNotepad}
                onHide={() => {this.setState({...this.state, showAddNotepad: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Notepad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder='Name' onChange={(text) =>{this.setState({...this.state, tempNotepadName: text.target.value})}}/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showAddNotepad: false});  this.props.handleAddNotepad(this.props.notesOptions.current.campaign, this.state.tempNotepadName); this.updateSubState();}}>Create</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showAddNotepad: false});}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

	addSubnotepad(){
        return(
            <Modal
                show={this.state.showAddSubnotepad}
                onHide={() => {this.setState({...this.state, showAddSubnotepad: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder='Name' onChange={(text) =>{this.setState({...this.state, tempSubnotepadName: text.target.value})}}/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showAddSubnotepad: false}); this.props.handleAddSubnotepad(this.props.notesOptions.current.campaign, this.props.notesOptions.current.notepad, this.state.tempSubnotepadName); this.updateSubState();}}>Create</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showAddSubnotepad: false})}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

	render(){
		return(
			<div>
				{this.addNotepad()}
				{this.addSubnotepad()}
				{this.addCampaign()}
				<div className="p-3" style={{backgroundColor: '#e8e9ed', zIndex: '2', position: 'absolute', height: '70px', left: '0', top: '113px', width: '100vw', margin: '0'}}>
				<Form inline={true}>
				<Form.Group style={{maxWidth: '200px', maxHeight: '36px'}}>
					<Typeahead
							id="campaignSelect"
							labelKey="campaigns"
							onChange={(text) => {if(this.props.notesOptions.all.includes(text[0])){this.props.handleChangeCampaign(text[0])}; this.updateSubState();}}
							options={this.props.notesOptions.all}
							placeholder={this.props.notesOptions.current.campaign}
							value={this.props.notesOptions.current.campaign}
							style={{height: '36px'}}
						/>
						<GrAdd style={{borderRadius: '.25em', backgroundColor: 'lightGrey', height: '36px', width: '36px', top: '-35px', marginLeft: '163px', position: 'relative'}} onClick={() => {this.setState({...this.state, showAddCampaign: true}); this.updateSubState();}} />
					</Form.Group>
					{this.notepads()}
				</Form>
				</div>
				<div className="p-3" style={{backgroundColor: '#e8e9ed', zIndex: '1', position: 'absolute', left: '0', top: '155px', minHeight: '104.5%', margin: '0', width: '200px'}}>
					<hr/>
					{this.subnotepads()}
				</div>
            <div style={{height: '75vw', width: '75vw', position: 'flex'}}>
				<Container boxes={this.state.boxes} items={this.state.items}/>
				<DragLayer/>
            </div>
				<CustomPanel />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        notepads: state.notepads,
		notesOptions: state.notesOptions
	}
}

export default connect(mapStateToProps, {handleChangeCampaign, handleAddCampaign, handleAddNotepad, handleAddSubnotepad, handleAddNote, handleGrabCampaigns, changeNotepad, changeSubnotepad})(Notepad);