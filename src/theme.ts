import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
  spacing: 8, // base spacing scale
  components: {
    MuiCard: {
      defaultProps: { elevation: 1 },
    },
  },
});

export default theme;
