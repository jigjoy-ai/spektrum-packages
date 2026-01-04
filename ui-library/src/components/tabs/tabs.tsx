import { ReactElement, useState, FC, Children, cloneElement } from "react"
import { twMerge } from "tailwind-merge"

interface TabsProps {
	children:
		| ReactElement<{ key?: React.Key; display?: boolean }>
		| ReactElement<{ key?: React.Key; display?: boolean }>[]
	className?: string
}

const Tabs: FC<TabsProps> = ({ children, className }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(0)

	return (
		<div className="h-full w-full max-h-full bg-surface-light flex flex-col">
			<div className="flex flex-row">
				{Children.map(children, (child, index) => {
					const isActive = index === activeTab
					return (
						<button
							key={index}
							onClick={() => setActiveTab(index)}
							className={twMerge(
								`
                                relative px-4 py-2 text-sm font-medium
                                rounded-t-md
                                ${
									isActive
										? "text-secondary bg-surface"
										: "text-secondary-100 cursor-pointer bg-surface-light hover:text-hover"
								}
                            `,
								className,
							)}
						>
							{child.key}
						</button>
					)
				})}
			</div>

			{/* Tab Content */}

			<div className="rounded-b-sm rounded-tr-sm grow bg-surface h-full">
				{Children.map(children, (child, index) => cloneElement(child, { display: activeTab === index }))}
			</div>
		</div>
	)
}

Tabs.displayName = "Tabs"

export { Tabs }
