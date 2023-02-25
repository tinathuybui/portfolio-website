import { InputNumber, Select, Switch, Table } from "antd";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import "./App.css";

const formatNum = (num) => num.toFixed(2);

const columns = [
	{
		title: "Categories",
		dataIndex: "categories",
		key: "categories",
	},
	{
		title: "Weekly",
		dataIndex: "weekly",
		key: "weekly",
	},
	{
		title: "Fortnightly",
		dataIndex: "fortnightly",
		key: "fortnightly",
	},
	{
		title: "Monthly",
		key: "monthly",
		dataIndex: "monthly",
	},
	{
		title: "Annually",
		key: "annually",
		dataIndex: "annually",
	},
];

const intialData = [
	{
		key: "1",
		categories: "Gross Income",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "2",
		categories: "Super",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "3",
		categories: "Tax",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "4",
		categories: "Medicare",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "5",
		categories: "Net income",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
];

function App() {
	const [salary, setSalary] = useState(0);
	const [data, setData] = useState(intialData);
	const [superData, setSuperData] = useState(10.5);
	const [isSuper, setIsSuper] = useState(false);
	const [isResident, setIsResident] = useState(true);

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

		if (isSuper) {
			weeklySuper = tempSalary - weeklyGross;
			fortnightlySuper = tempSalary - fortnightlyGross;
			monthlySuper = tempSalary - monthlyGross;
			annuallySuper = tempSalary - annuallyGross;
		} else {
			weeklySuper = (weeklyGross * superData) / 100;
			fortnightlySuper = (fortnightlyGross * superData) / 100;
			monthlySuper = (monthlyGross * superData) / 100;
			annuallySuper = (annuallyGross * superData) / 100;
		}

		newData[1].weekly = formatNum(weeklySuper);
		newData[1].fortnightly = formatNum(fortnightlySuper);
		newData[1].monthly = formatNum(monthlySuper);
		newData[1].annually = formatNum(annuallySuper);

		newData[2].weekly = weeklyF;
		newData[2].fortnightly = fortnightlyF;
		newData[2].monthly = monthlyF;
		newData[2].annually = annuallyF;

		newData[3].weekly = weeklyF;
		newData[3].fortnightly = fortnightlyF;
		newData[3].monthly = monthlyF;
		newData[3].annually = annuallyF;

		newData[4].weekly = weeklyF;
		newData[4].fortnightly = fortnightlyF;
		newData[4].monthly = monthlyF;
		newData[4].annually = annuallyF;

		setData(newData);
		// eslint-disable-next-line
	}, [salary, superData, isSuper, isResident]);

	return (
		<div className="App">
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
