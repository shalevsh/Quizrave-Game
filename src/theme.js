import { createContext } from "react";

export const themes = {
  dark: "",
  light: "white-content",
};
   //Some sample where the Context API proves helpful is : Theming — Pass down app theme
   //https://flexiple.com/react/provider-pattern-with-react-context-api
export const ThemeContext = createContext({
    theme: themes.dark,
  changeTheme: () => {},
});