import { useTheme } from "@/hooks/useTheme"
import  { Moon, SunMedium } from "lucide-react"



export const ToggleTheme = () => {
  const {theme, toggleTheme} = useTheme()
    return (
        <button type="button" onClick={toggleTheme}>
{theme === 'light'? <SunMedium className="text-orange"/>: <Moon/>}
        </button>
    )
}