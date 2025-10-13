import { createContext, FC, ReactNode, useContext, useState } from "react"
import { twMerge } from "tailwind-merge"

interface ChevronContextProps {
	isExpanded: boolean
	handleToggle: () => void
}

const ChevronContext = createContext<ChevronContextProps | null>(null)

interface ChevronProps {
	children: ReactNode
	defaultExpanded?: boolean
	className?: string
}

export const Chevron: FC<ChevronProps> = ({ children, defaultExpanded = false, className = "" }: ChevronProps) => {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded)

	const handleToggle = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<ChevronContext.Provider value={{ isExpanded, handleToggle }}>
			<div
				className={twMerge(
					"flex flex-col bg-surface rounded-md h-full text-secondary-100 w-[325px] max-w-[325px] border border-secondary-100",
					className
				)}
			>
				{children}
			</div>
		</ChevronContext.Provider>
	)
}

export const useChevron = () => {
	const context = useContext(ChevronContext)
	if (!context) {
		throw new Error("useChevron must be used within a Chevron")
	}
	return context
}

export default Chevron

Chevron.displayName = "Chevron"
