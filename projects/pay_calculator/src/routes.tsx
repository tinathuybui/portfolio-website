import Salary from "./pages/Salary/Salary";
import Dividend from "./pages/Dividend/Dividend";

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
