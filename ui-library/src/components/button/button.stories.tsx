import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	args: {
		children: "Click me",
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "danger"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
	},
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
	args: {
		variant: "primary",
	},
}

export const Secondary: Story = {
	args: {
		variant: "secondary",
	},
}

export const Danger: Story = {
	args: {
		variant: "danger",
	},
}

export const Small: Story = {
	args: {
		size: "sm",
	},
}

export const Medium: Story = {
	args: {
		size: "md",
	},
}

export const Large: Story = {
	args: {
		size: "lg",
	},
}

export const WithClickHandler: Story = {
	args: {
		onClick: () => alert("Button clicked!"),
	},
}

export const CustomStyling: Story = {
	args: {
		className: "bg-highlight text-primary hover:bg-highlight/80",
		children: "Custom Styled",
	},
}

export const Loading: Story = {
	args: {
		loading: true,
		children: "Loading...",
	},
}

export const LoadingPrimary: Story = {
	args: {
		loading: true,
		variant: "primary",
		children: "Loading...",
	},
}

export const LoadingSecondary: Story = {
	args: {
		loading: true,
		variant: "secondary",
		children: "Loading...",
	},
}

export const LoadingDanger: Story = {
	args: {
		loading: true,
		variant: "danger",
		children: "Loading...",
	},
}

export const LoadingLarge: Story = {
	args: {
		loading: true,
		size: "lg",
		children: "Loading...",
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
		children: "Disabled",
	},
}

export const DisabledPrimary: Story = {
	args: {
		disabled: true,
		variant: "primary",
		children: "Disabled",
	},
}

export const DisabledSecondary: Story = {
	args: {
		disabled: true,
		variant: "secondary",
		children: "Disabled",
	},
}

export const DisabledDanger: Story = {
	args: {
		disabled: true,
		variant: "danger",
		children: "Disabled",
	},
}

export const DisabledLarge: Story = {
	args: {
		disabled: true,
		size: "lg",
		children: "Disabled",
	},
}

export const LoadingAndDisabled: Story = {
	args: {
		loading: true,
		disabled: true,
		children: "Loading & Disabled",
	},
}

export const LoadingWithClickHandler: Story = {
	args: {
		loading: true,
		onClick: () => alert("This should not trigger when loading"),
		children: "Loading Button",
	},
}

export const DisabledWithClickHandler: Story = {
	args: {
		disabled: true,
		onClick: () => alert("This should not trigger when disabled"),
		children: "Disabled Button",
	},
}
