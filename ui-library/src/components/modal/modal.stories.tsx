import type { Meta, StoryObj } from "@storybook/react"
import { Modal } from "./modal"
import { ModalContent } from "./modal-content"
import { ModalTrigger } from "./modal-trigger"
import { Button } from "../button/button"
import { useState, useContext } from "react"
import { JigJoyUIProvider } from "../../providers/provider"
import ModalContext from "./modal-context"

const meta: Meta<typeof Modal> = {
	title: "Components/Modal",
	component: Modal,
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalDemo = ({ className = "" }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Modal isOpen={isOpen} onCloseCallback={() => setIsOpen(false)}>
			<ModalTrigger>
				<Button onClick={() => setIsOpen(true)}>Open Modal</Button>
			</ModalTrigger>
			<ModalContent title="Example Modal" className={className}>
				<p className="text-secondary mb-6">This is an example modal content.</p>
				<CloseButton />
			</ModalContent>
		</Modal>
	)
}

const CloseButton = () => {
	const context = useContext(ModalContext)

	if (!context) {
		throw new Error("CloseButton must be used within a Modal")
	}

	return (
		<Button variant="secondary" onClick={context.handleClose}>
			Close
		</Button>
	)
}

const App = () => {
	return (
		<JigJoyUIProvider theme="dark">
			<ModalDemo />
		</JigJoyUIProvider>
	)
}

export const Default: Story = {
	render: () => <App />,
}

export const CustomWidth: Story = {
	render: () => <ModalDemo className="md:w-[600px]" />,
}

export const SmallWidth: Story = {
	render: () => <ModalDemo className="md:w-[300px]" />,
}
