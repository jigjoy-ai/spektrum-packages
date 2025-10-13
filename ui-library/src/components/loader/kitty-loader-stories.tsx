import type { Meta, StoryObj } from "@storybook/react"
import { KittyLoader } from "./kitty-loader"

const meta: Meta<typeof KittyLoader> = {
	title: "Components/KittyLoader",
	component: KittyLoader,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["small", "medium", "large"],
			description: "Size of the KittyIcon",
		},
	},
}

export default meta
type Story = StoryObj<typeof KittyLoader>

// Default story with standard size
export const Default: Story = {
	args: {
		size: "medium",
	},
}

// Larger variant
export const Large: Story = {
	args: {
		size: "large",
	},
}

// Small variant
export const Small: Story = {
	args: {
		size: "small",
	},
}

export const LargeOnBlack: Story = {
	args: {
		size: "large",
	},
	decorators: [
		(Story) => (
			<div className="flex items-center justify-center bg-black p-6 rounded-lg">
				<Story />
			</div>
		),
	],
}

// Custom example showing how it might look in different contexts
export const InContext: Story = {
	decorators: [
		(Story) => (
			<div className="flex flex-col gap-4 p-4">
				<div className="flex items-center gap-2">
					<span>Loading</span>
					<Story />
				</div>
				<div className="flex items-center gap-2 bg-gray-100 p-2 rounded">
					<Story />
					<span>Processing request</span>
				</div>
			</div>
		),
	],
}
