import type { Meta, StoryObj } from "@storybook/react"
import { ProgressBar } from "./progress-bar"

const meta: Meta<typeof ProgressBar> = {
	title: "Components/ProgressBar",
	component: ProgressBar,
	args: {
		progress: 50,
	},
	argTypes: {
		progress: {
			control: { type: "range", min: 0, max: 100 },
			description: "Progress percentage (0-100)",
		},
	},
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
	args: {
		progress: 50,
	},
}

export const NoProgress: Story = {
	args: {
		progress: 0,
	},
}

export const Complete: Story = {
	args: {
		progress: 100,
	},
}

export const CustomWidth: Story = {
	args: {
		progress: 70,
		className: "w-[400px]",
	},
}

export const OnPrimaryBackground: Story = {
	args: {
		progress: 60,
	},
	decorators: [
		(Story) => (
			<div className="p-8 bg-surface rounded-xl">
				<Story />
			</div>
		),
	],
}
