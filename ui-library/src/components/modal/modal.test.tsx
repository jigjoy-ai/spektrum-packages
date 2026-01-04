import { render, screen, fireEvent } from "@testing-library/react"
import { Modal } from "./modal"
import { ModalContent } from "./modal-content"
import { ModalTrigger } from "./modal-trigger"
import { Button } from "../button/button"

const TestModal = ({ className = "" }) => (
	<Modal isOpen={true}>
		<ModalTrigger>
			<Button>Open Modal</Button>
		</ModalTrigger>
		<ModalContent title="Test Modal" className={className}>
			<div>Modal Content</div>
		</ModalContent>
	</Modal>
)

describe("Modal Component", () => {
	test("renders modal when isOpen is true", () => {
		render(<TestModal />)
		expect(screen.getByText("Test Modal")).toBeInTheDocument()
		expect(screen.getByText("Modal Content")).toBeInTheDocument()
	})

	test("applies custom className to modal content", () => {
		render(<TestModal className="custom-width" />)
		const modalContent = screen.getByText("Modal Content").parentElement?.parentElement
		expect(modalContent).toHaveClass("custom-width")
	})

	test("closes on clicking outside", () => {
		const onCloseCallback = jest.fn()
		render(
			<Modal isOpen={true} onCloseCallback={onCloseCallback}>
				<ModalContent title="Test Modal">
					<div>Modal Content</div>
				</ModalContent>
			</Modal>,
		)

		const backdrop = screen.getByText("Modal Content").parentElement?.parentElement?.parentElement
		fireEvent.mouseDown(backdrop as Element)
		expect(onCloseCallback).toHaveBeenCalled()
	})

	test("closes on close button click", () => {
		const onCloseCallback = jest.fn()
		render(
			<Modal isOpen={true} onCloseCallback={onCloseCallback}>
				<ModalContent title="Test Modal">
					<div>Modal Content</div>
				</ModalContent>
			</Modal>,
		)

		const closeButton = screen.getByRole("button")
		fireEvent.click(closeButton)
		expect(onCloseCallback).toHaveBeenCalled()
	})
})
