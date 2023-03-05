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
			let aG = isSuper ? tempSalary / (1 + superData / 100) : tempSalary;
			let annuallySuper = isSuper
				? (aG * superData) / 100
				: (aG * superData) / 100;
			const annuallySuperConcession =
				annuallySuper > 27500 ? annuallySuper - 27500 : 0;
			return {
				preGross: aG,
				newGross: aG + annuallySuperConcession,
			};
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
			let aG = isSuper
				? (tempSalary / (1 + superData / 100)) * 12
				: tempSalary * 12;
			let annuallySuper = isSuper
				? (aG * superData) / 100
				: (aG * superData) / 100;
			const annuallySuperConcession =
				annuallySuper > 27500 ? annuallySuper - 27500 : 0;
			return {
				preGross: aG,
				newGross: aG + annuallySuperConcession,
			};
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
			let aG = isSuper
				? (tempSalary / (1 + superData / 100)) * 26
				: tempSalary * 26;
			let annuallySuper = isSuper
				? (aG * superData) / 100
				: (aG * superData) / 100;
			const annuallySuperConcession =
				annuallySuper > 27500 ? annuallySuper - 27500 : 0;
			return {
				preGross: aG,
				newGross: aG + annuallySuperConcession,
			};
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
			let aG = isSuper
				? (tempSalary / (1 + superData / 100)) * 52
				: tempSalary * 52;
			let annuallySuper = isSuper
				? (aG * superData) / 100
				: (aG * superData) / 100;
			const annuallySuperConcession =
				annuallySuper > 27500 ? annuallySuper - 27500 : 0;
			return {
				preGross: aG,
				newGross: aG + annuallySuperConcession,
			};
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
								<sup>*</sup>Single, No no dependants
							</sub>
						</>
					);
				case "Medicare Levy Surcharge":
					return (
						<>
							{categories}
							<br />
							<sub>
								<sup>*</sup>Single, No no dependants
							</sub>
						</>
					);

				case "Net income":
					return <b>{categories}</b>;
				default:
					return <>{categories}</>;
			}
		},
		width: "10%",
	},
	{
		title: "Weekly",
		dataIndex: "weekly",
		key: "weekly",
		render: (value) => {
			return formatter(value);
		},
		width: "10%",
	},
	{
		title: "Fortnightly",
		dataIndex: "fortnightly",
		key: "fortnightly",
		render: (value) => {
			return formatter(value);
		},
		width: "10%",
	},
	{
		title: "Monthly",
		key: "monthly",
		dataIndex: "monthly",
		render: (value) => {
			return formatter(value);
		},
		width: "10%",
	},
	{
		title: "Annually",
		key: "annually",
		dataIndex: "annually",
		render: (value) => {
			return formatter(value);
		},
		width: "10%",
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
		categories: "Division 293",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "5",
		categories: "Medicare Levy",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "6",
		categories: "Medicare Levy Surcharge",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "7",
		categories: "Low Income Tax Offset",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "8",
		categories: "Low and Middle Income Tax Offset",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
	{
		key: "9",
		categories: "Net income",
		weekly: 0,
		fortnightly: 0,
		monthly: 0,
		annually: 0,
	},
];
