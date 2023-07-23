import { WEEKS } from "../date";
import { getCurrentFinancialYear } from "../util";
import { getAnnualTaxBracket } from "./TaxTierAnnual";

interface TaxTier {
	taxMin: number;
	taxMax: number;
	a: number;
	b: number;
	calculateTaxAmount: (
		this: TaxTier,
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

interface TaxTable {
	[year: string]: {
		[tier: number]: TaxTier;
	};
}

const TAX_TABLE: TaxTable = {
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
						const taxBracket = getAnnualTaxBracket(
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
						const taxBracket = getAnnualTaxBracket(
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
						const taxBracket = getAnnualTaxBracket(
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
						const taxBracket = getAnnualTaxBracket(
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
						const taxBracket = getAnnualTaxBracket(
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
						Math.round(annuallyGross / 52 + 0.99) * this.a -
						this.b -
						weeklyMedicare,
					fortnighttax:
						Math.round((weeklyGross + 0.99) * this.a - this.b) * 2 -
						fortnightMedicare,
					monthlytax:
						Math.round(
							(Math.round((weeklyGross + 0.99) * this.a - this.b) * 52) / 12
						) - monthlyMedicare,

					annuallytax: function() {
						const currentFinancialYear = getCurrentFinancialYear();
						const taxBracket = getAnnualTaxBracket(
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
						const taxBracket = getAnnualTaxBracket(
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
						const taxBracket = getAnnualTaxBracket(
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

const getTaxBracket = (financialYear: string, weeklyGross: number) => {
	const taxTableFY: Record<string, TaxTier> = TAX_TABLE[financialYear];
	const taxBracket = Object.keys(taxTableFY).find((key) => {
		const { taxMin, taxMax } = taxTableFY[key];
		return weeklyGross >= taxMin && weeklyGross < taxMax;
	});
	return taxTableFY[taxBracket!];
};

export { TAX_TABLE, getTaxBracket };
