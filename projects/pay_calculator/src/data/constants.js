import { formatter } from "./util";

export const WEEKS = {
	WEEKLY: 52,
	FORTNIGHTLY: 26,
	MONTHLY: 12,
	ANNUALLY: 1,
};

export const FREQUENCY = {
	Anually: {
		WEEKLY: function (tempSalary, superData, isSuper) {
			return isSuper
				? tempSalary / (1 + superData / 100) / 52
				: tempSalary / 52;
		},
		FORTNIGHTLY: function (tempSalary, superData, isSuper) {
			return isSuper
				? tempSalary / (1 + superData / 100) / 26
				: tempSalary / 26;
		},
		MONTHLY: function (tempSalary, superData, isSuper) {
			return isSuper
				? tempSalary / (1 + superData / 100) / 12
				: tempSalary / 12;
		},
		ANNUALLY: function (tempSalary, superData, isSuper) {
			return isSuper ? tempSalary / (1 + superData / 100) : tempSalary;
		},
	},
	Monthly: {
		WEEKLY: function (tempSalary, superData, isSuper) {
			return isSuper
				? ((tempSalary / (1 + superData / 100)) * 12) / 52
				: (tempSalary * 12) / 52;
		},
		FORTNIGHTLY: function (tempSalary, superData, isSuper) {
			return isSuper
				? ((tempSalary / (1 + superData / 100)) * 12) / 26
				: (tempSalary * 12) / 26;
		},
		MONTHLY: function (tempSalary, superData, isSuper) {
			return isSuper ? tempSalary / (1 + superData / 100) : tempSalary;
		},
		ANNUALLY: function (tempSalary, superData, isSuper) {
			return isSuper
				? (tempSalary / (1 + superData / 100)) * 12
				: tempSalary * 12;
		},
	},
	Fortnightly: {
		WEEKLY: function (tempSalary, superData, isSuper) {
			return isSuper ? tempSalary / (1 + superData / 100) / 2 : tempSalary / 2;
		},
		FORTNIGHTLY: function (tempSalary, superData, isSuper) {
			return isSuper ? tempSalary / (1 + superData / 100) : tempSalary;
		},
		MONTHLY: function (tempSalary, superData, isSuper) {
			return isSuper
				? ((tempSalary / (1 + superData / 100)) * 26) / 12
				: (tempSalary * 26) / 12;
		},
		ANNUALLY: function (tempSalary, superData, isSuper) {
			return isSuper
				? (tempSalary / (1 + superData / 100)) * 26
				: tempSalary * 26;
		},
	},
	Weekly: {
		WEEKLY: function (tempSalary, superData, isSuper) {
			return isSuper ? tempSalary / (1 + superData / 100) : tempSalary;
		},
		FORTNIGHTLY: function (tempSalary, superData, isSuper) {
			return isSuper
				? (tempSalary / (1 + superData / 100)) * 2
				: tempSalary * 2;
		},
		MONTHLY: function (tempSalary, superData, isSuper) {
			return isSuper
				? ((tempSalary / (1 + superData / 100)) * 52) / 12
				: (tempSalary * 52) / 12;
		},
		ANNUALLY: function (tempSalary, superData, isSuper) {
			return isSuper
				? (tempSalary / (1 + superData / 100)) * 52
				: tempSalary * 52;
		},
	},
};

export const columns = [
	{
		// width: 500,
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
								<sup>*</sup>Single, No dependence
							</sub>
						</>
					);
				case "Medicare Levy Surcharge":
					return (
						<>
							{categories}
							<br />
							<sub>
								<sup>*</sup>Single, No dependence
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
		render: (value) => {
			return formatter(value);
		},
	},
	{
		title: "Fortnightly",
		dataIndex: "fortnightly",
		key: "fortnightly",
		render: (value) => {
			return formatter(value);
		},
	},
	{
		title: "Monthly",
		key: "monthly",
		dataIndex: "monthly",
		render: (value) => {
			return formatter(value);
		},
	},
	{
		title: "Annually",
		key: "annually",
		dataIndex: "annually",
		render: (value) => {
			return formatter(value);
		},
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
