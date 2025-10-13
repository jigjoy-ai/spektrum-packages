import { cloneElement, FC, ReactElement } from "react"
import { useChevron } from "./chevron"
import ChevronDownIcon from "./icons/chevron-down"
import ChevronUpIcon from "./icons/chevron-up"

interface ChevronTriggerProps {
	children: ReactElement<{ onClick?: () => void; children?: React.ReactNode }>
}

export const ChevronTrigger: FC<ChevronTriggerProps> = ({ children }: ChevronTriggerProps) => {
	const { handleToggle, isExpanded } = useChevron()

	return (
		<div
			className="bg-surface text-highlight flex flex-row cursor-pointer h-[50px] max-h-[50px] gap-1 items-center px-4"
			onClick={handleToggle}
		>
			{cloneElement(children)}
			<div className="gap-1 flex grow justify-end">
				<div className="w-fit">{isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
			</div>
		</div>
	)
}

ChevronTrigger.displayName = "ChevronTrigger"
