import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { handleNewStock, handleDeleteStock } from '../actions/userStocks';
import {handleUpdateStockCandle} from '../actions/stockCandle';

class Home extends Component {

	constructor(props){
		super(props);
        this.state = {addStock: ''};
		this.redirectNonuser = this.redirectNonuser.bind(this);
		this.eachStock = this.eachStock.bind(this);
		this.allStocks = this.allStocks.bind(this);
		this.checkStocks = this.checkStocks.bind(this);
	}

	redirectNonuser(){
		if(!this.props.userStatus){
			return <Redirect to="/login" />
		}
	}

	eachStock(key){
		return (
			<div style={{maxWidth: '700px'}} key={key}>
			<Card>
                <Card.Header>
				{this.props.user.userStocks[key].stock}
                </Card.Header>
                <Card.Body>
                <Card.Title>Info</Card.Title>
                <Card.Text>
                    Stocks: {this.props.user.userStocks[key].count}
					<br/>
					Price: {(this.props.multipleStocks[this.props.user.userStocks[key].stock]) ?
					(this.props.multipleStocks[this.props.user.userStocks[key].stock].length > 0) ? this.props.multipleStocks[this.props.user.userStocks[key].stock][0] : 'Unknown'
					: 'Unknown'}
                </Card.Text>
                </Card.Body>
				<Card.Footer>
				<Button variant="outline-danger" style={{float: 'right', marginRight: '10px'}} onClick={() => {this.props.handleDeleteStock(this.props.user.username, key)}}>
                    Delete Stock
                </Button>
				</Card.Footer>
            </Card>
			<br/>
			</div>
		)
	}

	allStocks(){
		let temp = [];
		for(var key in this.props.user.userStocks){
			temp.push(this.eachStock(key));
		}
		return temp;
	}

	checkStocks(){
		let temp = [];
		let flag = true;
		for(var key1 in this.props.user.userStocks){
			flag = true;
			for(var key in this.props.multipleStocks){
				console.log(this.props.user.userStocks[key1].stock)
				if(this.props.user.userStocks[key1].stock === key){
					flag = false;
				}
			}
			if(flag){
				temp.push(this.props.user.userStocks[key1].stock);
			}
		}
		for(let i = 0; i < temp.length; i++){
			this.props.handleUpdateStockCandle(temp[i]);
		}
	}

	render(){
		return(
            <div>
			{this.checkStocks()}
            {this.redirectNonuser()}
			<div style={{display: 'inline'}}>
				<h1 style={{textAlign: 'center', marginTop: '20px', color: 'royalBlue'}}>{this.props.user.firstName + "'s Portfolio"}</h1>
				<div style={{textAlign: 'right'}}>
				<InputGroup style={{maxWidth: '300px', float: 'right'}}>
					<FormControl
					  placeholder="Ticker"
					  onChange={(text) => {this.setState({...this.state, newStock: text.target.value})}}
					/>
					<InputGroup.Append>
					  <Button variant="outline-primary" style={{marginRight: '30px'}} onClick={() => {this.props.handleNewStock(this.props.user.username, this.state.newStock)}}>
							Add Stock
						</Button>
					</InputGroup.Append>
				  </InputGroup>
				
				</div>
			</div>
			<div style={{margin: '30px', marginTop: '80px'}}>
				{this.allStocks()}
			</div>
            </div>
		)
	}
}

const mapStateToProps = state => {
	return{
        userStatus: state.userStatus,
		user: state.user,
		multipleStocks: state.multipleStocks,
	}
}

export default connect(mapStateToProps, {
	handleNewStock,
	handleDeleteStock,
	handleUpdateStockCandle,
})(Home);