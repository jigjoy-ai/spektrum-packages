import type { Meta, StoryObj } from "@storybook/react"
import { Chevron } from "./chevron"
import { ChevronContent } from "./chevron-content"
import { ChevronTrigger } from "./chevron-trigger"

const meta: Meta<typeof Chevron> = {
	title: "Components/Chevron",
	component: Chevron,
}

export default meta
type Story = StoryObj<typeof Chevron>

const ChevronDemo = ({ defaultExpanded = false }) => (
	<Chevron defaultExpanded={defaultExpanded}>
		<ChevronTrigger>
			<div className="text-secondary-100">Toggle Content</div>
		</ChevronTrigger>
		<ChevronContent>
			<div className="p-4 rounded-lg mt-2">This is the content that appears when the chevron is expanded.</div>
		</ChevronContent>
	</Chevron>
)

export const Default: Story = {
	render: () => <ChevronDemo />,
}

export const InitiallyExpanded: Story = {
	render: () => <ChevronDemo defaultExpanded={true} />,
}
