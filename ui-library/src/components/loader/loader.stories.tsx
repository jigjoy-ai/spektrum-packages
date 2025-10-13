import type { Meta, StoryObj } from "@storybook/react"
import { Loader } from "./loader"

const meta: Meta<typeof Loader> = {
	title: "Components/Loader",
	component: Loader,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["small", "medium", "large"],
			description: "Size of the loader",
		},
		message: {
			control: "text",
			description: "Current message to display",
		},
	},
}

export default meta
type Story = StoryObj<typeof Loader>

// Default story with a single message
export const Default: Story = {
	args: {
		message: "Loading your project...",
		size: "medium",
	},
	decorators: [
		(Story) => (
			<div className="p-6 rounded-lg">
				<Story />
			</div>
		),
	],
}

// Small size loader
export const Small: Story = {
	args: {
		message: "Loading your project...",
		size: "small",
	},
	decorators: [
		(Story) => (
			<div className="p-6 rounded-lg">
				<Story />
			</div>
		),
	],
}

// Large size loader
export const Large: Story = {
	args: {
		message: "Loading your project...",
		size: "large",
	},
	decorators: [
		(Story) => (
			<div className="p-6 rounded-lg">
				<Story />
			</div>
		),
	],
}

// Loader without message
export const WithoutMessage: Story = {
	args: {
		size: "medium",
	},
	decorators: [
		(Story) => (
			<div className="p-6 rounded-lg">
				<Story />
			</div>
		),
	],
}
