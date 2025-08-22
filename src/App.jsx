// App.jsx
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import UrlShortener from "./UrlShortener";

// Creamos el theme con soporte para light/dark/system
const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UrlShortener />
    </ThemeProvider>
  );
}
