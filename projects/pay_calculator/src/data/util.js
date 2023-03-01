export const formatNum = (num) => num.toFixed(2);

export const getCurrentFinancialYear = () => {
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth() + 1;
	const financialYearStart = currentMonth < 7 ? currentYear - 1 : currentYear;
	const financialYearEnd = financialYearStart + 1;
	return `${financialYearStart}-${financialYearEnd}`;
};
