import { Column } from "@ant-design/charts";
import { InputNumber, Typography } from "antd";
import { useState, useMemo } from "react";
import "./IncomeForecast.css";
import { formatter, getYearArray } from "../data/util";

interface IncomeForecastProps {
	salary: number;
	className: string;
}

const IncomeForecast: React.FC<IncomeForecastProps> = ({
	salary,
	className,
}) => {
	console.log(className);
	const [anuallPercentage, setAnuallPercentage] = useState(2);
	const years = useMemo(() => getYearArray(), []);

	const data = useMemo(() => {
		let prevSalary = salary;
		return years.map((year: number) => {
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
					alias: "year",
				},
				salary: {
					alias: "Salary",
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
				onChange={(value) => {
					if (value) setAnuallPercentage(value);
				}}
				formatter={(value) => {
					if (value) return formatter(value);
					return "";
				}}
				placeholder="Salary raise percentage"
			/>
			<Typography.Title level={4}>Salary Projection</Typography.Title>
			<Column {...config} style={{ height: 400 }} className="chart" />
		</div>
	);
};

export default IncomeForecast;
