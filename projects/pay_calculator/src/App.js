import { InputNumber, Select, Switch, Table } from "antd";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { intialData, columns, WEEKS } from "./constants";
import {
	formatNum,
	getCurrentFinancialYear,
	getTaxBracket,
	medicareSurchargeThresholdBracket,
	medicareBracket,
} from "./util";
import "./App.css";

function App() {
	const currentFinancialYear = getCurrentFinancialYear();
	const [salary, setSalary] = useState(0);
	const [data, setData] = useState(intialData);
	const [superData, setSuperData] = useState(10.5);
	const [isSuper, setIsSuper] = useState(false);
	const [isResident, setIsResident] = useState(true);
	const [medicare, setMedicare] = useState(true);

	useEffect(() => {
		console.log(salary);

		let tempSalary = 0;

		if (salary && salary >= 0) tempSalary = salary;

		const newData = [...data];

		let weeklyGross = 0;
		let fortnightlyGross = 0;
		let monthlyGross = 0;
		let annuallyGross = 0;

		if (isSuper) {
			weeklyGross = tempSalary / (1 + superData / 100) / 52;
			fortnightlyGross = tempSalary / (1 + superData / 100) / 26;
			monthlyGross = tempSalary / (1 + superData / 100) / 12;
			annuallyGross = tempSalary / (1 + superData / 100);
		} else {
			weeklyGross = tempSalary / 52;
			fortnightlyGross = tempSalary / 26;
			monthlyGross = tempSalary / 12;
			annuallyGross = tempSalary;
		}

		const weeklyF = formatNum(weeklyGross);
		const fortnightlyF = formatNum(fortnightlyGross);
		const monthlyF = formatNum(monthlyGross);
		const annuallyF = formatNum(annuallyGross);

		newData[0].weekly = weeklyF;
		newData[0].fortnightly = fortnightlyF;
		newData[0].monthly = monthlyF;
		newData[0].annually = annuallyF;

		let weeklySuper = 0;
		let fortnightlySuper = 0;
		let monthlySuper = 0;
		let annuallySuper = 0;

		// prettier-ignore
		if (isSuper) {
			weeklySuper = (tempSalary/52) - weeklyGross;
			fortnightlySuper = (tempSalary/26) - fortnightlyGross;
			monthlySuper = (tempSalary / 12)-monthlyGross;
			annuallySuper = tempSalary - annuallyGross;
		} else {
			weeklySuper = (weeklyGross * superData) / 100;
			fortnightlySuper = (fortnightlyGross * superData) / 100;
			monthlySuper = (monthlyGross * superData) / 100;
			annuallySuper = (annuallyGross * superData) / 100;
		}

		const mBracket = medicareBracket(tempSalary);

		let weeklyMedicare = mBracket.calculateM(tempSalary, WEEKS.WEEKLY);
		let fortnightMedicare = mBracket.calculateM(tempSalary, WEEKS.FORTNIGHTLY);
		let monthlyMedicare = mBracket.calculateM(tempSalary, WEEKS.MONTHLY);
		let annuallyMedicare = mBracket.calculateM(tempSalary, WEEKS.ANNUALLY);

		const mlsBracket = medicareSurchargeThresholdBracket(tempSalary);

		let weeklyMLS = mlsBracket.calculateMLS(0);
		let fortnightMLS = mlsBracket.calculateMLS(0);
		let monthlyMLS = mlsBracket.calculateMLS(0);
		let annuallyMLS = mlsBracket.calculateMLS(tempSalary);

		let weeklyLITO = 0;
		let fortnightLITO = 0;
		let monthlyLITO = 0;
		let annuallyLITO = 0;

		if (annuallyGross <= 37500 && annuallyGross > 0) {
			weeklyLITO = 0;
			fortnightLITO = 0;
			monthlyLITO = 0;
			annuallyLITO = 700;
		} else if (37501 < annuallyGross && annuallyGross <= 45000) {
			weeklyLITO = 0;
			fortnightLITO = 0;
			monthlyLITO = 0;
			annuallyLITO = 700 - 0.05 * (annuallyGross - 37500);
		} else if (45001 < annuallyGross && annuallyGross <= 66667) {
			weeklyLITO = 0;
			fortnightLITO = 0;
			monthlyLITO = 0;
			annuallyLITO = 325 - 0.0015 * (annuallyGross - 45000);
		} else {
			weeklyLITO = 0;
			fortnightLITO = 0;
			monthlyLITO = 0;
			annuallyLITO = 0;
		}

		let weeklyLMITO = 0;
		let fortnightLMITO = 0;
		let monthlyLMITO = 0;
		let annuallyLMITO = 0;

		if (annuallyGross <= 37000 && annuallyGross > 0) {
			weeklyLMITO = 0;
			fortnightLMITO = 0;
			monthlyLMITO = 0;
			annuallyLMITO = 675;
		} else if (37001 < annuallyGross && annuallyGross <= 48000) {
			weeklyLMITO = 0;
			fortnightLMITO = 0;
			monthlyLMITO = 0;
			annuallyLMITO = 675 + 0.075 * (annuallyGross - 37000);
		} else if (48001 < annuallyGross && annuallyGross <= 90000) {
			weeklyLMITO = 0;
			fortnightLMITO = 0;
			monthlyLMITO = 0;
			annuallyLMITO = 1500;
		} else if (90001 < annuallyGross && annuallyGross <= 126000) {
			weeklyLMITO = 0;
			fortnightLMITO = 0;
			monthlyLMITO = 0;
			annuallyLMITO = 1500 - 0.03 * (annuallyGross - 90000);
		} else {
			weeklyLMITO = 0;
			fortnightLMITO = 0;
			monthlyLMITO = 0;
			annuallyLMITO = 0;
		}

		let weeklynetincome = 0;
		let fortnightnetincome = 0;
		let monthlynetincome = 0;
		let annuallynetincome = 0;

		const taxBracket = getTaxBracket(currentFinancialYear, annuallyGross);

		console.log(taxBracket);

		let weeklytax = taxBracket.calculateTaxAmount(annuallyGross, WEEKS.WEEKLY);
		let fortnighttax = taxBracket.calculateTaxAmount(
			annuallyGross,
			WEEKS.FORTNIGHTLY
		);
		let monthlytax = taxBracket.calculateTaxAmount(
			annuallyGross,
			WEEKS.MONTHLY
		);
		let annuallytax = taxBracket.calculateTaxAmount(
			annuallyGross,
			WEEKS.ANNUALLY
		);

		weeklynetincome =
			weeklyGross -
			weeklytax -
			weeklyMedicare -
			weeklyMLS +
			weeklyLITO +
			weeklyLMITO;
		fortnightnetincome =
			fortnightlyGross -
			fortnighttax -
			fortnightMedicare -
			fortnightMLS +
			fortnightLITO +
			fortnightLMITO;
		monthlynetincome =
			monthlyGross -
			monthlytax -
			monthlyMedicare -
			monthlyMLS +
			monthlyLITO +
			monthlyLMITO;
		annuallynetincome =
			annuallyGross -
			annuallytax -
			annuallyMedicare -
			annuallyMLS +
			annuallyLITO +
			annuallyLMITO;

		newData[1].weekly = formatNum(weeklySuper);
		newData[1].fortnightly = formatNum(fortnightlySuper);
		newData[1].monthly = formatNum(monthlySuper);
		newData[1].annually = formatNum(annuallySuper);

		newData[2].weekly = formatNum(weeklytax);
		newData[2].fortnightly = formatNum(fortnighttax);
		newData[2].monthly = formatNum(monthlytax);
		newData[2].annually = formatNum(annuallytax);

		newData[3].weekly = formatNum(weeklyMedicare);
		newData[3].fortnightly = formatNum(fortnightMedicare);
		newData[3].monthly = formatNum(monthlyMedicare);
		newData[3].annually = formatNum(annuallyMedicare);

		newData[4].weekly = formatNum(weeklyMLS);
		newData[4].fortnightly = formatNum(fortnightMLS);
		newData[4].monthly = formatNum(monthlyMLS);
		newData[4].annually = formatNum(annuallyMLS);

		newData[5].weekly = formatNum(weeklyLITO);
		newData[5].fortnightly = formatNum(fortnightLITO);
		newData[5].monthly = formatNum(monthlyLITO);
		newData[5].annually = formatNum(annuallyLITO);

		newData[6].weekly = formatNum(weeklyLMITO);
		newData[6].fortnightly = formatNum(fortnightLMITO);
		newData[6].monthly = formatNum(monthlyLMITO);
		newData[6].annually = formatNum(annuallyLMITO);

		newData[7].weekly = formatNum(weeklynetincome);
		newData[7].fortnightly = formatNum(fortnightnetincome);
		newData[7].monthly = formatNum(monthlynetincome);
		newData[7].annually = formatNum(annuallynetincome);

		setData(newData);
		// eslint-disable-next-line
	}, [salary, superData, isSuper, isResident, medicare]);

	return (
		<div className="App">
			<h1 className="cfi">Current financial year: {currentFinancialYear}</h1>
			<InputNumber
				className="salary"
				addonAfter="$"
				defaultValue={salary}
				onChange={(value) => setSalary(value)}
			/>
			<Select
				className="pay-cycle"
				defaultValue="Anually"
				style={{ width: 120 }}
				// onChange={handleChange}
				options={[
					{ value: "Anually", label: "Annually" },
					{ value: "Monthly", label: "Monthly" },
					{ value: "Fortnightly", label: "Fortnightly" },
					{ value: "Weekly", label: "	Weekly" },
				]}
			/>
			<InputNumber
				className="super"
				addonAfter="%"
				defaultValue={superData}
				onChange={(value) => setSuperData(value)}
			/>
			<Switch
				checkedChildren="Super included"
				unCheckedChildren="Super not included"
				className="super-value"
				onChange={(value) => setIsSuper(value)}
				defaultChecked={isSuper}
			/>
			<Switch
				checkedChildren="Resident"
				unCheckedChildren="Non resident"
				defaultChecked={isResident}
				onChange={(value) => setIsResident(value)}
				className="resident"
			/>
			<Switch
				checkedChildren="Including Medicare"
				unCheckedChildren="Medicare levy exemption"
				defaultChecked={medicare}
				onChange={(value) => setMedicare(value)}
				className="medicare"
			/>

			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
				className="calc"
			/>
		</div>
	);
}

export default App;
