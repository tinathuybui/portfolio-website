import { getCurrentFinancialYear } from "./util";
import { WEEKS } from "./date";

interface TaxTierAnnual {
	preTaxMax?: number;
	taxMin: number;
	taxMax: number;
	taxRate: number;
	taxBase: number;
	calculateAnnualTaxAmount: (salary: number, weeks: number) => number;
}

interface TaxTableAnnual {
	[year: string]: {
		[tier: number]: TaxTierAnnual;
	};
}

const taxTableAnnual: TaxTableAnnual = {
	[getCurrentFinancialYear()]: {
		1: {
			taxMin: 0,
			taxMax: 18200,
			taxRate: 0,
			taxBase: 0,
			calculateAnnualTaxAmount: function() {
				return 0;
			},
		},
		2: {
			preTaxMax: 18200,
			taxMin: 18201,
			taxMax: 45000,
			taxRate: 0.19,
			taxBase: 0,
			calculateAnnualTaxAmount: function(salary: number, weeks: number) {
				return (this.taxRate * (salary - this.preTaxMax!)) / weeks;
			},
		},
		3: {
			preTaxMax: 45000,
			taxMin: 45001,
			taxMax: 120000,
			taxRate: 0.325,
			taxBase: 5092,
			calculateAnnualTaxAmount: function(salary: number, weeks: number) {
				return (
					(this.taxBase + this.taxRate * (salary - this.preTaxMax!)) / weeks
				);
			},
		},
		4: {
			preTaxMax: 120000,
			taxMin: 120001,
			taxMax: 180000,
			taxRate: 0.37,
			taxBase: 29467,
			calculateAnnualTaxAmount: function(salary: number, weeks: number) {
				return (
					(this.taxBase + this.taxRate * (salary - this.preTaxMax!)) / weeks
				);
			},
		},
		5: {
			preTaxMax: 180000,
			taxMin: 180001,
			taxMax: Infinity,
			taxRate: 0.45,
			taxBase: 51667,
			calculateAnnualTaxAmount: function(salary: number, weeks: number) {
				return (
					(this.taxBase + this.taxRate * (salary - this.preTaxMax!)) / weeks
				);
			},
		},
	},
};

interface TaxTier {
	taxMin: number;
	taxMax: number;
	a: number;
	b: number;
	calculateTaxAmount: (
		this: TaxTierNR,
		weeklyGross?: number,
		annuallyGross?: number,
		weeklyMedicare?: number,
		fortnightMedicare?: number,
		monthlyMedicare?: number
	) => {
		weeklytax: number;
		fortnighttax: number;
		monthlytax: number;
		annuallytax: () => number;
	};
}

interface TaxTable {
	[year: string]: {
		[tier: number]: TaxTier;
	};
}

