import { getCurrentFinancialYear } from "../util";

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

const TAX_TABLE_ANNUAL_NR: TaxTableAnnualNR = {
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

const getAnnualTaxBracketNR = (financialYear: string, salary: number) => {
	const taxTableFY: Record<string, TaxTierAnnualNR> =
		TAX_TABLE_ANNUAL_NR[financialYear];
	const taxBracket = Object.keys(taxTableFY).find((key) => {
		const { taxMin, taxMax } = taxTableFY[key];
		return salary >= taxMin && salary <= taxMax;
	});
	return taxTableFY[taxBracket!];
};

export { TAX_TABLE_ANNUAL_NR, getAnnualTaxBracketNR };
