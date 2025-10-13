import React, { useEffect, useRef } from "react"
import ModalContext from "./modal-context"
import { AnimatePresence, motion } from "framer-motion"
import ReactDOM from "react-dom"
import { useTheme } from "../../providers/provider"
import { Tooltip } from "../tooltip/tooltip"
import { twMerge } from "tailwind-merge"

interface ModalContentProps {
	children: React.ReactNode
	title?: string
	className?: string
}

const ModalContent: React.FC<ModalContentProps> = ({ children, title = "", className = "" }) => {
	const context = React.useContext(ModalContext)

	if (!context) {
		throw new Error("ModalContent must be used within a Modal")
	}

	const { isOpen, handleClose } = context

	return (
		<AnimatePresence>
			{isOpen && (
				<ModalPortal title={title} onClose={handleClose} className={className}>
					{children}
				</ModalPortal>
			)}
		</AnimatePresence>
	)
}

const ModalPortal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode; className?: string }> = ({
	onClose,
	children,
	title = "",
	className = "",
}) => {
	const modalRef = useRef<HTMLDivElement | null>(null)
	const { theme } = useTheme()

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && modalRef.current.contains && !modalRef.current.contains(event.target as Node)) {
				onClose()
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [onClose])

	return ReactDOM.createPortal(
		<motion.div
			data-theme={theme}
			className="fixed inset-0 pt-20 flex justify-center bg-surface/90 z-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			<motion.div
				className={twMerge(
					"bg-surface-light text-secondary p-6 rounded-lg shadow-lg relative border border-secondary-200 h-fit w-[90%] md:w-[400px]",
					className
				)}
				ref={modalRef}
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
			>
				<div className="w-full h-fit flex flex-row mb-4">
					<div className="grow text-xl font-bold text-secondary">{title}</div>
					<Tooltip message="Close">
						<svg
							onClick={onClose}
							className="bg-danger hover:bg-danger/80 rounded-sm cursor-pointer w-5 h-5 text-[#1a1a1a]"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z"></path>
						</svg>
					</Tooltip>
				</div>

				{children}
			</motion.div>
		</motion.div>,
		document.body
	)
}

ModalContent.displayName = "ModalContent"

export { ModalContent }
