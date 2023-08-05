import Salary from "./pages/Salary";
import Dividend from "./pages/Dividendcalculator";

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