export const taxTable: TaxTable = {
	[getCurrentFinancialYear()]: {
		1: {
			taxMin: 0,
			taxMax: 359,
			a: 0,
			b: 0,
			calculateTaxAmount: function() {
				return {
					weeklytax: 0,
					fortnighttax: 0,
					monthlytax: 0,
					annuallytax: function() {
						return 0;
					},
				};
			},
		},
		2: {
			taxMin: 359,
			taxMax: 438,
			a: 0.19,
			b: 68.3462,
			calculateTaxAmount: function(
				weeklyGross,
				annuallyGross,
				weeklyMedicare,
				fortnightMedicare,
				monthlyMedicare
			) {
				return {
					weeklytax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) -
						weeklyMedicare!,
					fortnighttax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare!,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross! + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare!,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracket(
							currentFinancialYear,
							annuallyGross!
						);
						return taxBracket?.calculateAnnualTaxAmount(
							annuallyGross!,
							WEEKS.ANNUALLY
						);
					},
				};
			},
		},
		3: {
			taxMin: 438,
			taxMax: 548,
			a: 0.29,
			b: 112.1942,
			calculateTaxAmount: function(
				weeklyGross,
				annuallyGross,
				weeklyMedicare,
				fortnightMedicare,
				monthlyMedicare
			) {
				return {
					weeklytax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) -
						weeklyMedicare!,
					fortnighttax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare!,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross! + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare!,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracket(
							currentFinancialYear,
							annuallyGross!
						);
						return taxBracket?.calculateAnnualTaxAmount(
							annuallyGross!,
							WEEKS.ANNUALLY
						);
					},
				};
			},
		},
		4: {
			taxMin: 548,
			taxMax: 721,
			a: 0.21,
			b: 68.3465,
			calculateTaxAmount: function(
				weeklyGross,
				annuallyGross,
				weeklyMedicare,
				fortnightMedicare,
				monthlyMedicare
			) {
				return {
					weeklytax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) -
						weeklyMedicare!,
					fortnighttax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare!,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross! + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare!,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracket(
							currentFinancialYear,
							annuallyGross!
						);
						return taxBracket?.calculateAnnualTaxAmount(
							annuallyGross!,
							WEEKS.ANNUALLY
						);
					},
				};
			},
		},
		5: {
			taxMin: 721,
			taxMax: 865,
			a: 0.219,
			b: 74.8369,
			calculateTaxAmount: function(
				weeklyGross,
				annuallyGross,
				weeklyMedicare,
				fortnightMedicare,
				monthlyMedicare
			) {
				return {
					weeklytax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) -
						weeklyMedicare!,
					fortnighttax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare!,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross! + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare!,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracket(
							currentFinancialYear,
							annuallyGross!
						);
						return taxBracket?.calculateAnnualTaxAmount(
							annuallyGross!,
							WEEKS.ANNUALLY
						);
					},
				};
			},
		},
		6: {
			taxMin: 865,
			taxMax: 1282,
			a: 0.3477,
			b: 186.2119,
			calculateTaxAmount: function(
				weeklyGross,
				annuallyGross,
				weeklyMedicare,
				fortnightMedicare,
				monthlyMedicare
			) {
				return {
					weeklytax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) -
						weeklyMedicare!,
					fortnighttax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare!,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross! + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare!,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracket(
							currentFinancialYear,
							annuallyGross!
						);
						return taxBracket?.calculateAnnualTaxAmount(
							annuallyGross!,
							WEEKS.ANNUALLY
						);
					},
				};
			},
		},

		7: {
			taxMin: 1282,
			taxMax: 2307,
			a: 0.345,
			b: 182.7504,
			calculateTaxAmount: function(
				weeklyGross,
				annuallyGross,
				weeklyMedicare,
				fortnightMedicare,
				monthlyMedicare
			) {
				return {
					weeklytax:
						Math.round(annuallyGross! / 52 + 0.99) * this.a -
						this.b -
						weeklyMedicare!,
					fortnighttax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare!,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross! + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare!,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracket(
							currentFinancialYear,
							annuallyGross!
						);
						return taxBracket?.calculateAnnualTaxAmount(
							annuallyGross!,
							WEEKS.ANNUALLY
						);
					},
				};
			},
		},

		8: {
			taxMin: 2307,
			taxMax: 3461,
			a: 0.39,
			b: 286.5965,
			calculateTaxAmount: function(
				weeklyGross,
				annuallyGross,
				weeklyMedicare,
				fortnightMedicare,
				monthlyMedicare
			) {
				return {
					weeklytax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) -
						weeklyMedicare!,
					fortnighttax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare!,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross! + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare!,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracket(
							currentFinancialYear,
							annuallyGross!
						);
						return taxBracket?.calculateAnnualTaxAmount(
							annuallyGross!,
							WEEKS.ANNUALLY
						);
					},
				};
			},
		},

		9: {
			taxMin: 3461,
			taxMax: Infinity,
			a: 0.47,
			b: 563.5196,
			calculateTaxAmount: function(
				weeklyGross,
				annuallyGross,
				weeklyMedicare,
				fortnightMedicare,
				monthlyMedicare
			) {
				return {
					weeklytax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) -
						weeklyMedicare!,
					fortnighttax:
						Math.round((weeklyGross! + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare!,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross! + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare!,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracket(
							currentFinancialYear,
							annuallyGross!
						);
						return taxBracket?.calculateAnnualTaxAmount(
							annuallyGross!,
							WEEKS.ANNUALLY
						);
					},
				};
			},
		},
	},
};

const getAnnualTaxBracket = (financialYear: string, salary: number) => {
	const taxTableFY: Record<string, TaxTierAnnual> =
		taxTableAnnual[financialYear]; // Add type annotation here
	const taxBracket = Object.keys(taxTableFY).find((key) => {
		const { taxMin, taxMax } = taxTableFY[key];
		return salary >= taxMin && salary <= taxMax;
	});
	return taxTableFY[taxBracket!];
};

export const getTaxBracket = (financialYear: string, weeklyGross: number) => {
	const taxTableFY: Record<string, TaxTier> = taxTable[financialYear];
	const taxBracket = Object.keys(taxTableFY).find((key) => {
		const { taxMin, taxMax } = taxTableFY[key];
		return weeklyGross >= taxMin && weeklyGross < taxMax;
	});
	return taxTableFY[taxBracket!];
};

interface TaxTierAnnualNR {
	preTaxMax?: number;
	taxMin: number;
	taxMax: number;
	taxRate: number;
	taxBase: number;
	calculateAnnualTaxAmount: (salary: number, weeks: number) => number;
}

interface TaxTableAnnualNR {
	[year: string]: {
		[tier: number]: TaxTierAnnualNR;
	};
}

