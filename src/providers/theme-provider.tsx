import {
  Components,
  createTheme,
  CssBaseline,
  CssVarsTheme,
  Theme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};

const MoonSwitchThumb = () => `
  <svg 
    width="22" 
    height="22" 
    viewBox="0 0 22 22" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style="transform: rotate(260deg);"
  >
    <mask id="moon-mask">
      <rect width="22" height="22" fill="white"/>
      <circle cx="16" cy="6" r="10" fill="black"/>
    </mask>
    <circle 
      cx="11" 
      cy="11" 
      r="11" 
      fill="#03a9f3" 
      mask="url(#moon-mask)"
    />
  </svg>
`;

const ThemeProvider = ({ children }: Props) => {
  const storedDarkMode = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState<boolean>(
    storedDarkMode ? JSON.parse(storedDarkMode) : false
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const sharedComponentOverrides: Components<
    Omit<Theme, "components" | "palette"> & CssVarsTheme
  > = {
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "100px",
          boxShadow: "none",
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: "#03a9f3",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#0288d1",
          },
        },
        containedSecondary: {
          backgroundColor: "rgba(46, 125, 50, 0.15)",
          color: "#2E7D32",
          "&:hover": {
            backgroundColor: "rgba(46, 125, 50, 0.25)",
          },
        },
        outlined: {
          borderColor: "#03a9f3",
          color: "#03a9f3",
          "&:hover": {
            borderColor: "#0288d1",
            backgroundColor: "rgba(3, 169, 243, 0.05)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
          position: "static",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 0,
          margin: 2,
          transitionDuration: "300ms",
          "&.Mui-disabled": {
            "& .MuiSwitch-thumb": {
              backgroundSize: "cover",
              backgroundColor: "#03a9f3",
            },
            "+ .MuiSwitch-track": {
              backgroundColor: "#e0e0e0 !important",
              opacity: 0.7,
            },
          },
          "&.Mui-checked": {
            transform: "translateX(16px)",
            "& .MuiSwitch-thumb": {
              backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
                MoonSwitchThumb()
              )}")`,
              backgroundSize: "cover",
              backgroundColor: "transparent",
            },
            "+ .MuiSwitch-track": {
              backgroundColor: "#0288d1 !important",
              opacity: 1,
              border: 0,
            },
          },
        },
        thumb: {
          boxSizing: "border-box",
          width: 22,
          height: 22,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#03a9f3",
        },
        track: {
          borderRadius: 26 / 2,
          backgroundColor: "#e0e0e0",
          opacity: 1,
          transition: "background-color 500ms",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        colorPrimary: {
          backgroundColor: "rgba(3, 169, 243, 0.1)",
          color: "#0288d1",
        },
        colorSecondary: {
          backgroundColor: "rgba(46, 125, 50, 0.1)",
          color: "#2E7D32",
        },
      },
    },
  };

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#03a9f3",
        light: "#4fc3f7",
        dark: "#0288d1",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#2E7D32",
        light: "#4CAF50",
        dark: "#1B5E20",
        contrastText: "#FFFFFF",
      },
      background: {
        default: "#FAFAFA",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#212121",
        secondary: "#616161",
      },
      success: {
        main: "#2E7D32",
        light: "#4CAF50",
        dark: "#1B5E20",
      },
      info: {
        main: "#03a9f3",
        light: "#4fc3f7",
        dark: "#0288d1",
      },
      divider: "rgba(0, 0, 0, 0.12)",
    },
    typography: {
      fontFamily: "Marmelad, Arial, sans-serif",
      h1: {
        fontWeight: 600,
        color: "#212121",
      },
      h2: {
        fontWeight: 600,
        color: "#212121",
      },
      h3: {
        fontWeight: 600,
        color: "#212121",
      },
      h4: {
        fontWeight: 600,
        color: "#424242",
      },
      h5: {
        fontWeight: 600,
        color: "#424242",
      },
      h6: {
        fontWeight: 600,
        color: "#424242",
      },
      button: {
        fontWeight: 500,
      },
    },
    components: sharedComponentOverrides,
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#03a9f3",
        light: "#4fc3f7",
        dark: "#0288d1",
        contrastText: "#000000",
      },
      secondary: {
        main: "#66BB6A",
        light: "#81C784",
        dark: "#388E3C",
        contrastText: "#000000",
      },
      background: {
        default: "#121212",
        paper: "#1E1E1E",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#B0B0B0",
      },
      success: {
        main: "#66BB6A",
        light: "#81C784",
        dark: "#388E3C",
      },
      info: {
        main: "#03a9f3",
        light: "#4fc3f7",
        dark: "#0288d1",
      },
      divider: "rgba(255, 255, 255, 0.12)",
    },
    typography: {
      fontFamily: "Marmelad, Arial, sans-serif",
      h1: {
        fontWeight: 600,
        color: "#FFFFFF",
      },
      h2: {
        fontWeight: 600,
        color: "#FFFFFF",
      },
      h3: {
        fontWeight: 600,
        color: "#FFFFFF",
      },
      h4: {
        fontWeight: 600,
        color: "#E0E0E0",
      },
      h5: {
        fontWeight: 600,
        color: "#E0E0E0",
      },
      h6: {
        fontWeight: 600,
        color: "#E0E0E0",
      },
      button: {
        fontWeight: 500,
      },
    },
    components: {
      ...sharedComponentOverrides,
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: "#2A2A2A",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#1E1E1E",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
            position: "static",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "100px",
            boxShadow: "none",
            fontWeight: 500,
          },
          containedPrimary: {
            backgroundColor: "#03a9f3",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#4fc3f7",
            },
          },
          containedSecondary: {
            backgroundColor: "rgba(102, 187, 106, 0.15)",
            color: "#81C784",
            "&:hover": {
              backgroundColor: "rgba(102, 187, 106, 0.25)",
            },
          },
          outlined: {
            borderColor: "#03a9f3",
            color: "#03a9f3",
            "&:hover": {
              borderColor: "#4fc3f7",
              backgroundColor: "rgba(3, 169, 243, 0.08)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
            backgroundColor: "#1E1E1E",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
          colorPrimary: {
            backgroundColor: "rgba(3, 169, 243, 0.15)",
            color: "#4fc3f7",
          },
          colorSecondary: {
            backgroundColor: "rgba(102, 187, 106, 0.15)",
            color: "#81C784",
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
          },
          switchBase: {
            padding: 0,
            margin: 2,
            transitionDuration: "300ms",
            "&.Mui-disabled": {
              "& .MuiSwitch-thumb": {
                backgroundSize: "cover",
                backgroundColor: "#03a9f3",
              },
              "+ .MuiSwitch-track": {
                backgroundColor: "#2A2A2A !important",
                opacity: 0.7,
              },
            },
            "&.Mui-checked": {
              transform: "translateX(16px)",
              "& .MuiSwitch-thumb": {
                backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
                  MoonSwitchThumb()
                )}")`,
                backgroundSize: "cover",
                backgroundColor: "transparent",
              },
              "+ .MuiSwitch-track": {
                backgroundColor: "#0288d1 !important",
                opacity: 1,
                border: 0,
              },
            },
          },
          thumb: {
            boxSizing: "border-box",
            width: 22,
            height: 22,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#03a9f3",
          },
          track: {
            borderRadius: 26 / 2,
            backgroundColor: "#2A2A2A",
            opacity: 1,
            transition: "background-color 500ms",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
  });

  const theme: Theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
