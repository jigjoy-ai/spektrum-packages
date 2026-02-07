import { FC, useState } from "react"
import CopyIcon from "./copy.icon"
import CheckIcon from "./check.icon"
import { motion, AnimatePresence } from "framer-motion"

interface CopyableProps {
	text: string
	className?: string
	tooltipMessage?: string
}

const Copyable: FC<CopyableProps> = ({ text, className = "", tooltipMessage = "Copy to clipboard" }: CopyableProps) => {

	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error("Failed to copy:", err)
		}
	}

	return (
		<button
			onClick={handleCopy}
			className={`group inline-flex items-center gap-3 px-4 py-2 rounded-[4px] bg-primary-100 border border-border/60 hover:border-highlight/50 transition-all duration-300 ${className}`}
		>
			<code className="text-sm font-mono text-secondary">{text}</code>
			<AnimatePresence mode="wait">
				{copied ? (
					<motion.div
						key="check"
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						exit={{ scale: 0, rotate: 180 }}
						transition={{ duration: 0.2 }}
					>
						<CheckIcon size={18} className="text-progress" />
					</motion.div>
				) : (
					<motion.div
						key="copy"
						initial={{ scale: 0, rotate: 180 }}
						animate={{ scale: 1, rotate: 0 }}
						exit={{ scale: 0, rotate: -180 }}
						transition={{ duration: 0.2 }}
					>
						<CopyIcon size={18} className="text-secondary group-hover:text-foreground transition-colors" tooltipMessage={tooltipMessage} />
					</motion.div>
				)}
			</AnimatePresence>
		</button>
	)
}

Copyable.displayName = "Copyable"

export { Copyable }