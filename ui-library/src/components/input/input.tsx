import React, { useState, useEffect, forwardRef } from "react"
import { HTMLMotionProps, motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

interface InputProps extends HTMLMotionProps<"input"> {
	type?: "text" | "password" | "email" | "number"
	placeholder?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
	className?: string
	value?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ type = "text", className = "", placeholder = "", onChange = (e) => {}, onBlur = (e) => {}, value = "", ...props },
		ref
	) => {
		const [internalValue, setInternalValue] = useState(value)

		useEffect(() => {
			setInternalValue(value)
		}, [value])

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setInternalValue(e.target.value)
			onChange(e)
		}

		return (
			<motion.input
				ref={ref}
				type={type}
				placeholder={placeholder}
				value={internalValue}
				className={twMerge(
					"w-[320px] px-4 py-2 bg-surface text-secondary text-sm placeholder:text-secondary placeholder:opacity-70 rounded-lg outline-none focus:ring-1 focus:ring-secondary-200",
					className
				)}
				onChange={handleChange}
				onBlur={onBlur}
				{...props}
			/>
		)
	}
)

Input.displayName = "Input"

export { Input }
