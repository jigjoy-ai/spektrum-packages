import { useState, useEffect, FC } from "react"
import { twMerge } from "tailwind-merge"

interface TabProps {
	children: React.ReactNode
	display?: boolean
	className?: string
}

const Tab: FC<TabProps> = ({ children, display, className }: TabProps) => {
	const [displayTab, setDisplayTab] = useState(false)

	useEffect(() => {
		setDisplayTab(display ? display : false)
	}, [display])

	return displayTab && <div className={twMerge(className)}>{children}</div>
}

Tab.displayName = "Tab"
export { Tab }
