import { useEffect, useRef, useState, FC, useContext, ReactNode, CSSProperties } from "react"
import ReactDOM from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import PopoverContext from "./popover-context"
import { useTheme } from "../../providers/provider"

interface PopoverContentProps {
	children: ReactNode
}

const calculatePopoverPosition = (position: string, triggerRect: DOMRect, popoverRect: DOMRect): CSSProperties => {
	const scrollTop = window.scrollY
	const scrollLeft = window.scrollX
	const styles: CSSProperties = { position: "fixed" }

	switch (position) {
		case "top":
			styles.top = scrollTop + triggerRect.top - popoverRect.height
			styles.left = scrollLeft + triggerRect.left + (triggerRect.width - popoverRect.width) / 2
			break
		case "top-start":
			styles.top = scrollTop + triggerRect.top - popoverRect.height
			styles.left = scrollLeft + triggerRect.left
			break
		case "top-end":
			styles.top = scrollTop + triggerRect.top - popoverRect.height
			styles.left = scrollLeft + triggerRect.right - popoverRect.width
			break
		case "bottom":
			styles.top = scrollTop + triggerRect.bottom
			styles.left = scrollLeft + triggerRect.left + (triggerRect.width - popoverRect.width) / 2
			break
		case "bottom-start":
			styles.top = scrollTop + triggerRect.bottom
			styles.left = scrollLeft + triggerRect.left
			break
		case "bottom-end":
			styles.top = scrollTop + triggerRect.bottom
			styles.left = scrollLeft + triggerRect.right - popoverRect.width
			break
		case "right":
			styles.top = scrollTop + triggerRect.top + (triggerRect.height - popoverRect.height) / 2
			styles.left = scrollLeft + triggerRect.right
			break
		case "right-start":
			styles.top = scrollTop + triggerRect.top
			styles.left = scrollLeft + triggerRect.right
			break
		case "right-end":
			styles.top = scrollTop + triggerRect.bottom - popoverRect.height
			styles.left = scrollLeft + triggerRect.right
			break
		case "left":
			styles.top = scrollTop + triggerRect.top + (triggerRect.height - popoverRect.height) / 2
			styles.left = scrollLeft + triggerRect.left - popoverRect.width
			break
		case "left-start":
			styles.top = scrollTop + triggerRect.top
			styles.left = scrollLeft + triggerRect.left - popoverRect.width
			break
		case "left-end":
			styles.top = scrollTop + triggerRect.bottom - popoverRect.height
			styles.left = scrollLeft + triggerRect.left - popoverRect.width
			break
		default:
			styles.top = scrollTop + triggerRect.bottom
			styles.left = scrollLeft + triggerRect.left + (triggerRect.width - popoverRect.width) / 2
			break
	}

	return styles
}

const PopoverContent: FC<PopoverContentProps> = ({ children }: PopoverContentProps) => {
	const context = useContext(PopoverContext)

	if (!context) {
		throw new Error("PopoverContent must be used within a Popover")
	}

	const { isOpen, handleClose, position, triggerRef } = context
	const popoverRef = useRef<HTMLDivElement | null>(null)
	const [style, setStyle] = useState<CSSProperties>({})
	const { theme } = useTheme()

	useEffect(() => {
		if (isOpen && triggerRef.current && popoverRef.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect()
			const popoverRect = popoverRef.current.getBoundingClientRect()
			const newStyle = calculatePopoverPosition(position, triggerRect, popoverRect)
			setStyle(newStyle)
		}
	}, [isOpen, position, triggerRef])

	useEffect(() => {
		const handleClick = () => {
			handleClose()
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClick)
		}
		return () => {
			document.removeEventListener("mousedown", handleClick)
		}
	}, [isOpen, handleClose])

	return ReactDOM.createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
					data-theme={theme}
					ref={popoverRef}
					style={style}
					className="w-fit z-50 bg-surface-muted text-secondary shadow-lg rounded-md p-1"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.2 }}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	)
}

export { PopoverContent }

PopoverContent.displayName = "PopoverContent"
