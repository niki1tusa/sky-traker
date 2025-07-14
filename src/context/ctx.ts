import { createContext } from "react";

export interface IThemeContext { 
    theme: 'light' | 'dark',
    toggleTheme: ()=> void
}



export const ThemeContext = createContext<IThemeContext | undefined>(undefined)