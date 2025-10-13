import { cloneElement, FC, ReactElement, useContext } from "react"
import PopoverContext from "./popover-context"

interface PopoverTriggerProps {
	children: ReactElement<{ onClick?: () => void; ref: (node: HTMLElement) => void }>
}

const PopoverTrigger: FC<PopoverTriggerProps> = ({ children }: PopoverTriggerProps) => {
	const context = useContext(PopoverContext)

	if (!context) {
		throw new Error("PopoverTrigger must be used within a Popover")
	}

	const { handleOpen, triggerRef } = context

	return cloneElement(children, {
		ref: (node: HTMLElement) => {
			triggerRef.current = node
		},
		onClick: handleOpen,
	})
}

export { PopoverTrigger }

PopoverTrigger.displayName = "PopoverTrigger"
