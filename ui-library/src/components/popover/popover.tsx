import { useRef, useState, useEffect, FC, ReactNode, Children } from "react"
import PopoverContext, { PopoverPosition } from "./popover-context"

interface PopoverProps {
	children: ReactNode
	position?: PopoverPosition
	onOpenCallback?: () => void
	onCloseCallback?: () => void
	isOpen?: boolean
}

const Popover: FC<PopoverProps> = ({
	children,
	position = "bottom",
	onOpenCallback,
	onCloseCallback,
	isOpen = false,
}) => {
	const [internalIsOpen, setInternalIsOpen] = useState(false)
	const triggerRef = useRef<HTMLElement | null>(null)

	const handleOpen = () => {
		setInternalIsOpen(true)
		onOpenCallback?.()
	}

	const handleClose = () => {
		setInternalIsOpen(false)
		onCloseCallback?.()
	}

	useEffect(() => {
		isOpen ? handleOpen() : handleClose()
	}, [isOpen])

	const contextValue = {
		isOpen: internalIsOpen,
		handleOpen,
		handleClose,
		position,
		triggerRef,
	}

	return (
		<PopoverContext.Provider value={contextValue}>
			{Children.map(children, (child) => child)}
		</PopoverContext.Provider>
	)
}

Popover.displayName = "Popover"

export { Popover }
