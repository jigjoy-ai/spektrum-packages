import type { Meta, StoryObj } from "@storybook/react"
import { Logo } from "./logo"

const meta: Meta<typeof Logo> = {
	title: "Components/Logo",
	component: Logo,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["small", "medium", "large"],
			description: "Size of the logo",
		},
	},
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
	args: {
		size: "medium",
	},
}

export const Small: Story = {
	args: {
		size: "small",
	},
}

export const Large: Story = {
	args: {
		size: "large",
	},
}

export const OnDarkBackground: Story = {
	args: {
		size: "large",
	},
	decorators: [
		(Story) => (
			<div className="p-8 bg-surface rounded-xl">
				<Story />
			</div>
		),
	],
}
