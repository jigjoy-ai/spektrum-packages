import { FC, ReactNode } from "react"
import { useChevron } from "./chevron"
import { AnimatePresence, motion } from "framer-motion"

interface ChevronContentProps {
	children: ReactNode
}

export const ChevronContent: FC<ChevronContentProps> = ({ children }: ChevronContentProps) => {
	const { isExpanded } = useChevron()

	return (
		<AnimatePresence>
			{isExpanded && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: "auto", opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className="overflow-hidden"
				>
					<div className="w-full p-4">{children}</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

ChevronContent.displayName = "ChevronContent"
