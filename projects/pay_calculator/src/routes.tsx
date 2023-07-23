import Salary from "./Salary";
import SuperForcast from "./SuperForcast";

const ROUTES = [
	{
		path: "/",
		element: <Salary />,
	},
	{
		path: "/super",
		element: <SuperForcast />,
	},
];

export { ROUTES };
