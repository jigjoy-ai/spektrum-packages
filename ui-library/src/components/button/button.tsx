import { HTMLMotionProps, motion } from "framer-motion"
import { FC, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonProps extends HTMLMotionProps<"button"> {
	children: ReactNode
	onClick?: () => void
	size?: "sm" | "md" | "lg"
	variant?: "primary" | "secondary" | "danger"
	className?: string
	disabled?: boolean
	loading?: boolean
}

const Button: FC<ButtonProps> = ({
	children,
	className = "",
	size = "sm",
	variant = "primary",
	onClick = () => {},
	disabled = false,
	loading = false,
}: ButtonProps) => {
	const sizeClasses = {
		sm: "px-2 py-1",
		md: "px-3 py-1.5",
		lg: "px-4 py-2",
	}

	const variantClasses = {
		primary: "bg-surface text-secondary-100 border border-secondary-200 hover:bg-surface/80",
		secondary: "bg-secondary text-primary hover:bg-secondary/80",
		danger: "bg-danger text-[#1a1a1a] border-0 hover:bg-danger/80",
	}

	const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none"

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (disabled || loading) {
			e.preventDefault()
			return
		}
		onClick()
	}

	const Spinner = () => (
		<motion.div
			className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
			animate={{ rotate: 360 }}
			transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
		/>
	)

	return (
		<motion.button
			className={twMerge(
				"text-sm cursor-pointer rounded-sm flex items-center justify-center gap-2",
				sizeClasses[size],
				variantClasses[variant],
				(disabled || loading) && disabledClasses,
				className,
			)}
			onClick={handleClick}
			disabled={disabled || loading}
		>
			{loading && <Spinner />}
			{children}
		</motion.button>
	)
}

Button.displayName = "Button"

export { Button }
