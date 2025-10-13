import { Children, FC, ReactNode, useEffect, useState } from "react"
import ModalContext from "./modal-context"

interface ModalProps {
	children: ReactNode
	onOpenCallback?: () => void
	onCloseCallback?: () => void
	isOpen: boolean
}

const Modal: FC<ModalProps> = ({ children, onOpenCallback, onCloseCallback, isOpen = false }: ModalProps) => {
	const [internalIsOpen, setInternalIsOpen] = useState(false)

	const handleOpen = () => {
		if (!internalIsOpen) {
			setInternalIsOpen(true)
			onOpenCallback?.()
		}
	}

	const handleClose = () => {
		setInternalIsOpen(false)
		onCloseCallback?.()
	}

	useEffect(() => {
		isOpen ? handleOpen() : handleClose()
	}, [isOpen])

	const modalContext = { handleOpen, handleClose, isOpen: internalIsOpen }

	return (
		<ModalContext.Provider value={modalContext}>
			{Children.map(children, (child: any) => {
				return child
			})}
		</ModalContext.Provider>
	)
}

export { Modal }

Modal.displayName = "Modal"
