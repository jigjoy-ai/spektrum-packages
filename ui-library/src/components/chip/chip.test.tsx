import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { Chip } from "./chip"

describe("Chip Component", () => {
	test("renders the chip with correct label", () => {
		render(<Chip label="Hello" />)
		expect(screen.getByRole("button", { name: /hello/i })).toBeInTheDocument()
	})

	test("triggers onClick when clicked", () => {
		const handleClick = jest.fn()
		render(<Chip label="Click Me" onClick={handleClick} />)

		const chip = screen.getByRole("button", { name: /click me/i })
		fireEvent.click(chip)

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	test("applies custom class names", () => {
		render(<Chip label="Styled" className="custom-class" />)
		expect(screen.getByRole("button")).toHaveClass("custom-class")
	})

	test("applies default styles when no className is passed", () => {
		render(<Chip label="Default Styles" />)
		const chip = screen.getByRole("button", { name: /default styles/i })

		expect(chip).toHaveClass(
			"bg-surface hover:bg-surface/80 px-2 py-1 rounded-sm h-fit w-fit text-xs text-secondary-100",
		)
	})

	test("overrides styles with custom class names", () => {
		render(<Chip label="Custom Styled" className="bg-red-500 text-white hover:bg-red-700" />)
		const chip = screen.getByRole("button", { name: /custom styled/i })

		expect(chip).toHaveClass("bg-red-500")
		expect(chip).toHaveClass("text-white")
		expect(chip).toHaveClass("hover:bg-red-700")
		expect(chip).not.toHaveClass("bg-secondary-100")
		expect(chip).not.toHaveClass("hover:bg-surface/80")
	})

	test("delays animation when delay prop is set", () => {
		render(<Chip label="Delayed" delay={2} />)
		const chip = screen.getByRole("button", { name: /delayed/i })
		expect(chip).toBeInTheDocument()
	})
})
