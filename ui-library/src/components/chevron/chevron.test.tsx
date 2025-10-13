import { render, screen, fireEvent } from "@testing-library/react"
import { Chevron } from "./chevron"
import { ChevronContent } from "./chevron-content"
import { ChevronTrigger } from "./chevron-trigger"
import { Button } from "../button/button"

const TestChevron = ({ defaultExpanded = false }) => (
	<Chevron defaultExpanded={defaultExpanded}>
		<ChevronTrigger>
			<Button>Toggle Chevron</Button>
		</ChevronTrigger>
		<ChevronContent>
			<div>Chevron Content</div>
		</ChevronContent>
	</Chevron>
)

describe("Chevron Component", () => {
	test("renders content when expanded", () => {
		render(<TestChevron defaultExpanded={true} />)
		expect(screen.getByText("Chevron Content")).toBeInTheDocument()
	})

	test("does not render content when collapsed", () => {
		render(<TestChevron defaultExpanded={false} />)
		expect(screen.queryByText("Chevron Content")).not.toBeInTheDocument()
	})

	test("toggles content visibility on trigger click", () => {
		render(<TestChevron />)
		const trigger = screen.getByText("Toggle Chevron")

		// Initially collapsed
		expect(screen.queryByText("Chevron Content")).not.toBeInTheDocument()

		// Click to expand
		fireEvent.click(trigger)
		expect(screen.getByText("Chevron Content")).toBeInTheDocument()

		// Click to collapse
		fireEvent.click(trigger)
		expect(screen.queryByText("Chevron Content")).not.toBeInTheDocument()
	})
})
