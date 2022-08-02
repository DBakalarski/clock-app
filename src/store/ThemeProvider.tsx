import React, { useState } from 'react';

export enum EContextTheme {
  Dark = 'DARK',
  Light = 'LIGHT',
}

export const ThemeContext = React.createContext({
  theme: '',
  setThemeLight: () => {},
  setThemeDark: () => {},
});

const ThemeProvider: React.FC<{ children: JSX.Element }> = (props) => {
  const [theme, setTheme] = useState<EContextTheme>(EContextTheme.Light);

  const setThemeLightHandler = () => {
    setTheme(EContextTheme.Light);
  };
  const setThemeDarkHandler = () => {
    setTheme(EContextTheme.Dark);
  };

  const themeContext = {
    theme,
    setThemeLight: setThemeLightHandler,
    setThemeDark: setThemeDarkHandler,
  };
  return (
    <ThemeContext.Provider value={themeContext}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
