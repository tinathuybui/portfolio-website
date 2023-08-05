import { Menu, Layout, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header: AntDHeader } = Layout;

const ITEMS = [
	{ key: "1", label: "Salary", linkto: "/" },
	{ key: "2", label: "Dividend", linkto: "/dividend" },
];

const Header = () => {
	const navigate = useNavigate();

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const onClick = ({ key }: { key: string }) => {
		const selectedItem = ITEMS.find((item) => item.key === key);
		if (selectedItem) {
			navigate(selectedItem.linkto);
		}
	};

	return (
		<AntDHeader
			style={{
				position: "sticky",
				top: 0,
				zIndex: 1,
				background: colorBgContainer,
			}}
		>
			<Menu mode="horizontal" onClick={onClick} items={ITEMS}></Menu>
		</AntDHeader>
	);
};

export default Header;
