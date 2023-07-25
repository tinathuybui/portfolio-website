import ReactECharts from "echarts-for-react";

interface PieChartProps {
	takeHomePercentage: number;
	incomeTaxPercentage: number;
}

const PieChart: React.FC<PieChartProps> = ({
	takeHomePercentage,
	incomeTaxPercentage,
}) => {
	return (
		<div className="pie-chart">
			<ReactECharts
				option={{
					title: {
						text: "Take Home Pay & Income Tax",
						subtext: "as percentage of salary",
						left: "left",
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : ${c} ({d}%)",
					},
					series: [
						{
							name: "Percentage",
							type: "pie",
							radius: "55%",
							center: ["50%", "50%"],
							data: [
								{ value: takeHomePercentage, name: "Take Home Pay" },
								{ value: incomeTaxPercentage, name: "Income Tax" },
							],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: "rgba(0, 0, 0, 0.5)",
								},
							},
							label: {
								show: true,
								formatter: "{b}: {d}%",
							},
						},
					],
				}}
			/>
		</div>
	);
};

export default PieChart;
