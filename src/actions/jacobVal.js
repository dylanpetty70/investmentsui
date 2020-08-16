export const UPDATE_DCF = 'UPDATE_DCF';
export const UPDATE_WACC = 'UPDATE_WACC';
export const UPDATE_BETA = 'UPDATE_BETA';
export const UPDATE_CREDIT_RISK_RATE = 'UPDATE_CREDIT_RISK_RATE';
export const UPDATE_DISCOUNT_RATE = 'UPDATE_DISCOUNT_RATE';
export const UPDATE_MARKET_RETURN = 'UPDATE_MARKET_RETURN';
export const UPDATE_REALITY = 'UPDATE_REALITY';
export const UPDATE_STOCK = 'UPDATE_STOCK';
export const UPDATE_TAX_RATE = 'UPDATE_TAX_RATE';
export const UPDATE_VALUATION = 'UPDATE_VALUATION';

export function handleUpdateDCF(DCF) {
	return {
		type: UPDATE_DCF,
		DCF
	};
}
export function handleUpdateWACC(WACC) {
	return {
		type: UPDATE_WACC,
		WACC
	};
}
export function handleUpdateBETA(beta) {
	return {
		type: UPDATE_BETA,
		beta
	};
}
export function handleUpdateCreditRiskRate(creditRiskRate) {
	return {
		type: UPDATE_CREDIT_RISK_RATE,
		creditRiskRate
	};
}
export function handleUpdateMarketReturn(marketReturn) {
	return {
		type: UPDATE_MARKET_RETURN,
		marketReturn
	};
}
export function handleUpdateReality(reality) {
	return {
		type: UPDATE_REALITY,
		reality
	};
}
export function handleUpdateStock(stock) {
	return {
		type: UPDATE_STOCK,
		stock
	};
}
export function handleUpdateTaxRate(taxRate) {
	return {
		type: UPDATE_TAX_RATE,
		taxRate
	};
}
export function handleUpdateValuation(valuation) {
	return {
		type: UPDATE_VALUATION,
		valuation
	};
}