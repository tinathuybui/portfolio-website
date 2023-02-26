import { getCurrentFinancialYear } from "./util";

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
		rate: 0 / 100,
		calculateM: function (salary, weeks) {
			return 0;
		},
	},
	Tier1: {
		grossSalaryMin: 23365,
		grossSalaryMax: 29207,
		rate: 1 / 10,
		calculateM: function (salary, weeks) {
			console.log(salary, weeks, this.grossSalaryMin, this.rate);
			return ((salary - this.grossSalaryMin) * this.rate) / weeks;
		},
	},
	Tier2: {
		grossSalaryMin: 29207,
		grossSalaryMax: Infinity,
		rate: 2 / 100,
		calculateM: function (salary, weeks) {
			return (salary * this.rate) / weeks;
		},
	},
};

export const medicareSurchargeThresholdTable = {
	Tier0: {
		grossSalaryMin: 0,
		grossSalaryMax: 90000,
		rate: 0 / 100,
		calculateMLS: function (salary) {
			return 0;
		},
	},
	Tier1: {
		grossSalaryMin: 90001,
		grossSalaryMax: 105000,
		rate: 1 / 100,
		calculateMLS: function (salary) {
			return salary * this.rate;
		},
	},
	Tier2: {
		grossSalaryMin: 105001,
		grossSalaryMax: 140000,
		rate: 1.25 / 100,
		calculateMLS: function (salary) {
			return salary * this.rate;
		},
	},
	Tier3: {
		grossSalaryMin: 140001,
		grossSalaryMax: Infinity,
		rate: 1.5 / 100,
		calculateMLS: function (salary) {
			return salary * this.rate;
		},
	},
};

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
				return (this.taxRate * (salary - this.preTaxMax)) / weeks;
			},
		},
		3: {
			preTaxMax: 45000,
			taxMin: 45001,
			taxMax: 120000,
			taxRate: 0.325,
			taxBase: 5092,
			calculateTaxAmount: function (salary, weeks) {
				return (
					(this.taxBase + this.taxRate * (salary - this.preTaxMax)) / weeks
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
				return (
					(this.taxBase + this.taxRate * (salary - this.preTaxMax)) / weeks
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
				return (
					(this.taxBase + this.taxRate * (salary - this.preTaxMax)) / weeks
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
		categories: "Superanuation",
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
