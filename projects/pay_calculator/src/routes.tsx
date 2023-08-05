import Salary from "./Salary";
import Dividend from "./Dividendcalculator";

const ROUTES = [
	{
		path: "/",
		element: <Salary />,
	},
	{
		path: "/Dividend",
		element: <Dividend />,
	},
];

export { ROUTES };
