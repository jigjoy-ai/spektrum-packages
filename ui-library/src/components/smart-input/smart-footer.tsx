import { ReactNode, useContext, FC } from "react"
import { SmartInputContext } from "./smart-input-context"
import { twMerge } from "tailwind-merge"

interface SmartFooterProps {
	children: ReactNode
	className?: string
}

export const SmartFooter: FC<SmartFooterProps> = ({ children, className = "" }: SmartFooterProps) => {
	const context = useContext(SmartInputContext)

	if (!context) {
		throw new Error("SmartFooter must be used within a SmartInput")
	}

	return (
		<div
			className={twMerge(
				"border-t border-secondary-200 bottom-2 right-2 bg-surface-light h-fit p-1.5",
				className,
			)}
		>
			{children}
		</div>
	)
}

SmartFooter.displayName = "SmartFooter"
