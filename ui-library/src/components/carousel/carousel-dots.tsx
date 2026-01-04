import { motion } from "framer-motion"
import { FC } from "react"
import { twMerge } from "tailwind-merge"

interface CarouselDotsProps {
	totalItems: number
	currentIndex: number
	className?: string
}

export const CarouselDots: FC<CarouselDotsProps> = ({ totalItems, currentIndex, className }: CarouselDotsProps) => {
	return (
		<div
			className={twMerge("flex justify-center items-center gap-2 mt-4", className)}
			role="tablist"
			aria-label="Carousel navigation"
		>
			{Array.from({ length: totalItems }, (_, index) => (
				<motion.div
					key={index}
					role="tab"
					aria-selected={currentIndex === index}
					aria-label={`Slide ${index + 1}`}
					className={twMerge(
						"w-2 h-2 rounded-full",
						currentIndex === index ? "bg-secondary" : "bg-secondary-200",
					)}
					initial={false}
					animate={{
						scale: currentIndex === index ? 1.2 : 1,
					}}
					transition={{ duration: 0.2 }}
				/>
			))}
		</div>
	)
}

CarouselDots.displayName = "CarouselDots"
