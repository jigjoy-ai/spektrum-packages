import { FC, Key, ReactElement, useState } from "react"
import { createPortal } from "react-dom"
import { twMerge } from "tailwind-merge"

interface TooltipProps {
	children: ReactElement<{ key?: Key; display?: boolean }> | ReactElement<{ key?: Key; display?: boolean }>[]
	className?: string
	message: string
}

const Tooltip: FC<TooltipProps> = ({ children, message, className }: TooltipProps) => {
	const [on, toggleTooltip] = useState(false)
	const [top, setTop] = useState(0)
	const [left, setLeft] = useState(0)

	const toggle = (e: any) => {
		const rect = e.target.getBoundingClientRect()
		setTop(rect.top)
		setLeft(rect.left + rect.width / 2)
		toggleTooltip(!on)
	}

	return (
		<>
			{on &&
				createPortal(
					<div className="fixed w-max" style={{ top: top, left: left, transform: "translateY(36px)" }}>
						<div
							className={twMerge(
								"-translate-x-[50%] text-sm p-1 px-3 rounded-sm bg-black !text-secondary shadow",
								className
							)}
						>
							<div>{message}</div>
						</div>
					</div>,
					document.body
				)}

			<div onMouseEnter={toggle} onMouseLeave={toggle} className="w-fit h-fit">
				{children}
			</div>
		</>
	)
}

Tooltip.displayName = "Tooltip"
export { Tooltip }
