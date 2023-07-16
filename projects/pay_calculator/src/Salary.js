import {
	InputNumber,
	Select,
	Switch as AntDSwitch,
	Table,
	Divider,
	Button,
} from "antd";
import "antd/dist/reset.css";
import { useEffect, useRef, useState } from "react";
import { initialData, columns, FREQUENCY } from "./data/constants";
import { WEEKS } from "./data/date.js";
import {
	medicareBracket,
	medicareSurchargeThresholdBracket,
} from "./data/medicare";
import { getTaxBracket, getTaxBracketNR } from "./data/tax";
import { lowIncomeOffsetBracket } from "./data/lowIncomeOffset";
import { formatNum, getCurrentFinancialYear, formatter } from "./data/util";
import IncomeForecast from "./IncomeForecast";
import "./App.css";
import { ExportOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

const Salary = () => {
	const currentFinancialYear = getCurrentFinancialYear();
	const [salary, setSalary] = useState();
	const [data, setData] = useState(initialData);
	const [superData, setSuperData] = useState(11);
	const [isSuper, setIsSuper] = useState(false);
	const [isResident, setIsResident] = useState(true);
	const [medicare, setMedicare] = useState(true);
	const [frequency, setFrequency] = useState("Anually");
	const [loading, setLoading] = useState(true);

	const value = useRef(0);

	const handleExportToExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		XLSX.writeFile(workbook, `salary.xlsx`);
	};

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

		const aG = FREQUENCY[frequency].ANNUALLY(tempSalary, superData, isSuper);
		let annuallyGross = aG.newGross;

		value.current = annuallyGross;

		const weeklyF = formatNum(weeklyGross);
		const fortnightlyF = formatNum(fortnightlyGross);
		const monthlyF = formatNum(monthlyGross);
		const annuallyF = formatNum(annuallyGross);

		newData[0].weekly = weeklyF;
		newData[0].fortnightly = fortnightlyF;
		newData[0].monthly = monthlyF;
		newData[0].annually = annuallyF;

		let weeklySuper = isSuper
			? ((aG.preGross / 52) * superData) / 100
			: (weeklyGross * superData) / 100;
		let fortnightlySuper = isSuper
			? ((aG.preGross / 26) * superData) / 100
			: (fortnightlyGross * superData) / 100;
		let monthlySuper = isSuper
			? ((aG.preGross / 12) * superData) / 100
			: (monthlyGross * superData) / 100;
		let annuallySuper = isSuper
			? (aG.preGross * superData) / 100
			: (aG.preGross * superData) / 100;

		let weeklyMedicare = 0;
		let fortnightMedicare = 0;
		let monthlyMedicare = 0;
		let annuallyMedicare = 0;

		if (medicare && isResident) {
			const mBracket = medicareBracket(annuallyGross);

			weeklyMedicare = medicare
				? mBracket.calculateM(annuallyGross, WEEKS.WEEKLY)
				: 0;
			fortnightMedicare = medicare
				? mBracket.calculateM(annuallyGross, WEEKS.FORTNIGHTLY)
				: 0;
			monthlyMedicare = medicare
				? mBracket.calculateM(annuallyGross, WEEKS.MONTHLY)
				: 0;
			annuallyMedicare = medicare
				? mBracket.calculateM(annuallyGross, WEEKS.ANNUALLY)
				: 0;
		}

		const taxBracket = isResident
			? getTaxBracket(currentFinancialYear, weeklyGross)
			: getTaxBracketNR(currentFinancialYear, weeklyGross);

		const tax = isResident
			? taxBracket.calculateTaxAmount(
					weeklyGross,
					annuallyGross,
					weeklyMedicare,
					fortnightMedicare,
					monthlyMedicare
			  )
			: taxBracket.calculateTaxAmount(
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

		if (medicare && isResident) {
			weeklyMLS = mlsBracket.calculateMLS(0);
			fortnightMLS = mlsBracket.calculateMLS(0);
			monthlyMLS = mlsBracket.calculateMLS(0);
			annuallyMLS = mlsBracket.calculateMLS(annuallyGross);
		}

		let weeklyLITO = 0;
		let fortnightLITO = 0;
		let monthlyLITO = 0;
		let annuallyLITO = 0;

		if (isResident) {
			const litoBracket = lowIncomeOffsetBracket(annuallyGross);
			annuallyLITO =
				annuallytax === 0 ? 0 : litoBracket.calculateLITO(annuallyGross);
		}

		let div293 = 0;
		if (annuallyGross + annuallySuper > 250000 && annuallySuper < 27500) {
			div293 = (annuallyGross + annuallySuper - 250000) * 0.15;
		} else if (annuallySuper > 27500) {
			div293 = 4125;
		}

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
			tempSalary -
			annuallytax -
			div293 -
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

		newData[3].weekly = formatNum(0);
		newData[3].fortnightly = formatNum(0);
		newData[3].monthly = formatNum(0);
		newData[3].annually = formatNum(div293);

		newData[4].weekly = formatNum(weeklyMedicare);
		newData[4].fortnightly = formatNum(fortnightMedicare);
		newData[4].monthly = formatNum(monthlyMedicare);
		newData[4].annually = formatNum(annuallyMedicare);

		newData[5].weekly = formatNum(weeklyMLS);
		newData[5].fortnightly = formatNum(fortnightMLS);
		newData[5].monthly = formatNum(monthlyMLS);
		newData[5].annually = formatNum(annuallyMLS);

		newData[6].weekly = formatNum(weeklyLITO);
		newData[6].fortnightly = formatNum(fortnightLITO);
		newData[6].monthly = formatNum(monthlyLITO);
		newData[6].annually = formatNum(annuallyLITO);

		newData[7].weekly = formatNum(0);
		newData[7].fortnightly = formatNum(0);
		newData[7].monthly = formatNum(0);
		newData[7].annually = formatNum(0);

		newData[8].weekly = formatNum(weeklynetincome);
		newData[8].fortnightly = formatNum(fortnightnetincome);
		newData[8].monthly = formatNum(monthlynetincome);
		newData[8].annually = formatNum(annuallynetincome);

		setData(newData);
		setTimeout(() => setLoading(false), 100);
		// eslint-disable-next-line
	}, [salary, superData, isSuper, isResident, medicare, frequency]);

	const rowClassName = (record, index) => {
		if (index === data.length - 1) return "bold-row";
		if (index === 3 && record.annually === "0.00") {
			return "hide-row";
		}
		if (
			(index === 4 || index === 5 || (index === 6) | (index === 7)) &&
			!isResident
		) {
			return "hide-row";
		}
		if (index === 7) return "hide-row";
	};

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
					placeholder="Salary before TAX"
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
				<AntDSwitch
					checkedChildren="Super included"
					unCheckedChildren="Super not included"
					className="super-value"
					onChange={(value) => setIsSuper(value)}
					defaultChecked={isSuper}
				/>
				<AntDSwitch
					checkedChildren="Resident"
					unCheckedChildren="Non resident"
					defaultChecked={isResident}
					onChange={(value) => {
						setIsResident(value);
						setMedicare(value ? true : false);
					}}
					className="resident"
				/>
				<AntDSwitch
					checkedChildren="Including Medicare"
					unCheckedChildren="Medicare levy exemption"
					checked={medicare}
					onChange={(value) => setMedicare(value)}
					className="medicare"
					disabled={!isResident}
				/>
				<Button
					className="export"
					onClick={() => handleExportToExcel()}
					icon={<ExportOutlined />}
					type="primary"
				>
					Export
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
				className="table"
				size="middle"
				loading={loading}
				rowClassName={rowClassName}
			/>

			<Divider>Salary Projection</Divider>
			<IncomeForecast class="income-forecast" salary={value.current} />
		</div>
	);
};

export default Salary;
