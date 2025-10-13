import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import { Button } from "../button/button"
import { CarouselItemProps } from "./carousel-item"
import { CarouselDots } from "./carousel-dots"
import { Children, cloneElement, FC, isValidElement, ReactNode, useEffect, useRef, useState } from "react"

interface CarouselProps {
	children: ReactNode
	className?: string
	maxVisibleItems: number
	showDots?: boolean
}

export const Carousel: FC<CarouselProps> = ({
	children,
	className,
	maxVisibleItems,
	showDots = true,
}: CarouselProps) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isMobile, setIsMobile] = useState(false)
	const [maxHeight, setMaxHeight] = useState<number>(0)

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768)
		}

		checkMobile()
		window.addEventListener("resize", checkMobile)
		return () => window.removeEventListener("resize", checkMobile)
	}, [])

	useEffect(() => {
		if (containerRef.current) {
			const items = containerRef.current.querySelectorAll(".carousel-item-content")
			let maxH = 0
			items.forEach((item) => {
				const height = item.getBoundingClientRect().height
				maxH = Math.max(maxH, height)
			})
			setMaxHeight(maxH)
		}
	}, [children, isMobile])

	const effectiveMaxVisibleItems = isMobile ? 1 : maxVisibleItems

	const clonedChildren = Children.map(children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, {
				maxVisibleItems: effectiveMaxVisibleItems,
				maxHeight: maxHeight,
			} as Partial<CarouselItemProps>)
		}
		return child
	})

	const itemsArray = Children.toArray(clonedChildren)
	const totalItems = itemsArray.length

	const handlePrevious = () => {
		setCurrentIndex((prev) => Math.max(prev - 1, 0))
	}

	const handleNext = () => {
		setCurrentIndex((prev) => Math.min(prev + 1, totalItems - effectiveMaxVisibleItems))
	}

	const isFirstItemVisible = currentIndex === 0
	const isLastItemVisible = currentIndex + effectiveMaxVisibleItems >= totalItems

	useEffect(() => {
		const updateConstraints = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth
				const totalWidth = containerRef.current.scrollWidth
				setDragConstraints({
					left: -(totalWidth - containerWidth),
					right: 0,
				})
			}
		}
		updateConstraints()
		window.addEventListener("resize", updateConstraints)
		return () => window.removeEventListener("resize", updateConstraints)
	}, [children, isMobile])

	const containerWidth = containerRef.current?.offsetWidth || 0
	const itemWidth = containerWidth / effectiveMaxVisibleItems
	const translateX = -currentIndex * itemWidth

	const shouldShowDots = showDots && isMobile

	return (
		<div className={twMerge("flex flex-col w-full", className)}>
			<div className="flex items-center gap-4 w-full">
				<Button variant="secondary" onClick={handlePrevious} disabled={isFirstItemVisible} aria-label="Previous item">
					←
				</Button>

				<div className="relative overflow-hidden flex-1">
					<motion.div
						ref={containerRef}
						className="flex w-full"
						drag="x"
						dragConstraints={dragConstraints}
						animate={{ x: translateX }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						{itemsArray}
					</motion.div>
				</div>

				<Button variant="secondary" onClick={handleNext} disabled={isLastItemVisible} aria-label="Next item">
					→
				</Button>
			</div>

			{shouldShowDots && <CarouselDots totalItems={totalItems} currentIndex={currentIndex} />}
		</div>
	)
}

Carousel.displayName = "Carousel"
