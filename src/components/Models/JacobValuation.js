import React, {Component} from 'react';
import { connect } from 'react-redux';
import { handleUpdateGovBondRate } from '../../actions/govBondRate';
import { handleUpdateInflationRate } from '../../actions/inflationRate';
import { handleUpdateSPYCandle } from '../../actions/SPYCandle';
import { handleUpdateStockCandle } from '../../actions/stockCandle';
import { handleUpdateStockFinancials } from '../../actions/stockFinancials';
import { handleUpdateStockProfile } from '../../actions/stockProfile';
import {	handleUpdateDCF,
			handleUpdateWACC,
			handleUpdateBETA,
			handleUpdateCreditRiskRate,
			handleUpdateMarketReturn,
			handleUpdateReality,
			handleUpdateStock,
			handleUpdateTaxRate,
			handleUpdateValuation } from '../../actions/jacobVal';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

var formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		});

class JacobValuation extends Component {

	constructor(props){
		super(props);

        this.state = {key: 'bsrllo748v6tucpgfv0g', stock: ''};
		this.getBeta = this.getBeta.bind(this);
		this.genCreditRiskRate = this.genCreditRiskRate.bind(this);
		this.calculate = this.calculate.bind(this);
		this.DCF = this.DCF.bind(this);
		this.stockInfo = this.stockInfo.bind(this);
		this.inputOverride = this.inputOverride.bind(this);
		this.refresh = this.refresh.bind(this);
		this.stockRefresh = this.stockRefresh.bind(this);
		this.dataCheck = this.dataCheck.bind(this);
	}

	componentDidMount(){
		this.props.handleUpdateGovBondRate();
		this.props.handleUpdateInflationRate();
		if(this.props.SPYCandle.length < 1){
			this.props.handleUpdateSPYCandle();
		}
	}


	getBeta(){

		let variance = 0;
		let covariance = 0;
		
		let mean = (this.props.SPYCandle[this.props.SPYCandle.length-1]/this.props.SPYCandle[0]);
		mean = Math.pow(mean, 1 / this.props.SPYCandle.length);

		let difference = 0;
		for(let i = 1; i < this.props.SPYCandle.length; i++){
			difference += Math.pow((this.props.SPYCandle[i]/this.props.SPYCandle[i-1]) - mean, 2);
		}
		variance = (1/(this.props.SPYCandle.length - 2)*difference);

		let yearReturn = Math.pow(mean,this.props.SPYCandle.length-1);


		let totalLength = Math.min(this.props.SPYCandle.length, this.props.stockCandle.length);

		let mean1 = (this.props.SPYCandle[totalLength-1]/this.props.SPYCandle[0]);
		mean1 = Math.pow(mean1, 1 / totalLength);
		let stockmean = (this.props.stockCandle[totalLength-1]/this.props.stockCandle[0]);
		stockmean = Math.pow(stockmean, 1 / totalLength);

		let difference1 = 0;
		for(let i = 1; i < totalLength; i++){
			difference1 += ((this.props.SPYCandle[i]/this.props.SPYCandle[i-1]) - mean1) * ((this.props.stockCandle[i]/this.props.stockCandle[i-1]) - stockmean);
		}
		covariance = (1/(totalLength - 2)*difference1);
		let beta = covariance/variance;
		this.props.handleUpdateBETA(Math.round(beta*100)/100);
		this.props.handleUpdateMarketReturn(Math.round((yearReturn - 1)*100)/100);
	}

	genCreditRiskRate(){
		if(this.props.stockFinancials.length > 0){
			let reporti = 0;
			for(let i = 0; i < this.props.stockFinancials.length; i++){
				if(this.props.stockFinancials[i].report.bs.length > 0 & this.props.stockFinancials[i].report.ic.length > 0){
					reporti = i;
					break;
				}
			}

			let incomei = 0;
			for(let i = 0; i < this.props.stockFinancials[reporti].report.ic.length; i++){
				if(this.props.stockFinancials[reporti].report.ic[i].concept === "NetIncomeLoss"){
					incomei = i;
					break;
				}
			}

			let balance1i = 0;
			for(let i = 0; i < this.props.stockFinancials[reporti].report.bs.length; i++){
				if(this.props.stockFinancials[reporti].report.bs[i].concept === "DeferredTaxLiabilitiesNoncurrent"){
					balance1i = i;
					break;
				}
			}

			let balance2i = 0;
			for(let i = 0; i < this.props.stockFinancials[reporti].report.bs.length; i++){
				if(this.props.stockFinancials[reporti].report.bs[i].concept === "OtherLiabilitiesNoncurrent"){
					balance2i = i;
					break;
				}
			}

			let netOperatingIncome = this.props.stockFinancials[reporti].report.ic[incomei].value;
			let ltLiabilities = this.props.stockFinancials[reporti].report.bs[balance1i].value + this.props.stockFinancials[reporti].report.bs[balance2i].value;
			this.props.handleUpdateCreditRiskRate(Math.round(netOperatingIncome/ltLiabilities*100)/100);
		}
	}

