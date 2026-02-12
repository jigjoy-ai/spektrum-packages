import { useRef, useState, useEffect, ReactNode, isValidElement, FC } from "react"
import { SmartInputContext } from "./smart-input-context"
import { SmartFooter } from "./smart-footer"
import { twMerge } from "tailwind-merge"

interface SmartInputProps {
	placeholder: string
	value: string
	onChange: (value: string) => void
	onBlur?: (value: string) => void
	children?: ReactNode
	className?: string
	placeholderClassName?: string
}

const SmartInput: FC<SmartInputProps> = ({
	placeholder,
	value,
	onChange,
	onBlur = () => {},
	children,
	className = "",
	placeholderClassName = "",
}: SmartInputProps) => {
	const inputRef = useRef<HTMLParagraphElement>(null)
	const [isEmpty, setIsEmpty] = useState(true)

	// Validate that only SmartFooter is allowed as a child
	if (children && (!isValidElement(children) || children.type !== SmartFooter)) {
		throw new Error("SmartInput only accepts SmartFooter as a child component")
	}

	useEffect(() => {
		if (inputRef.current && inputRef.current.innerText !== value) {
			inputRef.current.innerText = value
		}
		setIsEmpty(value.trim() === "")
	}, [value])

	const handleInput = (e: React.InputEvent<HTMLParagraphElement>) => {
		const text = e.currentTarget.innerText ?? ""
		setIsEmpty(text.trim() === "")
		onChange(text)
	}

	const handleMouseDown = (e: React.MouseEvent<HTMLParagraphElement>) => {
		if (!inputRef.current) return
		if (isEmpty) {
			e.preventDefault()
			inputRef.current.focus()
		}
	}

	const contextValue = {
		value,
		onChange,
	}

	return (
		<SmartInputContext.Provider value={contextValue}>
			<div
				className={twMerge(
					"relative outline-none bg-surface-muted border border-secondary-200 rounded",
					className,
				)}
			>
				{isEmpty && (
					<span
						className={twMerge(
							"absolute top-2 left-2 text-secondary/70 text-sm pointer-events-none",
							placeholderClassName,
						)}
					>
						{placeholder}
					</span>
				)}
				<p
					className={twMerge(
						"rounded-sm text-sm w-[400px] max-w-full p-2 resize-none min-h-20 h-auto overflow-hidden whitespace-pre-wrap focus:outline-none text-secondary",
						className,
					)}
					contentEditable
					suppressContentEditableWarning
					onMouseDown={handleMouseDown}
					onInput={handleInput}
					onBlur={(e: React.FocusEvent<HTMLParagraphElement>) => onBlur?.(e.currentTarget.innerText)}
					ref={inputRef}
				/>
				{children && children}
			</div>
		</SmartInputContext.Provider>
	)
}

SmartInput.displayName = "SmartInput"
export { SmartInput }
