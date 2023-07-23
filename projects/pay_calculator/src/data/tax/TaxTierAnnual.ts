import { getCurrentFinancialYear } from "../util";

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

const TAX_TABLE_ANNUAL: TaxTableAnnual = {
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

const getAnnualTaxBracket = (financialYear: string, salary: number) => {
	const taxTableFY: Record<string, TaxTierAnnual> =
		TAX_TABLE_ANNUAL[financialYear]; // Add type annotation here
	const taxBracket = Object.keys(taxTableFY).find((key) => {
		const { taxMin, taxMax } = taxTableFY[key];
		return salary >= taxMin && salary <= taxMax;
	});
	return taxTableFY[taxBracket!];
};

export { TAX_TABLE_ANNUAL, getAnnualTaxBracket };
