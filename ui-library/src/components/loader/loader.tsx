import { useState, useEffect, FC } from "react"
import { AnimatedText } from "../animated-text/animated-text"
import { KittyLoader } from "./kitty-loader"

interface LoaderProps {
	message?: string
	size?: "small" | "medium" | "large"
}

const Loader: FC<LoaderProps> = ({ message = undefined, size = "medium" }) => {
	const [animatedText, setAnimatedText] = useState(message)

	// Effect to handle message changes
	useEffect(() => {
		if (message) {
			setAnimatedText(message)
		}
	}, [message])

	const messageClassName = size === "large" ? "text-lg" : size === "small" ? "text-sm" : "text-secondary"

	return (
		<div className="flex flex-col items-center justify-center w-full h-fit">
			<div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
				<div className="flex items-center justify-center w-full">
					<KittyLoader size={size} />
				</div>
				{animatedText && (
					<div className={`w-full px-4 ${messageClassName}`} data-testid="loader-message">
						<AnimatedText text={animatedText} />
					</div>
				)}
			</div>
		</div>
	)
}

export { Loader }
export type { LoaderProps }

Loader.displayName = "Loader"
