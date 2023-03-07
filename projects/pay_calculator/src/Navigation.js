import { Layout, Menu } from "antd";

import { Link } from "react-router-dom";
const { Header } = Layout;

const Navigation = () => {
	return (
		<Header>
			<Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
				<Menu.Item key="1">
					<Link to="/">Salary</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link to="/super">Super</Link>
				</Menu.Item>
			</Menu>
		</Header>
	);
};

export default Navigation;
