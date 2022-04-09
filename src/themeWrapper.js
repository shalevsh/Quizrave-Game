import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './theme';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(localStorage.getItem('isDark') && localStorage.getItem('isDark') == "true" ? themes.dark : themes.light);

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    console.log('im here')

    var cols = document.getElementsByClassName('App-header');
    switch (theme) {

      case themes.light:
        // for(let i = 0; i < cols.length; i++) {
        //     cols[i].style.backgroundColor = 'white';
        //     cols[i].style.color = '#282c34';
        //   }
        document.body.classList.add('appTheme');

        break;
      case themes.dark:
        document.body.classList.remove('appTheme');
        // for(let i = 0; i < cols.length; i++) {
        //     cols[i].style.backgroundColor = '#282c34';
        //     cols[i].style.color = 'white';
        //   }
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