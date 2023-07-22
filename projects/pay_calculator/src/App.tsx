import "antd/dist/reset.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Salary from "./Salary";
import SuperForcast from "./SuperForcast";
import Navigation from "./Navigation";
import "./App.css";
import { Collapse } from "antd";
const { Panel } = Collapse;
const text = `
This website is for informational purposes only.
`;

const App = () => {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<Salary />} />
				<Route path="/super" element={<SuperForcast />} />
			</Routes>
			<Collapse>
				<Panel header="Disclaimer" key="1">
					<p>{text}</p>
				</Panel>
			</Collapse>
		</>
	);
};
export default App;
