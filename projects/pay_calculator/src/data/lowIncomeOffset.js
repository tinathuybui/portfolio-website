export const lowIncomeOffsetTable = {
	Salary1: {
		grossSalaryMin: 0,
		grossSalaryMax: 37500,
		offset: 700,
		calculateLITO: function (annuallyGross) {
			return annuallyGross === 0 ? 0 : this.offset;
		},
	},
	Salary2: {
		grossSalaryMin: 37501,
		grossSalaryMax: 45000,
		preGrossSalaryMax: 37500,
		offset: 700,
		calculateLITO: function (annuallyGross) {
			return this.offset - 0.05 * (annuallyGross - this.preGrossSalaryMax);
		},
	},
	Salary3: {
		grossSalaryMin: 45001,
		grossSalaryMax: 66667,
		preGrossSalaryMax: 45000,
		offset: 325,
		calculateLITO: function (annuallyGross) {
			return this.offset - 0.015 * (annuallyGross - this.preGrossSalaryMax);
		},
	},
	Salary4: {
		grossSalaryMin: 66668,
		grossSalaryMax: Infinity,
		offset: 0,
		calculateLITO: function (annuallyGross) {
			return this.offset;
		},
	},
};

export const lowIncomeOffsetBracket = (salary) => {
	const mlsBracket = Object.keys(lowIncomeOffsetTable).find((key) => {
		const { grossSalaryMin, grossSalaryMax } = lowIncomeOffsetTable[key];
		return salary >= grossSalaryMin && salary <= grossSalaryMax;
	});
	return lowIncomeOffsetTable[mlsBracket];
};
