import api from './APIFactory';
import {sha256} from 'js-sha256';

let today = new Date();
let month = today.getMonth() + 1;
let day = today.getDate();
let year = today.getFullYear();

let key = 'bsrllo748v6tucpgfv0g';

//https://www.dnd5eapi.co/api/spells/acid-arrow/


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

export async function checkPassword(username, password){
    let result = await api('https://dylan-s-database.firebaseio.com/ruse/users.json', {
			headers: {
			    "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
                "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
    let temp = {};
    if(result.data[username]){
        if(sha256(password) === result.data[username].password){
            temp['check'] = true;
            temp['userInfo'] = {...result.data[username].userInfo, username};
	    } else {
            temp['check'] = false;
            temp['userInfo'] = {};
	    }
	}else {
        temp['check'] = false;
        temp['userInfo'] = {};
	}
    return (temp);
}

export async function newUser(username1, firstName1, lastName1, password1) {
	let result = await api('https://dylan-s-database.firebaseio.com/ruse/users/'+username1+'.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
    if(result.data === null){
        let result = await api.put('https://dylan-s-database.firebaseio.com/ruse/users/'+username1+'.json',
        {password: sha256(password1), userInfo: {firstName: firstName1, lastName: lastName1, username: username1}}
        )
        return result.status;
	} else {
        return false;
	}
}

export async function newStock(user, stock) {
    await api.post('https://dylan-s-database.firebaseio.com/ruse/users/'+user+'/userInfo/userStocks.json',
        {'stock': stock, count: 1}
        )
	let result = await api('https://dylan-s-database.firebaseio.com/ruse/users/'+user+'/userInfo/userStocks.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
    return result.data;
}

export async function deleteStock(user, key) {
    await api.delete('https://dylan-s-database.firebaseio.com/ruse/users/'+user+'/userInfo/userStocks/' + key +'.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}
    })
    let result = await api('https://dylan-s-database.firebaseio.com/ruse/users/'+user+'/userInfo/userStocks.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
    return result.data;
}

export async function addNewCharacter(name) {
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/characters.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
	let result1 = {...result.data, [name]: ''}
    await api.put('https://dylan-s-database.firebaseio.com/dnd/characters.json',
        result1
        )
	
    return result1;
}

export async function saveCharacter(name, data) {
	await api.put('https://dylan-s-database.firebaseio.com/dnd/characters/'+name+'.json', 
		data
	)
    let result = await api('https://dylan-s-database.firebaseio.com/dnd/characters.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
	
    return result.data;
}

export async function grabCharacters() {
    let result = await api('https://dylan-s-database.firebaseio.com/dnd/characters.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
	
    return result.data;
}

export async function update5e(){
	let temp=['ability-scores','conditions', 'damage-types', 'equipment-categories', 'equipment', 'features', 'languages', 'magic-schools', 'monsters', 
	'proficiencies', 'races', 'skills', 'spellcasting', 'spells', 'starting-equipment', 'subclasses', 'subraces', 'traits', 'weapon-properties']
	for(let i = 0; i < temp.length; i++){
		let result = await api('https://www.dnd5eapi.co/api/ability-scores');
		await api.put('https://dylan-s-database.firebaseio.com/dnd/5e/ability-scores.json',
		result.data
		)
	}

	let result1 = await api('https://dylan-s-database.firebaseio.com/dnd/5e.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
    return result1.data;
}

export async function grab5e(){
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/5e.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
    return result.data;
}

export async function update5eDetails(dndInfo){
	let temp=['ability-scores','conditions', 'classes', 'damage-types', 'equipment-categories', 'equipment', 'features', 'languages', 'magic-schools', 'monsters', 
	'proficiencies', 'races', 'skills', 'spellcasting', 'spells', 'starting-equipment', 'subclasses', 'subraces', 'traits', 'weapon-properties']
	for(let i = 0; i < temp.length; i++){
		for(let j = 0; j < dndInfo.generalInfo[temp[i]].count; j++){
			if(dndInfo.generalInfo[temp[i]].results[j].url){
				let result = await api('https://www.dnd5eapi.co' + dndInfo.generalInfo[temp[i]].results[j].url);
				await api.put('https://dylan-s-database.firebaseio.com/dnd/5e/specifics/'+temp[i]+'/'+result.data.name+'.json',
				result.data
			)
			}
		}
	}

	let result1 = await api('https://dylan-s-database.firebaseio.com/dnd/5e.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
    return result1.data;
}

export async function grabDraggable(environment){
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
	let temp = {};
	temp['items'] = result.data.items;
	temp['current'] = (result.data.options[environment].items) ? result.data.options[environment].items : [];
	temp['scale'] = Number(result.data.options[environment].scale);
    return temp;
}

export async function updateCurrent(environment, current){
	await api.put('https://dylan-s-database.firebaseio.com/dnd/environments/options/' + environment + '/items.json',
	current
	)

	return grabDraggable(environment);
}

export async function addItem(item, component, tag){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data.items;
	temp[item] = {title: component, tag: [[tag]]};
	await api.put('https://dylan-s-database.firebaseio.com/dnd/environments/items.json',
		temp
		)
	return temp;
}

export async function newEnvironment(name){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments/options.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	temp[name] = { name: name, items: [], scale: 30};
	await api.put('https://dylan-s-database.firebaseio.com/dnd/environments/options.json',
		temp
		)
	let tempKeys = Object.keys(temp);

	let result1 = await api('https://dylan-s-database.firebaseio.com/dnd/environments.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
	let temp1 = {};
	temp1['items'] = result1.data.items;
	temp1['current'] = (result1.data.options[name].items) ? result1.data.options[name].items : [];
	temp1['scale'] = Number(result1.data.options[name].scale);

	return [temp1, tempKeys];
}

export async function grabOptions(){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments/options.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = [];
	for(var key in result.data){
		temp.push(key);
	}	
	return temp;
}

export async function changeScale(scale, environment){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments/options/'+environment+'.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	temp.scale = scale;
	await api.put('https://dylan-s-database.firebaseio.com/dnd/environments/options/'+environment+'.json',
		temp
		)
	return temp;
}

export async function grabCampaigns(){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = Object.keys(result.data);
	return temp;
}

export async function changeCampaign(campaign){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp =  result.data[campaign];
	return temp;
}

export async function addCampaign(campaign){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	temp[campaign] = {[`First Tab`]: [{notes:[], subnotepad: "First Subtab"}]};
	
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns.json',
		temp
		)
	return temp[campaign];
}

export async function addNotepad(campaign, notepad){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	temp[notepad] = '';
	
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json',
		temp
		)

	return temp;
}

export async function addSubnotepad(campaign, notepad, subnotepad){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	if(temp[notepad] === ''){
		temp[notepad] = [{subnotepad: subnotepad, notes: []}]
	} else {
		temp[notepad].push({subnotepad: subnotepad, notes: []})
	}
	
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json',
		temp
		)

	return temp;
}

export async function addNote(campaign, notepad, subnotepad, object, size){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	for(let i = 0; i < temp[notepad].length; i++){
		if(temp[notepad][i].subnotepad === subnotepad){
			if(Object.keys(temp[notepad][i]).includes('notes')){
				temp[notepad][i].notes.push({object: String(object), pLeft: '200', pTop: '200', size: size});
			} else {
				temp[notepad][i]['notes'] = [{object: String(object), pLeft: '200', pTop: '200', size: size}];
			}
		}
	}
	
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json',
		temp
		)

	return temp;
}

export async function updateNote(campaign, notepad, subnotepad, notes){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	for(let i = 0; i < temp[notepad].length; i++){
		if(temp[notepad][i].subnotepad === subnotepad){
			temp[notepad][i].notes = notes;
		}
	}
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json',
		temp
		)

	return temp;
}

export async function deleteNote(campaign, notepad, subnotepad, notes){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	for(let i = 0; i < temp[notepad].length; i++){
		temp[notepad][i].notes = notes;
	}
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json',
		temp
		)

	return temp;
}