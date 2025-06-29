import { useTheme } from "@/hooks/useTheme"
import  { Moon, SunMedium } from "lucide-react"



export const ToggleTheme = () => {
  const {theme, toggleTheme} = useTheme()
    return (
        <button type="button" onClick={toggleTheme}>
{theme === 'light'? <SunMedium color="#ff4"/>: <Moon/>}
        </button>
    )
}