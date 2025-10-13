import type { Meta, StoryObj } from "@storybook/react"
import { useState, useRef } from "react"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
	title: "Components/Textarea",
	component: Textarea,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
	args: {
		placeholder: "Enter text...",
	},
}

export const WithInitialValue: Story = {
	args: {
		value: "This is some initial text",
		placeholder: "Type something here...",
	},
}

export const WithCustomRows: Story = {
	args: {
		rows: 5,
		placeholder: "This textarea has 5 rows",
	},
}

export const WithCustomWidth: Story = {
	args: {
		className: "w-[500px]",
		placeholder: "This textarea has custom width",
	},
}

export const LongText: Story = {
	args: {
		value:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		rows: 6,
	},
}

export const AutoResize: Story = {
	args: {
		className: "resize-none",
		placeholder: "This textarea cannot be resized",
	},
}

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = useState("Initial value")
		return (
			<div className="flex flex-col gap-4">
				<Textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type something here..." />
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
				<Textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type something here..." />
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

export const WithOnBlur: Story = {
	args: {
		placeholder: "Type and blur to see console log",
		onBlur: (e) => {
			console.log("Textarea blurred with value:", e.target.value)
		},
	},
}

export const FocusControl: Story = {
	render: () => {
		const textareaRef = useRef<HTMLTextAreaElement>(null)
		const [focusCount, setFocusCount] = useState(0)

		const focusTextarea = () => {
			textareaRef.current?.focus()
			setFocusCount((prev) => prev + 1)
		}

		const blurTextarea = () => {
			textareaRef.current?.blur()
		}

		const selectAll = () => {
			textareaRef.current?.select()
		}

		return (
			<div className="flex flex-col gap-4">
				<Textarea ref={textareaRef} placeholder="This textarea can be controlled from outside..." rows={4} />
				<div className="flex gap-2 flex-wrap">
					<button className="px-4 py-2 bg-primary text-white rounded-lg text-sm" onClick={focusTextarea}>
						Focus Textarea
					</button>
					<button className="px-4 py-2 bg-secondary text-primary rounded-lg text-sm" onClick={blurTextarea}>
						Blur Textarea
					</button>
					<button className="px-4 py-2 bg-accent text-white rounded-lg text-sm" onClick={selectAll}>
						Select All Text
					</button>
				</div>
				<div className="text-sm text-primary">Focus count: {focusCount}</div>
				<div className="text-xs text-secondary">
					Try clicking the buttons above to control the textarea focus programmatically
				</div>
			</div>
		)
	},
}
