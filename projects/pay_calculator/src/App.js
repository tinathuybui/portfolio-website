import "antd/dist/reset.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Salary from "./Salary";
import SuperForcast from "./SuperForcast";
import Navigation from "./Navigation";
import "./App.css";

function App() {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<Navigate to="/salary" />} />
				<Route path="/salary" element={<Salary />} />
				<Route path="/super" element={<SuperForcast />} />
			</Routes>
		</>
	);
}

export default App;
