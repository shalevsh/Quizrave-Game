import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './theme';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(localStorage.getItem('isDark') && localStorage.getItem('isDark') === "true" ? themes.dark : themes.light);

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {

    var cols = document.getElementsByClassName('App-header');
    switch (theme) {

      case themes.light:
      
        document.body.classList.add('appTheme');

        break;
      case themes.dark:
        document.body.classList.remove('appTheme');
        
        break
      default:
        document.body.classList.add('appTheme');
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}