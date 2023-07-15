import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<Layout theme="light">
			<Menu mode="horizontal" defaultSelectedKeys={["1"]}>
				<Menu.Item key="1">
					<Link to="/">Salary</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link to="/super">Super</Link>
				</Menu.Item>
			</Menu>
		</Layout>
	);
};

export default Navigation;
