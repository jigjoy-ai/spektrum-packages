import { useState, useRef } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
	title: "Components/Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["text", "password", "email", "number"],
			description: "Type of input field",
		},
		placeholder: {
			control: "text",
			description: "Placeholder text",
		},
		onChange: { action: "changed" },
		value: { control: "text" },
	},
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
	args: {
		placeholder: "Enter text...",
	},
}

export const Password: Story = {
	args: {
		type: "password",
		placeholder: "Enter password...",
	},
}

export const Email: Story = {
	args: {
		type: "email",
		placeholder: "Enter email...",
	},
}

export const Number: Story = {
	args: {
		type: "number",
		placeholder: "Enter number...",
	},
}

export const WithInitialValue: Story = {
	args: {
		value: "Initial text",
		placeholder: "Type something...",
	},
}

export const CustomStyling: Story = {
	args: {
		placeholder: "Custom styled input",
		className: "w-[400px] bg-secondary text-primary placeholder:text-primary",
	},
}

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = useState("Initial value")
		return (
			<div className="flex flex-col gap-4">
				<Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type something..." />
				<div className="text-sm text-primary">Current value: {value}</div>
			</div>
		)
	},
}

export const ExternalValueUpdate: Story = {
	render: () => {
		const [value, setValue] = useState("Initial value")
		return (
			<div className="flex flex-col gap-4">
				<Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type something..." />
				<div className="text-sm text-primary">Current value: {value}</div>
				<button
					className="px-4 py-2 bg-primary text-white rounded-lg"
					onClick={() => setValue("Updated from external")}
				>
					Update Value
				</button>
			</div>
		)
	},
}

export const OnSecondaryBackground: Story = {
	args: {
		placeholder: "Input on secondary background",
	},
	decorators: [
		(Story) => (
			<div className="p-8 bg-secondary rounded-xl">
				<Story />
			</div>
		),
	],
}

export const OnBlackBackground: Story = {
	args: {
		placeholder: "Input on black background",
	},
	decorators: [
		(Story) => (
			<div className="p-8 bg-black rounded-xl">
				<Story />
			</div>
		),
	],
}

export const WithOnBlur: Story = {
	args: {
		placeholder: "Type and blur to see console log",
		onBlur: (e) => {
			console.log("Input blurred with value:", e.target.value)
		},
	},
}

export const FocusControl: Story = {
	render: () => {
		const inputRef = useRef<HTMLInputElement>(null)
		const [focusCount, setFocusCount] = useState(0)

		const focusInput = () => {
			inputRef.current?.focus()
			setFocusCount((prev) => prev + 1)
		}

		const blurInput = () => {
			inputRef.current?.blur()
		}

		const selectAll = () => {
			inputRef.current?.select()
		}

		return (
			<div className="flex flex-col gap-4">
				<Input
					ref={inputRef}
					placeholder="This input can be controlled from outside..."
					defaultValue="Click buttons below to control this input"
				/>
				<div className="flex gap-2 flex-wrap">
					<button className="px-4 py-2 bg-primary text-white rounded-lg text-sm" onClick={focusInput}>
						Focus Input
					</button>
					<button className="px-4 py-2 bg-secondary text-primary rounded-lg text-sm" onClick={blurInput}>
						Blur Input
					</button>
					<button className="px-4 py-2 bg-accent text-white rounded-lg text-sm" onClick={selectAll}>
						Select All Text
					</button>
				</div>
				<div className="text-sm text-primary">Focus count: {focusCount}</div>
				<div className="text-xs text-secondary">
					Try clicking the buttons above to control the input focus programmatically
				</div>
			</div>
		)
	},
}
