import { createTheme } from "@mui/material/styles";

export const breakpoints = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    mdx: 920,
    lg: 1024,
    xl: 1200,
    mxl: 1310,
    hi: 1536,
  },
};

const theme = createTheme({
  breakpoints,
  typography: {
    h1: { fontFamily: '"Playwrite DK Loopet", cursive' },
    h2: { fontFamily: '"Playwrite DK Loopet", cursive' },
    h3: { fontFamily: '"Playwrite DK Loopet", cursive' },
    h4: { fontFamily: '"Playwrite DK Loopet", cursive' },
    h5: { fontFamily: '"Playwrite DK Loopet", cursive' },
    h6: { fontFamily: '"Playwrite DK Loopet", cursive' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          // Style pour les boutons avec fond
          fontWeight: "bold",
          backgroundColor: "#007BFF",
          textTransform: "none",
          background: "#000814",
          color: "white",
          borderRadius: "15px",
          border: "1px solid transparent",
          "&:hover": {
            backgroundColor: "#ffffff",
            color: "black",
          },
        },
        outlined: {
          // Style pour les boutons sans fond
          fontWeight: "bold",
          borderColor: "#007BFF",
          color: "#007BFF",
          textTransform: "none",
          border: "1px solid transparent",
          "&:hover": {
            backgroundColor: "#ffffff",
          },
        },
        text: {
          // Style pour les boutons texte (sans fond ni bordure)
          color: "#007BFF",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#ffffff",
            color: "#007BFF",
            border: "1px solid #0056b3",
          },
        },
      },
    },
  },
});

export default theme;
