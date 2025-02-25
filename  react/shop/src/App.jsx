import { RouterProvider } from "react-router-dom";
import router from "./constants/router";
import { createTheme, ThemeProvider } from "@mui/material";
import { CustomThemeProvider } from "./contexts/CustomThemeProvider/CustomThemeProvider";
import { CartProvider } from "./contexts/CartContext/CartContext";

const theme = createTheme({
	palette: {
		primary: {
			main: "#7aa899",
		},
		secondary: {
			main: "#27263d",
		},
		error: {
			main: "#8b7aa8",
		},
		info: {
			main: "#3b3a3d",
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CustomThemeProvider value="light">
				<CartProvider>
					<RouterProvider router={router}></RouterProvider>
				</CartProvider>
			</CustomThemeProvider>
		</ThemeProvider>
	);
}

export default App;
