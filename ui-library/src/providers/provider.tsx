import { createContext, FC, ReactNode, useContext } from "react"

const ThemeContext = createContext<{ theme: string }>({ theme: "light" })
export const useTheme = () => useContext(ThemeContext)

interface JigJoyUIProviderProps {
	children: ReactNode
	theme?: string
}

const JigJoyUIProvider: FC<JigJoyUIProviderProps> = ({ children, theme = "light" }: JigJoyUIProviderProps) => {
	return (
		<ThemeContext.Provider value={{ theme }}>
			<div data-theme={theme}>{children}</div>
		</ThemeContext.Provider>
	)
}

JigJoyUIProvider.displayName = "JigJoyUIProvider"

export { JigJoyUIProvider }
