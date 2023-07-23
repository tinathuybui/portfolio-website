import "antd/dist/reset.css";
import "./index.css";
import { useRoutes } from "react-router-dom";
import Header from "./Header";
import "./App.css";
import { Collapse } from "antd";
import { ROUTES } from "./routes";
const { Panel } = Collapse;
const text = `
This website is for informational purposes only.
`;

const App = () => {
	return (
		<>
			<Header />
			{useRoutes(ROUTES)}

			<Collapse>
				<Panel header="Disclaimer" key="1">
					<p>{text}</p>
				</Panel>
			</Collapse>
		</>
	);
};
export default App;
