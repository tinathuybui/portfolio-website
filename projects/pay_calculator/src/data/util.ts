export const formatNum = (num: number): number => parseInt(num.toFixed(2), 10);

export const getCurrentFinancialYear = () => {
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth() + 1;
	const financialYearStart = currentMonth < 7 ? currentYear - 1 : currentYear;
	const financialYearEnd = financialYearStart + 1;
	return `${financialYearStart}-${financialYearEnd}`;
};

export const formatter = (value: number): string =>
	`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getYearArray = (numYears = 5): number[] => {
	const nextYear = new Date().getFullYear() + 1;
	const yearArray = [];

	for (let i = 0; i < numYears; i++) {
		yearArray.push(nextYear + i);
	}

	return yearArray;
};
