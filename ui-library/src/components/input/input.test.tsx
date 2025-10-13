import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { Input } from "./input"

describe("Input Component", () => {
	test("renders the input with correct type", () => {
		render(<Input type="text" />)
		expect(screen.getByRole("textbox")).toHaveAttribute("type", "text")
	})

	test("defaults to text type when no type is provided", () => {
		render(<Input />)
		expect(screen.getByRole("textbox")).toHaveAttribute("type", "text")
	})

	test("renders with correct placeholder", () => {
		render(<Input placeholder="Enter text..." />)
		expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument()
	})

	test("handles different input types", () => {
		const { rerender } = render(<Input type="password" placeholder="password" />)
		expect(screen.getByPlaceholderText("password")).toHaveAttribute("type", "password")

		rerender(<Input type="email" placeholder="email" />)
		expect(screen.getByPlaceholderText("email")).toHaveAttribute("type", "email")

		rerender(<Input type="number" placeholder="number" />)
		expect(screen.getByPlaceholderText("number")).toHaveAttribute("type", "number")
	})

	test("triggers onChange when value changes", () => {
		const handleChange = jest.fn()
		render(<Input onChange={handleChange} />)

		const input = screen.getByRole("textbox")
		fireEvent.change(input, { target: { value: "test" } })

		expect(handleChange).toHaveBeenCalledTimes(1)
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
	})

	test("applies custom class names", () => {
		render(<Input className="custom-class" />)
		expect(screen.getByRole("textbox")).toHaveClass("custom-class")
	})

	test("applies default styles when no className is passed", () => {
		render(<Input />)
		const input = screen.getByRole("textbox")

		expect(input).toHaveClass(
			"w-[320px] px-4 py-2 bg-surface text-secondary text-sm placeholder:text-secondary placeholder:opacity-70 rounded-lg outline-none focus:ring-1 focus:ring-secondary-200"
		)
	})

	test("merges custom classes with default styles", () => {
		render(<Input className="w-[400px] bg-secondary" />)
		const input = screen.getByRole("textbox")

		expect(input).toHaveClass("w-[400px]")
		expect(input).toHaveClass("bg-secondary")
		expect(input).toHaveClass("rounded-lg")
		expect(input).toHaveClass("outline-none")
	})

	test("handles empty onChange prop", () => {
		render(<Input />)
		const input = screen.getByRole("textbox")

		// Should not throw an error
		expect(() => {
			fireEvent.change(input, { target: { value: "test" } })
		}).not.toThrow()
	})
})
