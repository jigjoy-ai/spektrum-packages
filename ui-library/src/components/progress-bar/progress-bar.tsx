import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import { FC } from "react"

interface ProgressBarProps {
	progress: number
	className?: string
}

const ProgressBar: FC<ProgressBarProps> = ({ progress, className }: ProgressBarProps) => {
	const clampedProgress = Math.min(Math.max(progress, 0), 100)

	return (
		<div className="flex items-center mt-2">
			<div className={twMerge("w-[250px] bg-secondary-200 h-1 rounded-[3px] mr-2 relative", className)}>
				<motion.div
					className="bg-progress h-1 rounded-[3px]"
					style={{
						width: `${clampedProgress}%`,
					}}
					initial={{ width: 0 }}
					animate={{ width: `${clampedProgress}%` }}
					transition={{ duration: 0.8 }}
				/>
			</div>
		</div>
	)
}

ProgressBar.displayName = "ProgressBar"

export { ProgressBar }