	calculate(){
		let riskFreeRate = (1+this.props.govBondRate)*(1+this.props.inflationRate);
		let equityRiskPremium = (riskFreeRate - 1) + this.props.jacobVal.beta * (this.props.jacobVal.marketReturn - (riskFreeRate - 1));
		let costOfDebt = ((riskFreeRate - 1) + this.props.jacobVal.creditRiskRate)*(1-this.props.jacobVal.taxRate);
		let taxShield = (1-this.props.jacobVal.taxRate);
		let WACC = costOfDebt * taxShield * (costOfDebt/(costOfDebt+equityRiskPremium)) + equityRiskPremium * (equityRiskPremium/(costOfDebt+equityRiskPremium));
		this.props.handleUpdateWACC(Math.round(WACC*100)/100);
	}

	DCF(){
		let operatingCashFlow = [];
		let capitalExpenditure = [];
		let FCF = [];
		let forecast = [];


		let reporti = [];
		for(let i = 0; i < this.props.stockFinancials.length; i++){
			if(this.props.stockFinancials[i].report.bs.length > 0 & this.props.stockFinancials[i].report.ic.length > 0 & this.props.stockFinancials[i].report.cf.length > 0){
				reporti.push(i);
			}
		}

		for(let i = 0; i < reporti.length; i++){
			let temp = 0;
			for(let j = 0; j < this.props.stockFinancials[reporti[i]].report.cf.length; j++){
				if(this.props.stockFinancials[reporti[i]].report.cf[j].concept.includes('Operating')){
					temp += this.props.stockFinancials[reporti[i]].report.cf[j].value;
				}
			}
			operatingCashFlow.push(temp);
		}

		for(let i = 0; i < reporti.length; i++){
			let temp = 0;
			for(let j = 0; j < this.props.stockFinancials[reporti[i]].report.bs.length; j++){
				if(this.props.stockFinancials[reporti[i]].report.bs[j].concept.includes('Payable')){
					temp += this.props.stockFinancials[reporti[i]].report.bs[j].value;
				}
				else if(this.props.stockFinancials[reporti[i]].report.bs[j].concept.includes('Receivable')){
					temp += this.props.stockFinancials[reporti[i]].report.bs[j].value;
				}
				else if(this.props.stockFinancials[reporti[i]].report.bs[j].concept.includes('Current')){
					temp += this.props.stockFinancials[reporti[i]].report.bs[j].value;
				}
			}
			capitalExpenditure.push(temp);
		}

		for(let i = 0; i < reporti.length - 1; i++){
			FCF.push(
				operatingCashFlow[i] - (capitalExpenditure[i] - capitalExpenditure[i+1])
			);
		}

		for(let i = 0; i < FCF.length; i++){
			forecast.push(FCF[i]);
		}
		for(let i = 0; i < FCF.length; i++){
			let temp = 0;
			for(let j = 0; j < FCF.length; j++){
				temp += forecast[forecast.length-j-1];
			}
			forecast.push(temp/FCF.length);
		}

		let g = (forecast[FCF.length]/forecast[FCF.length-1]) - 1;
		let DCF = 0;
		for(let i = FCF.length - 1; i < FCF.length * 2 - 1; i++){
			DCF += forecast[i] / Math.pow(1+this.props.jacobVal.WACC,(2 + i - FCF.length));
		}

		let TEV = forecast[FCF.length*2 - 1]/(this.props.jacobVal.WACC-g);
		TEV = TEV/(1+this.props.jacobVal.WACC);
		TEV = TEV + DCF;


		this.props.handleUpdateDCF(TEV);
	}

	stockInfo(){
		let shareOutstanding = this.props.stockProfile.shareOutstanding * 1000000;
		let valuation = this.props.jacobVal.DCF/shareOutstanding;
		let reality = this.props.stockCandle[0];

		this.props.handleUpdateValuation(formatter.format(valuation));
		this.props.handleUpdateReality(formatter.format(reality));
	}

