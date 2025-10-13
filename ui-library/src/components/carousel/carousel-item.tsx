import { FC, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export interface CarouselItemProps {
	children: ReactNode
	className?: string
	maxVisibleItems?: number
	maxHeight?: number
}

export const CarouselItem: FC<CarouselItemProps> = ({
	children,
	className,
	maxVisibleItems = 1,
	maxHeight,
}: CarouselItemProps) => {
	return (
		<div
			style={{
				flexBasis: `${100 / maxVisibleItems}%`,
				height: maxHeight ? `${maxHeight}px` : "auto",
			}}
			className={twMerge("flex-shrink-0 w-full px-3", className)}
		>
			<div className="w-full h-full carousel-item-content">{children}</div>
		</div>
	)
}

CarouselItem.displayName = "CarouselItem"
