import { useState } from "react";
import { Input, Button, Form, Typography } from "antd";
import "./dividend.css";
const { Text } = Typography;

interface InvestmentResult {
	investmentAmount: number;
	annualDividendIncome: number;
	totalDividendPayment: number;
	investmentBalance: number;
}

const calculateInvestment = (
	sharePrice: number,
	numberOfShares: number,
	dividendYield: number,
	holdingPeriod: number
): InvestmentResult => {
	const investmentAmount = sharePrice * numberOfShares;
	const annualDividendIncome = investmentAmount * (dividendYield / 100);
	const totalDividendPayment = annualDividendIncome * holdingPeriod;
	const investmentBalance = investmentAmount + totalDividendPayment;

	return {
		investmentAmount,
		annualDividendIncome,
		totalDividendPayment,
		investmentBalance,
	};
};

const Dividend = () => {
	const [sharePrice, setSharePrice] = useState("");
	const [numberOfShares, setNumberOfShares] = useState("");
	const [dividendYield, setDividendYield] = useState("");
	const [holdingPeriod, setHoldingPeriod] = useState("");
	const [result, setResult] = useState<InvestmentResult | null>(null);

	const handleSubmit = () => {
		const investmentResult = calculateInvestment(
			parseFloat(sharePrice),
			parseFloat(numberOfShares),
			parseFloat(dividendYield),
			parseFloat(holdingPeriod)
		);
		setResult(investmentResult);
	};

	return (
		<div style={{ padding: "24px" }}>
			<Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
				<Form.Item label="Share Price">
					<Input
						value={sharePrice}
						onChange={(e) => setSharePrice(e.target.value)}
					/>
				</Form.Item>
				<Form.Item label="Number of Shares">
					<Input
						value={numberOfShares}
						onChange={(e) => setNumberOfShares(e.target.value)}
					/>
				</Form.Item>
				<Form.Item label="Dividend Yield">
					<Input
						value={dividendYield}
						onChange={(e) => setDividendYield(e.target.value)}
					/>
				</Form.Item>
				<Form.Item label="Holding Period (years)">
					<Input
						value={holdingPeriod}
						onChange={(e) => setHoldingPeriod(e.target.value)}
					/>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 8 }}>
					<Button type="primary" onClick={handleSubmit}>
						Calculate
					</Button>
				</Form.Item>
			</Form>

			{result !== null && (
				<div style={{ marginTop: "24px" }}>
					<Text>Investment Amount: ${result.investmentAmount.toFixed(2)}</Text>
					<br />
					<Text>
						Annual Dividend Income: ${result.annualDividendIncome.toFixed(2)}
					</Text>
					<br />
					<Text>
						Total Dividend Payment: ${result.totalDividendPayment.toFixed(2)}
					</Text>
					<br />
					<Text>
						Investment Balance: ${result.investmentBalance.toFixed(2)}
					</Text>
				</div>
			)}
		</div>
	);
};

export default Dividend;
