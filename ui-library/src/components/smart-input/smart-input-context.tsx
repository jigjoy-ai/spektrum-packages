import { createContext } from "react"

interface SmartInputContextProps {
	value: string
	onChange: (value: string) => void
}

export const SmartInputContext = createContext<SmartInputContextProps | null>(null)
