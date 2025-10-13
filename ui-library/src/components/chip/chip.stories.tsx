import type { Meta, StoryObj } from "@storybook/react"
import { Chip } from "./chip"

const meta: Meta<typeof Chip> = {
	title: "Components/Chip",
	component: Chip,
	argTypes: {
		onClick: { action: "clicked" },
	},
}

export default meta

type Story = StoryObj<typeof Chip>

export const Default: Story = {
	args: {
		label: "Default Chip",
	},
}

export const Clickable: Story = {
	args: {
		label: "Clickable Chip",
		onClick: () => alert("Chip clicked!"),
	},
}

export const CustomStyled: Story = {
	args: {
		label: "Styled Chip",
		className: "bg-blue-500 text-white hover:bg-blue-700",
	},
}

export const Delayed: Story = {
	args: {
		label: "Delayed Chip",
		delay: 2,
	},
}
