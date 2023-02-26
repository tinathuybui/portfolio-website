import {
	taxTable,
	medicareSurchargeThresholdTable,
	medicareTable,
} from "./constants";
export const formatNum = (num) => num.toFixed(2);

export const getCurrentFinancialYear = () => {
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth() + 1;
	const financialYearStart = currentMonth < 7 ? currentYear - 1 : currentYear;
	const financialYearEnd = financialYearStart + 1;
	return `${financialYearStart}-${financialYearEnd}`;
};

export const getTaxBracket = (financialYear, salary) => {
	console.log(taxTable[financialYear]);
	const taxTableFY = taxTable[financialYear];
	const taxBracket = Object.keys(taxTableFY).find((key) => {
		const { taxMin, taxMax } = taxTableFY[key];
		return salary >= taxMin && salary <= taxMax;
	});
	return taxTableFY[taxBracket];
};

export const medicareSurchargeThresholdBracket = (salary) => {
	const mlsBracket = Object.keys(medicareSurchargeThresholdTable).find(
		(key) => {
			const { grossSalaryMin, grossSalaryMax } =
				medicareSurchargeThresholdTable[key];
			return salary >= grossSalaryMin && salary <= grossSalaryMax;
		}
	);
	return medicareSurchargeThresholdTable[mlsBracket];
};

export const medicareBracket = (salary) => {
	const mlsBracket = Object.keys(medicareTable).find((key) => {
		const { grossSalaryMin, grossSalaryMax } = medicareTable[key];
		return salary >= grossSalaryMin && salary <= grossSalaryMax;
	});
	return medicareTable[mlsBracket];
};
