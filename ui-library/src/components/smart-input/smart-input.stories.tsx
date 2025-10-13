import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { SmartInput } from "./smart-input"
import { SmartFooter } from "./smart-footer"
import { Button } from "../button/button"

const meta: Meta<typeof SmartInput> = {
	title: "Components/SmartInput",
	component: SmartInput,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof SmartInput>

// Basic example without footer
export const Basic: Story = {
	args: {
		placeholder: "Type something...",
		value: "",
		onChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState("")
		return <SmartInput {...args} value={value} onChange={setValue} />
	},
}

// With footer containing buttons
export const WithFooterButtons: Story = {
	args: {
		placeholder: "Type something...",
		value: "",
		onChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState("")
		return (
			<SmartInput {...args} value={value} onChange={setValue}>
				<SmartFooter>
					<div className="flex gap-2 justify-end">
						<Button variant="secondary" size="sm">
							Cancel
						</Button>
						<Button variant="primary" size="sm">
							Save
						</Button>
					</div>
				</SmartFooter>
			</SmartInput>
		)
	},
}

// With footer containing icons
export const WithFooterIcons: Story = {
	args: {
		placeholder: "Type something...",
		value: "",
		onChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState("")
		return (
			<SmartInput {...args} value={value} onChange={setValue}>
				<SmartFooter>
					<div className="flex gap-2 justify-end">
						<svg
							className="w-5 h-5 text-secondary cursor-pointer hover:text-secondary/80"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
						</svg>
						<svg
							className="w-5 h-5 text-secondary cursor-pointer hover:text-secondary/80"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
						</svg>
					</div>
				</SmartFooter>
			</SmartInput>
		)
	},
}

// With initial value
export const WithInitialValue: Story = {
	args: {
		placeholder: "Type something...",
		value: "Initial text",
		onChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState("Initial text")
		return (
			<SmartInput {...args} value={value} onChange={setValue}>
				<SmartFooter>
					<div className="flex gap-2 justify-end">
						<Button variant="secondary" size="sm">
							Clear
						</Button>
					</div>
				</SmartFooter>
			</SmartInput>
		)
	},
}

// With custom footer content
export const WithCustomFooter: Story = {
	args: {
		placeholder: "Type something...",
		value: "",
		onChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState("")
		return (
			<SmartInput {...args} value={value} onChange={setValue}>
				<SmartFooter>
					<div className="flex items-center justify-between">
						<span className="text-xs text-secondary/70">Character count: {value.length}</span>
						<Button variant="primary" size="sm">
							Submit
						</Button>
					</div>
				</SmartFooter>
			</SmartInput>
		)
	},
}

export const Default: Story = {
	args: {
		placeholder: "Type something...",
		value: "",
	},
}

export const WithCustomPlaceholder: Story = {
	args: {
		placeholder: "Custom styled placeholder",
		value: "",
		placeholderClassName: "text-danger font-medium italic",
	},
}

export const DarkThemeWithPlaceholder: Story = {
	args: {
		placeholder: "Dark theme placeholder",
		value: "",
		className: "w-[500px] bg-black/80 border-white/20",
		placeholderClassName: "text-white/50",
	},
	render: (args) => (
		<SmartInput {...args}>
			<SmartFooter className="bg-black/80 border-white/20">
				<div className="flex justify-end gap-2">
					<button className="px-3 py-1 text-sm text-white/70 hover:bg-white/10 rounded">Cancel</button>
					<button className="px-3 py-1 text-sm bg-white text-black rounded">Save</button>
				</div>
			</SmartFooter>
		</SmartInput>
	),
}

export const CompactWithPlaceholder: Story = {
	args: {
		placeholder: "Compact placeholder",
		value: "",
		className: "w-[300px] min-h-10 text-xs",
		placeholderClassName: "text-xs",
	},
	render: (args) => (
		<SmartInput {...args}>
			<SmartFooter className="p-1">
				<div className="flex justify-end gap-1">
					<button className="px-2 py-0.5 text-xs text-secondary hover:bg-secondary/10 rounded">Cancel</button>
					<button className="px-2 py-0.5 text-xs bg-pink-500 text-black rounded">Save</button>
				</div>
			</SmartFooter>
		</SmartInput>
	),
}

export const WithCustomStyling: Story = {
	args: {
		placeholder: "Custom styled input",
		value: "",
		className: "w-[500px] bg-primary/5 border-primary/20",
		placeholderClassName: "text-primary/50",
	},
	render: (args) => (
		<SmartInput {...args}>
			<SmartFooter className="bg-primary/5 border-primary/20">
				<div className="flex justify-end gap-2">
					<button className="px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded">Cancel</button>
					<button className="px-3 py-1 text-sm bg-primary text-white rounded">Save</button>
				</div>
			</SmartFooter>
		</SmartInput>
	),
}

export const DarkTheme: Story = {
	args: {
		placeholder: "Dark theme input",
		value: "",
		className: "w-[500px] bg-black/80 border-white/20",
	},
	render: (args) => (
		<SmartInput {...args}>
			<SmartFooter className="bg-black/80 border-white/20">
				<div className="flex justify-end gap-2">
					<button className="px-3 py-1 text-sm text-white/70 hover:bg-white/10 rounded">Cancel</button>
					<button className="px-3 py-1 text-sm bg-white text-black rounded">Save</button>
				</div>
			</SmartFooter>
		</SmartInput>
	),
}

export const Compact: Story = {
	args: {
		placeholder: "Compact input",
		value: "",
		className: "w-[300px] min-h-10",
	},
	render: (args) => (
		<SmartInput {...args}>
			<SmartFooter className="p-1">
				<div className="flex justify-end gap-1">
					<button className="px-2 py-0.5 text-xs text-secondary hover:bg-secondary/10 rounded">Cancel</button>
					<button className="px-2 py-0.5 text-xs bg-lime-300 text-black rounded">Save</button>
				</div>
			</SmartFooter>
		</SmartInput>
	),
}

export const WithCustomFooterOnly: Story = {
	args: {
		placeholder: "Input with custom footer",
		value: "",
		placeholderClassName: "text-danger/70",
	},
	render: (args) => (
		<SmartInput {...args}>
			<SmartFooter className="bg-danger/5 border-danger/20">
				<div className="flex justify-between items-center px-2">
					<span className="text-xs text-danger">Error: Invalid input</span>
					<button className="px-2 py-1 text-xs bg-danger text-white rounded">Clear</button>
				</div>
			</SmartFooter>
		</SmartInput>
	),
}

export const WithBlurHandler: Story = {
	args: {
		placeholder: "Type and blur to see console output",
		value: "",
		onChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState("")
		const [blurCount, setBlurCount] = useState(0)

		const handleBlur = (blurValue: string) => {
			setBlurCount((prev) => prev + 1)
			console.log("Input blurred!", {
				value,
				blurCount: blurCount + 1,
				inputValue: blurValue,
			})
		}

		return (
			<div className="space-y-4">
				<SmartInput {...args} value={value} onChange={setValue} onBlur={handleBlur} />
				<div className="text-sm text-primary">Blur count: {blurCount}</div>
			</div>
		)
	},
}

export const WithExternalBlurHandler: Story = {
	args: {
		placeholder: "Type and blur to test external handler",
		value: "",
		onChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState("")
		const [externalBlurCalled, setExternalBlurCalled] = useState(false)
		const [lastBlurValue, setLastBlurValue] = useState("")

		const externalBlurHandler = (blurValue: string) => {
			setExternalBlurCalled(true)
			setLastBlurValue(blurValue)
			console.log("External blur handler called with value:", blurValue)
		}

		return (
			<div className="space-y-4">
				<SmartInput {...args} value={value} onChange={setValue} onBlur={externalBlurHandler} />
				<div className="text-sm space-y-2">
					<div className="text-primary">External blur handler called: {externalBlurCalled ? "Yes" : "No"}</div>
					{externalBlurCalled && <div className="text-primary">Last value on blur: "{lastBlurValue}"</div>}
				</div>
			</div>
		)
	},
}

export const WithOnChangeLogging: Story = {
	args: {
		placeholder: "Type to see onChange events in console",
		value: "",
	},
	render: (args) => {
		const [value, setValue] = useState("")
		const [changeCount, setChangeCount] = useState(0)

		const handleChange = (newValue: string) => {
			setValue(newValue)
			setChangeCount((prev) => prev + 1)
			console.log("onChange called with value:", newValue)
		}

		return (
			<div className="space-y-4">
				<SmartInput {...args} value={value} onChange={handleChange} />
				<div className="text-sm space-y-2">
					<div className="text-primary">Current value: "{value}"</div>
					<div className="text-primary">Number of changes: {changeCount}</div>
				</div>
			</div>
		)
	},
}
