import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { ProgressBar } from "./progress-bar"

// Mock framer-motion
jest.mock("framer-motion", () => ({
	motion: {
		div: ({ style, className }: any) => (
			<div style={style} className={className} data-testid="motion-div" />
		),
	},
}))

describe("ProgressBar Component", () => {
	test("renders the progress bar", () => {
		const { container } = render(<ProgressBar progress={50} />)
		expect(container.firstChild).toBeInTheDocument()
	})

	test("applies correct width based on progress", () => {
		const { container } = render(<ProgressBar progress={75} />)
		const progressElement = container.querySelector("[data-testid='motion-div']")
		expect(progressElement).toHaveAttribute('style', expect.stringContaining('width: 75%'))
	})

	test("applies custom class names", () => {
		const { container } = render(<ProgressBar progress={50} className="w-[400px]" />)
		const progressBarContainer = container.querySelector(".w-\\[400px\\]")
		expect(progressBarContainer).toBeInTheDocument()
	})

	test("clamps progress between 0 and 100", () => {
		const { container: container1 } = render(<ProgressBar progress={-20} />)
		const progressElement1 = container1.querySelector("[data-testid='motion-div']")
		expect(progressElement1).toHaveAttribute('style', expect.stringContaining('width: 0%'))

		const { container: container2 } = render(<ProgressBar progress={120} />)
		const progressElement2 = container2.querySelector("[data-testid='motion-div']")
		expect(progressElement2).toHaveAttribute('style', expect.stringContaining('width: 100%'))
	})
})