import api from './APIFactory';


let today = new Date();
let month = today.getMonth() + 1;
let day = today.getDate();
let year = today.getFullYear();

let key = 'bsrllo748v6tucpgfv0g';

export async function genGovBondRate(){
	let lastYear = year - 1;
	let result = await api('https://www.quandl.com/api/v3/datasets/FRED/DGS30?start_date='+lastYear+'-'+month+'-'+day+'&end_date='+year+'-'+month+'-'+day+'&api_key=qVK5koi1XoCxw1nPuuKz',{
			headers: {
				'accept': '*/*',
			}})
	let data = result.data;
	let temp = [];
	let total = 0;
	for(let i = 0; i < data.dataset.data.length; i++){
		temp.push(data.dataset.data[i][1]);
	}
	for(let i = 0; i < temp.length; i++){
		total += Math.pow(temp[i], 1/30);
	}
	let governmentBondRate = (total / temp.length) - 1;
	return governmentBondRate;
}

export async function genInflationRate() {
	let lastYear = year - 1;
	let result = await api.get('https://www.quandl.com/api/v3/datasets/FRED/T10YIE?start_date='+lastYear+'-'+month+'-'+day+'&end_date='+year+'-'+month+'-'+day+'&api_key=qVK5koi1XoCxw1nPuuKz',{
			headers: {
				'accept': '*/*',
			}})
	let data = result.data;
	let temp = [];
	let total = 0;
	for(let i = 0; i < data.dataset.data.length; i++){
		temp.push(data.dataset.data[i][1]);
	}
	for(let i = 0; i < temp.length; i++){
		total += Math.pow(temp[i], 1/10);
	}
	let inflationRate = (total / temp.length) - 1;
	return inflationRate;
}

export async function genSPYCandle() {
	let unixCurrent = Math.floor(new Date().getTime()/1000.0);
	let unixYearBefore = unixCurrent - 60*60*24*365;

	let result = await api.get('https://finnhub.io/api/v1/stock/candle?resolution=D&from='+unixYearBefore+'&to='+unixCurrent+'&symbol=SPY&token='+key,{
			headers: {
				'accept': '*/*',
			}})
	let data = result.data;
	return data.c;
}

export async function genStockCandle(stock){
	let unixCurrent = Math.floor(new Date().getTime()/1000.0);
	let unixYearBefore = unixCurrent - 60*60*24*365;

	let result = await api.get('https://finnhub.io/api/v1/stock/candle?resolution=D&from='+unixYearBefore+'&to='+unixCurrent+'&symbol='+stock+'&token='+key,{
			headers: {
				'accept': '*/*',
			}})
	let data = result.data;
	if(data.s === 'ok'){
		return data.c;
	} else {
		return [];
	}
}

export async function genStockFinancials(stock){
	let result = await api.get('https://finnhub.io/api/v1/stock/financials-reported?symbol='+stock+'&token='+key,{
			headers: {
				'accept': '*/*',
			}})
	let data = result.data;
	return data.data;
}

export async function genStockProfile(stock){
	let result = await api.get('https://finnhub.io/api/v1/stock/profile2?symbol='+stock+'&token='+key,{
			headers: {
				'accept': '*/*',
			}})
	let data = result.data;
	return data;
}

export async function genStockQuote(stock){
	let result = await api.get('https://finnhub.io/api/v1/quote?symbol='+stock+'&token='+key,{
			headers: {
				'accept': '*/*',
			}})
	let data = result.data;
	return data;
}

