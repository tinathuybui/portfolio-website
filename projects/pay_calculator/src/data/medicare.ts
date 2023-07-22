interface MedicareTier {
	grossSalaryMin: number;
	grossSalaryMax: number;
	rate: number;
	calculateM: (salary: number, weeks: number) => number;
}

interface MedicareSurchargeThresholdTier {
	grossSalaryMin: number;
	grossSalaryMax: number;
	rate: number;
	calculateMLS: (salary: number) => number;
}

export const medicareTable: Record<string, MedicareTier> = {
	Tier0: {
		grossSalaryMin: 0,
		grossSalaryMax: 23365,
		rate: 0 / 100,
		calculateM: function() {
			return 0;
		},
	},
	Tier1: {
		grossSalaryMin: 23365,
		grossSalaryMax: 29207,
		rate: 1 / 10,
		calculateM: function(salary: number, weeks: number) {
			return ((salary - this.grossSalaryMin) * this.rate) / weeks;
		},
	},
	Tier2: {
		grossSalaryMin: 29207,
		grossSalaryMax: Infinity,
		rate: 2 / 100,
		calculateM: function(salary: number, weeks: number) {
			return (salary * this.rate) / weeks;
		},
	},
};

export const medicareSurchargeThresholdTable: Record<
	string,
	MedicareSurchargeThresholdTier
> = {
	Tier0: {
		grossSalaryMin: 0,
		grossSalaryMax: 90000,
		rate: 0 / 100,
		calculateMLS: function() {
			return 0;
		},
	},
	Tier1: {
		grossSalaryMin: 90001,
		grossSalaryMax: 105000,
		rate: 1 / 100,
		calculateMLS: function(salary: number) {
			return salary * this.rate;
		},
	},
	Tier2: {
		grossSalaryMin: 105001,
		grossSalaryMax: 140000,
		rate: 1.25 / 100,
		calculateMLS: function(salary: number) {
			return salary * this.rate;
		},
	},
	Tier3: {
		grossSalaryMin: 140001,
		grossSalaryMax: Infinity,
		rate: 1.5 / 100,
		calculateMLS: function(salary: number) {
			return salary * this.rate;
		},
	},
};

export const medicareSurchargeThresholdBracket = (salary: number) => {
	const mlsBracket = Object.keys(medicareSurchargeThresholdTable).find(
		(key) => {
			const {
				grossSalaryMin,
				grossSalaryMax,
			} = medicareSurchargeThresholdTable[key];
			return salary >= grossSalaryMin && salary <= grossSalaryMax;
		}
	);
	return medicareSurchargeThresholdTable[mlsBracket!];
};

export const medicareBracket = (salary: number) => {
	const mlsBracket = Object.keys(medicareTable).find((key) => {
		const { grossSalaryMin, grossSalaryMax } = medicareTable[key];
		return salary >= grossSalaryMin && salary <= grossSalaryMax;
	});
	return medicareTable[mlsBracket!];
};
