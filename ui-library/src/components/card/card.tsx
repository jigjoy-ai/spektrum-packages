import { FC, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface CardProps {
	children: ReactNode | ReactNode[]
	onClick?: () => void
	className?: string
}

const Card: FC<CardProps> = ({ children, className = "", onClick = () => {} }: CardProps) => {
	return (
		<div
			className={twMerge("w-full bg-surface-muted p-4 rounded-lg border border-secondary-200", className)}
			onClick={onClick}
		>
			{children}
		</div>
	)
}

Card.displayName = "Card"

export { Card }