	inputOverride(title,placeholder, func){
		let tempInput = placeholder;
		return(
			<Form>
				<Form.Label style={{float: 'left'}}>{title}</Form.Label>
				<InputGroup className="mb-3">
				<FormControl type="text" onChange={(text) => {tempInput = text.target.value}}
					placeholder={String(placeholder)}
				/>
				<InputGroup.Append>
					<Button variant="outline-secondary" onClick={() => {func(tempInput)}}>Override</Button>
				</InputGroup.Append>
				</InputGroup>
			</Form>
		)
	}

	refresh(){
		setTimeout(this.getBeta, 300);
		setTimeout(this.genCreditRiskRate, 300);
		setTimeout(this.calculate, 300);
		setTimeout(this.DCF, 300);
		setTimeout(this.stockInfo, 300);
	}

	stockRefresh(stockInput){
		if(stockInput !== ''){
			this.props.handleUpdateStock(stockInput);
			this.props.handleUpdateStockCandle(stockInput);
			this.props.handleUpdateStockFinancials(stockInput);
			this.props.handleUpdateStockProfile(stockInput);
		}
	}

	dataCheck(){
		if((this.props.stockCandle.length === 0 || JSON.stringify(this.props.stockProfile)===JSON.stringify({}) || this.props.stockFinancials.length === 0) && this.props.jacobVal.stock !== ''){
			return(
				<Alert variant='danger'>
					Insufficient Data!
				</Alert>
			);
		} else {
			return (<div></div>);
		}
	}

	render(){
		return(
			<div className="App" style={{padding: '5%'}}>
			<h1>Jacob's Valuation Model</h1> 
			{this.dataCheck()}
			<Button variant="outline-secondary" style={{float: 'right'}} onClick={() => {this.refresh()}}>Refresh</Button>
			<br/>
			<br/>
				<div>
					<Card body style={{marginLeft: '20px', width: '30%', float: 'left'}}>
						{this.inputOverride('Tax Rate', this.props.jacobVal.taxRate, this.props.handleUpdateTaxRate)}
						{this.inputOverride('Beta', this.props.jacobVal.beta, this.props.handleUpdateBETA)}
						{this.inputOverride('Credit Risk Rate', String(100*this.props.jacobVal.creditRiskRate) + '%', this.props.handleUpdateCreditRiskRate)}
						{this.inputOverride('Market Return', String(100*this.props.jacobVal.marketReturn) + '%', this.props.handleUpdateMarketReturn)}
						{this.inputOverride('WACC', String(100*this.props.jacobVal.WACC) + '%', this.props.handleUpdateWACC)}
						{this.inputOverride('Firm Value', formatter.format(this.props.jacobVal.DCF), this.props.handleUpdateDCF)}
					</Card>
					<Card body style={{marginLeft: '20px'}}>
						<div style={{margin: '0 auto', width: '30%'}}>
							<Form>
								<Form.Label style={{float: 'left'}}>Stock Ticker</Form.Label>
								<InputGroup className="mb-3">
								<FormControl type="text" onChange={(text) => {this.setState({...this.state, stock: text.target.value})}}
									placeholder={this.props.jacobVal.stock}
								/>
								<InputGroup.Append>
									<Button variant="outline-secondary" onClick={() => {this.stockRefresh(this.state.stock)}}>Submit</Button>
								</InputGroup.Append>
								</InputGroup>
							</Form>
						</div>
						<div style={{margin: '0 auto', display: 'flex', marginLeft: '20%'}}>
							<Form style={{margin: '5%', width: '30%', float: 'left'}}>
								<Form.Label style={{float: 'left'}}>Stock Price</Form.Label>
								<FormControl type="text" placeholder={this.props.jacobVal.reality} />
							</Form>
							<Form style={{margin: '5%', width: '30%'}}>
								<Form.Label style={{float: 'left'}}>Valuation Price</Form.Label>
								<FormControl type="text" placeholder={this.props.jacobVal.valuation} />
							</Form>
						</div>
					</Card>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		govBondRate: state.govBondRate,
		inflationRate: state.inflationRate,
		SPYCandle: state.SPYCandle,
		stockCandle: state.stockCandle,
		stockFinancials: state.stockFinancials,
		stockProfile: state.stockProfile,
		jacobVal: state.jacobVal,
	};
};

export default connect(mapStateToProps, {
	handleUpdateGovBondRate,
	handleUpdateInflationRate,
	handleUpdateSPYCandle,
	handleUpdateStockCandle,
	handleUpdateStockFinancials,
	handleUpdateStockProfile,
	handleUpdateDCF,
	handleUpdateWACC,
	handleUpdateBETA,
	handleUpdateCreditRiskRate,
	handleUpdateMarketReturn,
	handleUpdateReality,
	handleUpdateStock,
	handleUpdateTaxRate,
	handleUpdateValuation
})(JacobValuation);
