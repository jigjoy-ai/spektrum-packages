import { FC } from "react"

interface LogoHexagonProps {
	size?: number
	fillColor: string
	strokeColor?: string
	strokeWidth?: string
}

const LogoHexagon: FC<LogoHexagonProps> = ({
	size = 24,
	fillColor,
	strokeColor,
	strokeWidth = "1",
}: LogoHexagonProps) => {
	const calculateHexagonPath = (size: number) => {
		const a = size / 2
		const b = (Math.sqrt(3) * a) / 2
		const c = a / 2

		return `M ${a} 0 
            L ${a + b} ${c} 
            L ${a + b} ${size - c} 
            L ${a} ${size} 
            L ${a - b} ${size - c} 
            L ${a - b} ${c} Z`
	}

	const strokeProps = strokeColor
		? {
				stroke: strokeColor,
				strokeWidth: strokeWidth,
		  }
		: {}

	return (
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(90deg)" }}>
			<path d={calculateHexagonPath(size)} fill={fillColor} {...strokeProps} />
		</svg>
	)
}

export { LogoHexagon }

LogoHexagon.displayName = "LogoHexagon"
