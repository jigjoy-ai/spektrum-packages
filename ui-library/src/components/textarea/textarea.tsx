import { useState, useEffect, forwardRef, ChangeEvent, FocusEvent, MouseEvent } from "react"
import { HTMLMotionProps, motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

interface TextareaProps extends HTMLMotionProps<"textarea"> {
	placeholder?: string
	rows?: number
	value?: string
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
	onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
	className?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{ className = "", rows = 3, placeholder = "", value = "", onChange = (e) => {}, onBlur = (e) => {}, ...props },
		ref
	) => {
		const [internalValue, setInternalValue] = useState(value)

		useEffect(() => {
			setInternalValue(value)
		}, [value])

		const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
			setInternalValue(e.target.value)
			onChange(e)
		}

		const handleMouseDown = (e: MouseEvent<HTMLTextAreaElement>) => {
			if (!internalValue) {
				e.preventDefault()
				const textarea = e.currentTarget
				textarea.focus()
				textarea.setSelectionRange(0, 0)
			}
		}

		return (
			<motion.textarea
				ref={ref}
				placeholder={placeholder}
				value={internalValue}
				className={twMerge(
					"mb-6 w-[320px] px-4 py-2 bg-surface text-secondary placeholder:text-secondary placeholder:opacity-70 rounded-lg outline-none focus:ring-1 focus:ring-secondary-200",
					className
				)}
				onChange={handleChange}
				onBlur={onBlur}
				onMouseDown={handleMouseDown}
				rows={rows}
				{...props}
			/>
		)
	}
)

Textarea.displayName = "Textarea"

export { Textarea }
