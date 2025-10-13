import { createContext, FC, ReactNode, useContext } from "react"

const ThemeContext = createContext<{ theme: string }>({ theme: "light" })
export const useTheme = () => useContext(ThemeContext)

interface HoneycombUIProviderProps {
	children: ReactNode
	theme?: string
}

const HoneycombUIProvider: FC<HoneycombUIProviderProps> = ({ children, theme = "light" }: HoneycombUIProviderProps) => {
	return (
		<ThemeContext.Provider value={{ theme }}>
			<div data-theme={theme}>{children}</div>
		</ThemeContext.Provider>
	)
}

HoneycombUIProvider.displayName = "HoneycombUIProvider"

export { HoneycombUIProvider }
