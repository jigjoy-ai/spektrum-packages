import type { Meta, StoryObj } from "@storybook/react"
import { AnimatedText } from "./animated-text"

const meta: Meta<typeof AnimatedText> = {
	title: "Components/AnimatedText",
	component: AnimatedText,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof AnimatedText>

export const Default: Story = {
	args: {
		text: "Hello, World!",
	},
}

export const LongText: Story = {
	args: {
		text: "This is a longer piece of text that will test how the component handles multiple lines and word wrapping.",
	},
}

export const ShortText: Story = {
	args: {
		text: "Hi!",
	},
}

export const SpecialCharacters: Story = {
	args: {
		text: "Text with special characters: !@#$%^&*()",
	},
}

export const LeftAlignedText: Story = {
	args: {
		text: "This text is aligned to the left",
		className: "justify-start border border-gray-300 rounded-lg p-4 w-[500px]",
	},
}
