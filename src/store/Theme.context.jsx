import { createContext, useState } from "react";
import { ThemeProvider as ChakraThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/react";
import happyTheme from "../components/happyTheme.ts";
import sadTheme from "../components/sadTheme.ts";
export const ThemeContext = createContext({
  theme: happyTheme,
  switchTheme: () => {},
});

const themes = [happyTheme, sadTheme];


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(happyTheme);

  const switchTheme = () => {
    const currentThemeIndex = themes.indexOf(theme);
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    const nextTheme = themes[nextThemeIndex];
    setTheme(nextTheme);
    // console.log(theme);
  };

  return (
    <ChakraThemeProvider theme={theme}>
      <ColorModeProvider value={theme}>
        <CSSReset />
        <ThemeContext.Provider
          value={{
            theme,
            switchTheme,
          }}
        >
          {children}
        </ThemeContext.Provider>
      </ColorModeProvider>
    </ChakraThemeProvider>
  );
};