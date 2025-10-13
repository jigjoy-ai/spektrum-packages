import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "./button"

describe("Button Component", () => {
	test("renders the button with correct text", () => {
		render(<Button>Click Me</Button>)
		expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
	})

	test("applies correct size classes", () => {
		const { rerender } = render(<Button size="sm">Small</Button>)
		expect(screen.getByRole("button")).toHaveClass("px-2 py-1")

		rerender(<Button size="md">Medium</Button>)
		expect(screen.getByRole("button")).toHaveClass("px-3 py-1.5")

		rerender(<Button size="lg">Large</Button>)
		expect(screen.getByRole("button")).toHaveClass("px-4 py-2")
	})

	test("applies correct variant classes", () => {
		const { rerender } = render(<Button variant="primary">Primary</Button>)
		expect(screen.getByRole("button")).toHaveClass("bg-surface text-secondary-100")

		rerender(<Button variant="secondary">Secondary</Button>)
		expect(screen.getByRole("button")).toHaveClass("bg-secondary text-primary")

		rerender(<Button variant="danger">Danger</Button>)
		expect(screen.getByRole("button")).toHaveClass("bg-surface text-danger")
	})

	test("defaults to primary variant and small size", () => {
		render(<Button>Default</Button>)
		const button = screen.getByRole("button")
		expect(button).toHaveClass("bg-surface text-secondary-100")
		expect(button).toHaveClass("px-2 py-1")
	})

	test("triggers onClick when clicked", () => {
		const handleClick = jest.fn()
		render(<Button onClick={handleClick}>Click Me</Button>)
		fireEvent.click(screen.getByRole("button", { name: /click me/i }))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	test("applies custom class names", () => {
		render(<Button className="custom-class">Styled</Button>)
		expect(screen.getByRole("button")).toHaveClass("custom-class")
	})
})
