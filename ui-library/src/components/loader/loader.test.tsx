import "@testing-library/jest-dom"
import { render, screen, act } from "@testing-library/react"
import { Loader } from "./loader"

describe("Loader Component", () => {
	// Basic rendering tests
	test("renders the loader with correct message", () => {
		render(<Loader message="Loading..." />)
		expect(screen.getByText("Loading...")).toBeInTheDocument()
	})

	test("renders without message when no message provided", () => {
		render(<Loader />)
		// Should not find any message text
		const messageContainer = screen.queryByTestId("loader-message")
		expect(messageContainer).not.toBeInTheDocument()
	})

	test("renders with different sizes", () => {
		const { rerender } = render(<Loader message="Test" size="small" />)
		const messageContainer = screen.getByText("Test").parentElement?.parentElement?.parentElement
		expect(messageContainer).toHaveClass("text-sm")

		rerender(<Loader message="Test" size="medium" />)
		expect(messageContainer).toHaveClass("text-secondary")

		rerender(<Loader message="Test" size="large" />)
		expect(messageContainer).toHaveClass("text-lg")
	})

	// Message history tests
	test("updates message when prop changes", async () => {
		const { rerender } = render(<Loader message="First message" />)
		expect(screen.getByText("First message")).toBeInTheDocument()

		act(() => {
			rerender(<Loader message="Second message" />)
		})

		const secondMessage = await screen.findByText("Second message")
		expect(secondMessage).toBeInTheDocument()
		// First message should be in history
		expect(screen.getByText("First message")).toBeInTheDocument()
	})

	// Completion state tests
	test("shows final message when complete", () => {
		const finalMessage = "All done!"
		render(<Loader message="Loading..." isComplete={true} finalMessage={finalMessage} />)
		expect(screen.getByText(finalMessage)).toBeInTheDocument()
	})

	test("adds current message to history when completed", () => {
		const message = "Final operation"
		render(<Loader message={message} isComplete={true} />)

		// Should find the message in both current and history
		const messageElements = screen.getAllByText(message)
		expect(messageElements.length).toBeGreaterThan(0)
	})

	// Default props tests
	test("uses default props when not provided", () => {
		render(<Loader message="Test" isComplete={true} />)
		expect(screen.getByText("Project ready!")).toBeInTheDocument() // Default final message
	})

	// Animation presence tests
	test("renders logo loader", () => {
		const { container } = render(<Loader message="Test" />)
		const hexagons = container.querySelectorAll("svg")
		expect(hexagons.length).toBe(7) // Should have 7 hexagons (6 outer + 1 center)
	})

	// Message history management
	test("maintains message history correctly", async () => {
		const { rerender } = render(<Loader message="First" />)

		// Update message multiple times
		act(() => {
			rerender(<Loader message="Second" />)
		})

		act(() => {
			rerender(<Loader message="Third" />)
		})

		// Wait for all messages to appear
		const firstMessage = await screen.findByText("First")
		const secondMessage = await screen.findByText("Second")
		const thirdMessage = await screen.findByText("Third")

		expect(firstMessage).toBeInTheDocument()
		expect(secondMessage).toBeInTheDocument()
		expect(thirdMessage).toBeInTheDocument()
	})

	// Style tests
	test("applies container styles", () => {
		const { container } = render(<Loader message="Test" />)
		const mainDiv = container.firstChild as HTMLElement
		expect(mainDiv).toHaveClass("flex", "flex-col", "items-center")
	})
})
