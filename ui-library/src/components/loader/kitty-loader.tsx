import React from "react"
import KittyIcon from "./kitty-icon"

interface KittyLoaderProps {
	size?: "small" | "medium" | "large"
	className?: string
}

const sizeMap = {
	small: 48,
	medium: 96,
	large: 144,
}

const KittyLoader: React.FC<KittyLoaderProps> = ({ size = "medium", className = "" }) => {
	const width = sizeMap[size]
	const height = sizeMap[size]

	return (
		<div className={`relative inline-flex items-center ${className}`}>
			<KittyIcon width={width} height={height} />
		</div>
	)
}

export { KittyLoader }
export type { KittyLoaderProps }
