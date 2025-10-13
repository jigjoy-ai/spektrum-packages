import { motion, AnimatePresence } from "framer-motion"
import { FC } from "react"
import { twMerge } from "tailwind-merge"

interface AnimatedTextProps {
	text: string
	className?: string
}

const AnimatedText: FC<AnimatedTextProps> = ({ text, className }: AnimatedTextProps) => {
	return (
		<div className="flex flex-col gap-2 w-full">
			<AnimatePresence mode="wait">
				<motion.div
					className={twMerge("flex items-center justify-center p-3 w-full", className)}
					initial={{ opacity: 0, y: 5 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -5 }}
					transition={{ duration: 0.8 }}
				>
					<span className="gradient-text break-words">{text}</span>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export { AnimatedText }
