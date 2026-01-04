import { motion } from "framer-motion"
import { FC } from "react"
import { twMerge } from "tailwind-merge"

interface ChipProps {
	label: string
	onClick?: () => void
	delay?: number
	className?: string
}

const bubbleVariants = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
}

const Chip: FC<ChipProps> = ({ label, onClick, delay = 0, className = "" }: ChipProps) => {
	return (
		<motion.button
			variants={bubbleVariants}
			initial="initial"
			animate="animate"
			transition={{ duration: 0.3, delay: delay * 0.1 }}
			onClick={onClick}
			className={twMerge(
				"bg-surface hover:bg-surface/80 px-2 py-1 rounded-sm h-fit w-fit text-xs text-secondary-100",
				className,
			)}
		>
			{label}
		</motion.button>
	)
}

Chip.displayName = "Chip"

export { Chip }
