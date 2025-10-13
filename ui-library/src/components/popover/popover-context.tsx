import { MutableRefObject, createContext } from "react"

export type PopoverPosition =
	| "top-start"
	| "top"
	| "top-end"
	| "bottom-start"
	| "bottom"
	| "bottom-end"
	| "right-start"
	| "right"
	| "right-end"
	| "left-start"
	| "left"
	| "left-end"

interface PopoverContextProps {
	isOpen: boolean
	handleOpen: () => void
	handleClose: () => void
	position: PopoverPosition
	triggerRef: MutableRefObject<HTMLElement | null> // Updated to MutableRefObject
}

const PopoverContext = createContext<PopoverContextProps | null>(null)

export default PopoverContext
