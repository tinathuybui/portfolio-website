import { InputNumber, Select, Switch, Table } from "antd";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { intialData, columns, WEEKS, FREQUENCY } from "./data/constants";
import {
	medicareBracket,
	medicareSurchargeThresholdBracket,
} from "./data/medicare";
import { getTaxBracket } from "./data/tax";
import { lowIncomeOffsetBracket } from "./data/lowIncomeOffset";
import { formatNum, getCurrentFinancialYear, formatter } from "./data/util";
import IncomeForecast from "./IncomeForecast";
import "./App.css";

function App() {
	const currentFinancialYear = getCurrentFinancialYear();
	const [salary, setSalary] = useState(0);
	const [data, setData] = useState(intialData);
	const [superData, setSuperData] = useState(10.5);
	const [isSuper, setIsSuper] = useState(false);
	const [isResident, setIsResident] = useState(true);
	const [medicare, setMedicare] = useState(true);
	const [frequency, setFrequency] = useState("Anually");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		let tempSalary = 0;

		if (salary && salary >= 0) tempSalary = salary;

		const newData = [...data];

		let weeklyGross = FREQUENCY[frequency].WEEKLY(
			tempSalary,
			superData,
			isSuper
		);
		let fortnightlyGross = FREQUENCY[frequency].FORTNIGHTLY(
			tempSalary,
			superData,
			isSuper
		);
		let monthlyGross = FREQUENCY[frequency].MONTHLY(
			tempSalary,
			superData,
			isSuper
		);
		let annuallyGross = FREQUENCY[frequency].ANNUALLY(
			tempSalary,
			superData,
			isSuper
		);

		const weeklyF = formatNum(weeklyGross);
		const fortnightlyF = formatNum(fortnightlyGross);
		const monthlyF = formatNum(monthlyGross);
		const annuallyF = formatNum(annuallyGross);

		newData[0].weekly = weeklyF;
		newData[0].fortnightly = fortnightlyF;
		newData[0].monthly = monthlyF;
		newData[0].annually = annuallyF;

		let weeklySuper = isSuper
			? tempSalary / WEEKS.ANNUALLY - weeklyGross
			: (weeklyGross * superData) / 100;
		let fortnightlySuper = isSuper
			? tempSalary / WEEKS.FORTNIGHTLY - fortnightlyGross
			: (fortnightlyGross * superData) / 100;
		let monthlySuper = isSuper
			? tempSalary / WEEKS.MONTHLY - monthlyGross
			: (monthlyGross * superData) / 100;
		let annuallySuper = isSuper
			? tempSalary - annuallyGross
			: (annuallyGross * superData) / 100;

		const mBracket = medicareBracket(annuallyGross);

		let weeklyMedicare = medicare
			? mBracket.calculateM(annuallyGross, WEEKS.WEEKLY)
			: 0;
		let fortnightMedicare = medicare
			? mBracket.calculateM(annuallyGross, WEEKS.FORTNIGHTLY)
			: 0;
		let monthlyMedicare = medicare
			? mBracket.calculateM(annuallyGross, WEEKS.MONTHLY)
			: 0;
		let annuallyMedicare = medicare
			? mBracket.calculateM(annuallyGross, WEEKS.ANNUALLY)
			: 0;

		const taxBracket = getTaxBracket(currentFinancialYear, weeklyGross);

		const tax = taxBracket.calculateTaxAmount(
			weeklyGross,
			annuallyGross,
			weeklyMedicare,
			fortnightMedicare,
			monthlyMedicare
		);

		let weeklytax = tax.weeklytax;
		let fortnighttax = tax.fortnighttax;
		let monthlytax = tax.monthlytax;
		let annuallytax = tax.annuallytax();

		const mlsBracket = medicareSurchargeThresholdBracket(annuallyGross);

		let weeklyMLS = 0;
		let fortnightMLS = 0;
		let monthlyMLS = 0;
		let annuallyMLS = 0;
		if (medicare) {
			weeklyMLS = mlsBracket.calculateMLS(0);
			fortnightMLS = mlsBracket.calculateMLS(0);
			monthlyMLS = mlsBracket.calculateMLS(0);
			annuallyMLS = mlsBracket.calculateMLS(annuallyGross);
		} else {
			weeklyMLS = 0;
			fortnightMLS = 0;
			monthlyMLS = 0;
			annuallyMLS = 0;
		}

		const litoBracket = lowIncomeOffsetBracket(annuallyGross);
		let weeklyLITO = 0;
		let fortnightLITO = 0;
		let monthlyLITO = 0;
		let annuallyLITO =
			annuallytax === 0 ? 0 : litoBracket.calculateLITO(annuallyGross);

		let weeklynetincome = 0;
		let fortnightnetincome = 0;
		let monthlynetincome = 0;
		let annuallynetincome = 0;

		weeklynetincome =
			weeklyGross - weeklytax - weeklyMedicare - weeklyMLS + weeklyLITO;
		fortnightnetincome =
			fortnightlyGross -
			fortnighttax -
			fortnightMedicare -
			fortnightMLS +
			fortnightLITO;
		monthlynetincome =
			monthlyGross - monthlytax - monthlyMedicare - monthlyMLS + monthlyLITO;
		annuallynetincome =
			annuallyGross -
			annuallytax -
			annuallyMedicare -
			annuallyMLS +
			annuallyLITO;

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

		newData[6].weekly = formatNum(0);
		newData[6].fortnightly = formatNum(0);
		newData[6].monthly = formatNum(0);
		newData[6].annually = formatNum(0);

		newData[7].weekly = formatNum(weeklynetincome);
		newData[7].fortnightly = formatNum(fortnightnetincome);
		newData[7].monthly = formatNum(monthlynetincome);
		newData[7].annually = formatNum(annuallynetincome);

		setData(newData);
		setTimeout(() => setLoading(false), 100);
		// eslint-disable-next-line
	}, [salary, superData, isSuper, isResident, medicare, frequency]);

	return (
		<div className="App">
			<h1 className="header">Current financial year: {currentFinancialYear}</h1>
			<div className="input-container">
				<InputNumber
					className="salary"
					addonAfter="$"
					defaultValue={salary}
					onChange={(value) => setSalary(value)}
					formatter={(value) => formatter(value)}
					// parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
				/>
				<Select
					className="pay-cycle"
					defaultValue="Anually"
					style={{ width: 120 }}
					onChange={(value) => setFrequency(value)}
					value={frequency}
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
			</div>
			<div className="switches">
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
			</div>

			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
				className="table"
				size="middle"
				loading={loading}
			/>

			<IncomeForecast class="income-forecast" />
		</div>
	);
}

export default App;
