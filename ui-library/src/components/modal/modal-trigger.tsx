import { cloneElement, FC, ReactElement, useContext } from "react"
import ModalContext from "./modal-context"

interface ModalTriggerProps {
	children: ReactElement<{ onClick?: () => void }>
}

const ModalTrigger: FC<ModalTriggerProps> = ({ children }: ModalTriggerProps) => {
	const context = useContext(ModalContext)

	if (!context) {
		throw new Error("ModalTrigger must be used within a Modal")
	}

	const { handleOpen } = context

	return cloneElement(children, { onClick: handleOpen })
}

ModalTrigger.displayName = "ModalTrigger"

export { ModalTrigger }
