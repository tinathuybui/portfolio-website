import { Column } from "@ant-design/charts";
import { InputNumber } from "antd";
import { useState, useMemo } from "react";
import { formatter, getYearArray } from "./data/util";
import "./IncomeForecast.css";

const IncomeForecast = ({ salary }) => {
	const [anuallPercentage, setAnuallPercentage] = useState();
	const years = useMemo(() => getYearArray(), []);

	const data = useMemo(() => {
		let prevSalary = salary;
		return years.map((year, index) => {
			const newSalary = prevSalary * (1 + anuallPercentage / 100);
			prevSalary = newSalary;
			return {
				type: year,
				salary: newSalary,
			};
		});
	}, [salary, years, anuallPercentage]);

	const config = useMemo(() => {
		return {
			data,
			xField: "type",
			yField: "salary",
			xAxis: {
				label: {
					autoHide: true,
					autoRotate: false,
				},
			},
			meta: {
				type: {
					alias: "类别",
				},
				salary: {
					alias: "销售额",
				},
			},
			minColumnWidth: 20,
			maxColumnWidth: 20,
		};
	}, [data]);

	return (
		<div className="IncomeForecast">
			<InputNumber
				className="percentage"
				addonAfter="%"
				defaultValue={anuallPercentage}
				onChange={(value) => setAnuallPercentage(value)}
				formatter={(value) => formatter(value)}
				placeholder="Salary raise percentage"
			/>

			<Column {...config} style={{ height: 400 }} className="chart" />
		</div>
	);
};

export default IncomeForecast;
