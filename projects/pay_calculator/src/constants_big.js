import { getCurrentFinancialYear } from "./data/util";
import Big from "big.js";

export const WEEKS = {
	WEEKLY: 52,
	FORTNIGHTLY: 26,
	MONTHLY: 12,
	ANNUALLY: 1,
};

export const medicareTable = {
	Tier0: {
		grossSalaryMin: 0,
		grossSalaryMax: 23365,
		rate: new Big(0).div(new Big(100)),
		calculateM: function (salary, weeks) {
			return new Big(0);
		},
	},
	Tier1: {
		grossSalaryMin: 23365,
		grossSalaryMax: 29207,
		rate: new Big(1).div(new Big(10)),
		calculateM: function (salary, weeks) {
			const diff = new Big(salary).minus(new Big(this.grossSalaryMin));
			const rate = new Big(this.rate);
			const multi = diff.times(rate);
			return multi.div(new Big(weeks));
		},
	},
	Tier2: {
		grossSalaryMin: 29207,
		grossSalaryMax: Infinity,
		rate: new Big(2).div(new Big(100)),
		calculateM: function (salary, weeks) {
			const multi = new Big(salary).times(new Big(this.rate));
			return multi.div(new Big(weeks));
		},
	},
};

export const lowIncomeOffsetTable = {
	Tier0: {
		grossSalaryMin: 0,
		grossSalaryMax: 37500,
		calculateLIO: function (salary, weeks) {
			return 0;
		},
	},
	Tier1: {
		grossSalaryMin: 37501,
		grossSalaryMax: 45000,
		rate: 1 / 10,
		calculateLIO: function (salary, weeks) {
			return ((salary - this.grossSalaryMin) * this.rate) / weeks;
		},
	},
	Tier2: {
		grossSalaryMin: 45001,
		grossSalaryMax: 66667,
		rate: 2 / 100,
		calculateLIO: function (salary, weeks) {
			return (salary * this.rate) / weeks;
		},
	},
};

export const medicareSurchargeThresholdTable = {
	Tier0: {
		grossSalaryMin: 0,
		grossSalaryMax: 90000,
		rate: new Big(0).div(new Big(100)),
		calculateMLS: function (salary) {
			return new Big(0);
		},
	},
	Tier1: {
		grossSalaryMin: 90001,
		grossSalaryMax: 105000,
		rate: new Big(1).div(100),
		calculateMLS: function (salary) {
			return new Big(salary).times(new Big(this.rate));
		},
	},
	Tier2: {
		grossSalaryMin: 105001,
		grossSalaryMax: 140000,
		rate: new Big(1.25).div(new Big(100)),
		calculateMLS: function (salary) {
			return new Big(salary).times(new Big(this.rate));
		},
	},
	Tier3: {
		grossSalaryMin: 140001,
		grossSalaryMax: Infinity,
		rate: new Big(1.5).div(new Big(100)),
		calculateMLS: function (salary) {
			return new Big(salary).times(new Big(this.rate));
		},
	},
};

// prettier-ignore
export const taxTable = {
	[getCurrentFinancialYear()]: {
		1: {
			taxMin: 0,
			taxMax: 18200,
			taxRate: 0,
			taxBase: 0,
			calculateTaxAmount: function (salary, weeks) {
				return 0;
			},
		},
		2: {
			preTaxMax: 18200,
			taxMin: 18201,
			taxMax: 45000,
			taxRate: 0.19,
			taxBase: 0,
			calculateTaxAmount: function (salary, weeks) {
				const taxRate = new Big(this.taxRate);
				const diff = new Big(salary).minus(new Big(this.preTaxMax));

				const multi = (taxRate).times(diff);
				const res = (multi).div(weeks)
				return (
					res
				);
			},
		},
		3: {
			preTaxMax: 45000,
			taxMin: 45001,
			taxMax: 120000,
			taxRate: 0.325,
			taxBase: 5092,
			calculateTaxAmount: function (salary, weeks) {
				const taxBase = new Big(this.taxBase);
				const taxRate = new Big(this.taxRate);
				const diff = new Big(salary).minus(new Big(this.preTaxMax));

				const multi = (taxRate).times(diff);
				const plus = taxBase.plus(multi);
				const res = (plus).div(weeks)
				return (
					res
				);
			},
		},
		4: {
			preTaxMax: 120000,
			taxMin: 120001,
			taxMax: 180000,
			taxRate: 0.37,
			taxBase: 29467,
			calculateTaxAmount: function (salary, weeks) {
				const taxBase = new Big(this.taxBase);
				const taxRate = new Big(this.taxRate);
				const diff = new Big(salary).minus(new Big(this.preTaxMax));

				const multi = (taxRate).times(diff);
				const plus = taxBase.plus(multi);
				const res = (plus).div(weeks)
				return (
					res
				);
			},
		},
		5: {
			preTaxMax: 180000,
			taxMin: 180001,
			taxMax: Infinity,
			taxRate: 0.45,
			taxBase: 51667,
			calculateTaxAmount: function (salary, weeks) {
				const taxBase = new Big(this.taxBase);
				const taxRate = new Big(this.taxRate);
				const diff = new Big(salary).minus(new Big(this.preTaxMax));

				const multi = (taxRate).times(diff);
				const plus = taxBase.plus(multi);
				const res = (plus).div(weeks)
				return (
					res
				);
			},
		},
	},
};

export const columns = [
	{
		title: "Categories ",
		dataIndex: "categories",
		key: "categories",
		render: (categories) => {
			switch (categories) {
				case "Medicare Levy":
					return (
						<>
							{categories}
							<br />
							<sub>
								<sup>*</sup>Single, No dependants
							</sub>
						</>
					);
				case "Medicare Levy Surcharge":
					return (
						<>
							{categories}
							<br />
							<sub>
								<sup>*</sup>Single, No dependants
							</sub>
						</>
					);

				case "Net income":
					return <b>{categories}</b>;
				default:
					return <>{categories}</>;
			}
		},
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

export const intialData = [
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
		categories: "Superannuation",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "3",
		categories: "Income Tax",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "4",
		categories: "Medicare Levy",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "5",
		categories: "Medicare Levy Surcharge",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "6",
		categories: "Low Income Tax Offset",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "7",
		categories: "Low and Middle Income Tax Offset",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "8",
		categories: "Net income",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
];

// weeklynetincome = new Big(weeklyGross)
// .minus(new Big(weeklytax))
// .minus(new Big(weeklyMedicare))
// .minus(new Big(weeklyMLS))
// .plus(new Big(weeklyLITO));
// fortnightnetincome = new Big(fortnightlyGross)
// .minus(new Big(fortnighttax))
// .minus(new Big(fortnightMedicare))
// .minus(new Big(fortnightMLS))
// .plus(new Big(fortnightLITO));
// monthlynetincome = new Big(monthlyGross)
// .minus(new Big(monthlytax))
// .minus(new Big(monthlyMedicare))
// .minus(new Big(monthlyMLS))
// .plus(new Big(monthlyLITO));
// annuallynetincome = new Big(annuallyGross)
// .minus(new Big(annuallytax))
// .minus(new Big(annuallyMedicare))
// .minus(new Big(annuallyMLS))
// .plus(new Big(annuallyLITO));
