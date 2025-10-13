import { LogoHexagon } from "./logo-hexagon"
import { FC } from "react"

interface LogoProps {
	size?: "small" | "medium" | "large"
	className?: string
}

const sizeMap = {
	small: 48,
	medium: 96,
	large: 144,
}

const Logo: FC<LogoProps> = ({ size = "medium", className = "" }: LogoProps) => {
	const honeyColors = {
		primary: "var(--color-primary)",
		hover: "var(--color-hover-primary)",
	}

	const hexSize = sizeMap[size]
	const hexHeight = hexSize
	const hexWidth = (hexSize * Math.sqrt(3)) / 2
	const horizontalSpacing = hexWidth * 1.0
	const verticalSpacing = hexSize * 1.0

	return (
		<div
			className={`relative inline-block ${className}`}
			style={{
				width: hexWidth * 3.8,
				height: hexHeight * 2.8,
				margin: "0 auto",
			}}
		>
			{/* Outer hexagons in test order */}
			{/* 0: Top (primary) */}
			<div
				className="absolute"
				style={{
					left: horizontalSpacing,
					top: 0,
				}}
			>
				<LogoHexagon size={hexSize} fillColor={honeyColors.primary} />
			</div>

			{/* 1: Top Right (hover) */}
			<div
				className="absolute"
				style={{
					left: horizontalSpacing * 2,
					top: verticalSpacing * 0.5,
				}}
			>
				<LogoHexagon size={hexSize} fillColor={honeyColors.hover} />
			</div>

			{/* 2: Bottom Right (primary) */}
			<div
				className="absolute"
				style={{
					left: horizontalSpacing * 2,
					top: verticalSpacing * 1.5,
				}}
			>
				<LogoHexagon size={hexSize} fillColor={honeyColors.primary} />
			</div>

			{/* 3: Bottom (hover) */}
			<div
				className="absolute"
				style={{
					left: horizontalSpacing,
					top: verticalSpacing * 2,
				}}
			>
				<LogoHexagon size={hexSize} fillColor={honeyColors.hover} />
			</div>

			{/* 4: Bottom Left (primary) */}
			<div
				className="absolute"
				style={{
					left: 0,
					top: verticalSpacing * 1.5,
				}}
			>
				<LogoHexagon size={hexSize} fillColor={honeyColors.primary} />
			</div>

			{/* 5: Top Left (hover) */}
			<div
				className="absolute"
				style={{
					left: 0,
					top: verticalSpacing * 0.5,
				}}
			>
				<LogoHexagon size={hexSize} fillColor={honeyColors.hover} />
			</div>

			{/* Center hexagon (hover) - must be last in DOM order */}
			<div
				className="absolute"
				style={{
					left: horizontalSpacing,
					top: verticalSpacing,
					zIndex: 10,
				}}
			>
				<LogoHexagon size={hexSize} fillColor={honeyColors.hover} />
			</div>
		</div>
	)
}

export { Logo }

Logo.displayName = "Logo"