const taxTableAnnualNR: TaxTableAnnualNR = {
	[getCurrentFinancialYear()]: {
		1: {
			taxMin: 0,
			taxMax: 120000,
			taxRate: 0.325,
			taxBase: 0,
			calculateAnnualTaxAmount: function(salary: number, weeks: number) {
				return (this.taxRate * salary) / weeks;
			},
		},
		2: {
			preTaxMax: 120000,
			taxMin: 120001,
			taxMax: 180000,
			taxRate: 0.37,
			taxBase: 39000,
			calculateAnnualTaxAmount: function(salary: number, weeks: number) {
				return (
					(this.taxBase + this.taxRate * (salary - this.preTaxMax!)) / weeks
				);
			},
		},
		3: {
			preTaxMax: 180000,
			taxMin: 180001,
			taxMax: Infinity,
			taxRate: 0.45,
			taxBase: 61200,
			calculateAnnualTaxAmount: function(salary: number, weeks: number) {
				return (
					(this.taxBase + this.taxRate * (salary - this.preTaxMax!)) / weeks
				);
			},
		},
	},
};

interface TaxTierNR {
	taxMin: number;
	taxMax: number;
	a: number;
	b: number;
	calculateTaxAmount: (
		this: TaxTierNR,
		weeklyGross: number,
		annuallyGross: number,
		weeklyMedicare: number,
		fortnightMedicare: number,
		monthlyMedicare: number
	) => {
		weeklytax: number;
		fortnighttax: number;
		monthlytax: number;
		annuallytax: () => number;
	};
}

interface TaxTableNR {
	[year: string]: {
		[tier: number]: TaxTierNR;
	};
}

export const taxTableNR: TaxTableNR = {
	[getCurrentFinancialYear()]: {
		1: {
			taxMin: 0,
			taxMax: 2307,
			a: 0.325,
			b: 0.325,
			calculateTaxAmount: function(
				weeklyGross,
				annuallyGross,
				weeklyMedicare,
				fortnightMedicare,
				monthlyMedicare
			) {
				return {
					weeklytax:
						Math.round((weeklyGross + 0.99) * this.a - this.b) - weeklyMedicare,
					fortnighttax:
						Math.round((weeklyGross + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracketNR(
							currentFinancialYear,
							annuallyGross
						);
						console.log("ss", taxBracket);
						return taxBracket?.calculateAnnualTaxAmount(
							annuallyGross,
							WEEKS.ANNUALLY
						);
					},
				};
			},
		},
		2: {
			taxMin: 2307,
			taxMax: 3461,
			a: 0.37,
			b: 103.8462,
			calculateTaxAmount: function(
				weeklyGross,
				annuallyGross,
				weeklyMedicare,
				fortnightMedicare,
				monthlyMedicare
			) {
				return {
					weeklytax:
						Math.round((weeklyGross + 0.99) * this.a - this.b) - weeklyMedicare,
					fortnighttax:
						Math.round((weeklyGross + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracketNR(
							currentFinancialYear,
							annuallyGross
						);
						return taxBracket?.calculateAnnualTaxAmount(
							annuallyGross,
							WEEKS.ANNUALLY
						);
					},
				};
			},
		},
		3: {
			taxMin: 3461,
			taxMax: Infinity,
			a: 0.45,
			b: 380.7692,
			calculateTaxAmount: function(
				weeklyGross,
				annuallyGross,
				weeklyMedicare,
				fortnightMedicare,
				monthlyMedicare
			) {
				return {
					weeklytax:
						Math.round((weeklyGross + 0.99) * this.a - this.b) - weeklyMedicare,
					fortnighttax:
						Math.round((weeklyGross + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracketNR(
							currentFinancialYear,
							annuallyGross
						);
						return taxBracket?.calculateAnnualTaxAmount(
							annuallyGross,
							WEEKS.ANNUALLY
						);
					},
				};
			},
		},
	},
};

const getAnnualTaxBracketNR = (financialYear: string, salary: number) => {
	const taxTableFY: Record<string, TaxTierAnnualNR> =
		taxTableAnnualNR[financialYear];
	const taxBracket = Object.keys(taxTableFY).find((key) => {
		const { taxMin, taxMax } = taxTableFY[key];
		return salary >= taxMin && salary <= taxMax;
	});
	return taxTableFY[taxBracket!];
};

export const getTaxBracketNR = (financialYear: string, weeklyGross: number) => {
	const taxTableFY: Record<string, TaxTierNR> = taxTableNR[financialYear];
	const taxBracket = Object.keys(taxTableFY).find((key) => {
		const { taxMin, taxMax } = taxTableFY[key];
		return weeklyGross >= taxMin && weeklyGross < taxMax;
	});
	return taxTableFY[taxBracket!];
};
