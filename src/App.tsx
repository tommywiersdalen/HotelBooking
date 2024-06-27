import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./Components/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Layout />
		</ThemeProvider>
	);
}

export default App;
