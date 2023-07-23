import "antd/dist/reset.css";
import "./index.css";
import { useRoutes } from "react-router-dom";

import Header from "./Header";
import "./App.css";
import { Collapse, Layout } from "antd";
import { ROUTES } from "./routes";
import { Footer } from "antd/es/layout/layout";
const { Panel } = Collapse;
const text = `
This website is for informational purposes only.
`;

const { Content } = Layout;

const App = () => {
	return (
		<>
			<Header />
			<Content>{useRoutes(ROUTES)}</Content>
			<Footer>
				<Collapse>
					<Panel header="Disclaimer" key="1">
						<p>{text}</p>
					</Panel>
				</Collapse>
			</Footer>
		</>
	);
};
export default App;
