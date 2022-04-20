import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './theme';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(!localStorage.getItem('isDark') ? themes.dark : localStorage.getItem('isDark') && localStorage.getItem('isDark') == "true" ? themes.dark : themes.light);

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {

    switch (theme) {

      case themes.light:
      
        document.body.classList.add('appTheme');

        break;
      case themes.dark:
        document.body.classList.remove('appTheme');
        
        break
      default:
        document.body.classList.remove('appTheme');
        break;
    }
  }, [theme]);

   //Some sample where the Context API proves helpful is : Theming — Pass down app theme
   //https://flexiple.com/react/provider-pattern-with-react-context-api
  //https://felixgerschau.com/react-typescript-context/
  
  // some reference that i used for implementation
  //https://blog.logrocket.com/deep-dive-iterating-context-children-react/

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
    //props.children means that React will render whatever you put between ThemeContextWrapper componnent at index.js
  );
}