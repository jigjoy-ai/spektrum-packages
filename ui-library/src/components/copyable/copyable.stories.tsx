import type { Meta, StoryObj } from "@storybook/react"
import { Copyable } from "./copyable"

const meta: Meta<typeof Copyable> = {
	title: "Components/Copyable",
	component: Copyable,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		text: {
			control: "text",
			description: "The text content to display and copy to clipboard",
		},
		className: {
			control: "text",
			description: "Additional CSS classes to apply",
		},
	},
}

export default meta
type Story = StoryObj<typeof Copyable>

// Default story with a simple command
export const Default: Story = {
	args: {
		text: "npm install @ui-library/core",
	},
	decorators: [
		(Story) => (
			<div className="p-6 rounded-lg">
				<Story />
			</div>
		),
	],
}

// Short text example
export const ShortText: Story = {
	args: {
		text: "npm start",
	},
	decorators: [
		(Story) => (
			<div className="p-6 rounded-lg">
				<Story />
			</div>
		),
	],
}

// Long command example
export const LongCommand: Story = {
	args: {
		text: "npx create-next-app@latest my-app --typescript --tailwind --eslint",
	},
	decorators: [
		(Story) => (
			<div className="p-6 rounded-lg">
				<Story />
			</div>
		),
	],
}

// API key or secret example
export const ApiKey: Story = {
	args: {
		text: "sk_live_abc123xyz789",
	},
	decorators: [
		(Story) => (
			<div className="p-6 rounded-lg">
				<Story />
			</div>
		),
	],
}

// With custom className
export const CustomStyling: Story = {
	args: {
		text: "git clone https://github.com/example/repo.git",
		className: "w-full",
	},
	decorators: [
		(Story) => (
			<div className="p-6 rounded-lg w-[500px]">
				<Story />
			</div>
		),
	],
}
