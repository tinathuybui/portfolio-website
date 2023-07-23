import { WEEKS } from "../date";
import { getCurrentFinancialYear } from "../util";
import { getAnnualTaxBracketNR } from "./TaxTierAnnualNR";

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

const TAXTABLE_NR: TaxTableNR = {
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

const getTaxBracketNR = (financialYear: string, weeklyGross: number) => {
	const taxTableFY: Record<string, TaxTierNR> = TAXTABLE_NR[financialYear];
	const taxBracket = Object.keys(taxTableFY).find((key) => {
		const { taxMin, taxMax } = taxTableFY[key];
		return weeklyGross >= taxMin && weeklyGross < taxMax;
	});
	return taxTableFY[taxBracket!];
};

export { TAXTABLE_NR, getTaxBracketNR };
