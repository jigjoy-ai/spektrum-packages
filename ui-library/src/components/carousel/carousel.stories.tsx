import type { Meta, StoryObj } from "@storybook/react"
import { Carousel } from "./carousel"
import { CarouselItem } from "./carousel-item"
import { Card } from "../card/card"
import { Button } from "../button/button"

const meta: Meta<typeof Carousel> = {
	title: "Components/Carousel",
	component: Carousel,
}

export default meta
type Story = StoryObj<typeof Carousel>

const CardContent = ({ title, description }: { title: string; description: string }) => (
	<div className="p-4 flex flex-col h-full">
		<h3 className="text-secondary text-lg mb-2">{title}</h3>
		<p className="text-secondary-100 mb-4 flex-grow">{description}</p>
		<div className="flex gap-2">
			<Button size="sm" variant="primary">
				Learn More
			</Button>
			<Button size="sm" variant="secondary">
				Share
			</Button>
		</div>
	</div>
)

export const Default: Story = {
	render: () => (
		<div className="w-full max-w-[900px] mx-auto p-4">
			<Carousel maxVisibleItems={3}>
				<CarouselItem>
					<Card className="h-full">
						<CardContent
							title="Feature One"
							description="Discover amazing features that will boost your productivity and streamline your workflow."
						/>
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full">
						<CardContent
							title="Feature Two"
							description="Advanced analytics and reporting tools to help you make data-driven decisions."
						/>
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full">
						<CardContent
							title="Feature Three"
							description="Seamless integration with your favorite tools and platforms for maximum efficiency."
						/>
					</Card>
				</CarouselItem>
			</Carousel>
		</div>
	),
}

export const SingleItemView: Story = {
	render: () => (
		<div className="w-full max-w-[400px] mx-auto p-4">
			<Carousel maxVisibleItems={1}>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Step One" description="Begin your journey with our intuitive onboarding process." />
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Step Two" description="Configure your workspace with powerful customization options." />
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Step Three" description="Connect with team members and start collaborating." />
					</Card>
				</CarouselItem>
			</Carousel>
		</div>
	),
}

export const SingleItemViewWithDots: Story = {
	render: () => (
		<div className="w-full max-w-[400px] mx-auto p-4">
			<Carousel maxVisibleItems={1} showDots={true}>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Step One" description="Begin your journey with our intuitive onboarding process." />
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Step Two" description="Configure your workspace with powerful customization options." />
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Step Three" description="Connect with team members and start collaborating." />
					</Card>
				</CarouselItem>
			</Carousel>
		</div>
	),
}

export const TwoVisibleItems: Story = {
	render: () => (
		<div className="w-full max-w-[600px] mx-auto p-4">
			<Carousel maxVisibleItems={2}>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Product One" description="Premium quality materials ensure durability and comfort." />
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Product Two" description="Ergonomic design for optimal user experience." />
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Product Three" description="Smart features that adapt to your needs." />
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Product Four" description="Sustainable materials for eco-conscious consumers." />
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Product Five" description="Advanced technology for superior performance." />
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full">
						<CardContent title="Product Six" description="Customizable options to match your style." />
					</Card>
				</CarouselItem>
			</Carousel>
		</div>
	),
}

export const ButtonsOnly: Story = {
	render: () => (
		<div className="w-full max-w-[900px] mx-auto p-4">
			<Carousel maxVisibleItems={4}>
				<CarouselItem>
					<Button size="lg" variant="primary">
						First Button
					</Button>
				</CarouselItem>
				<CarouselItem>
					<Button size="lg" variant="secondary">
						Second Button
					</Button>
				</CarouselItem>
				<CarouselItem>
					<Button size="lg" variant="danger">
						Third Button
					</Button>
				</CarouselItem>
				<CarouselItem>
					<Button size="lg" variant="primary">
						Fourth Button
					</Button>
				</CarouselItem>
				<CarouselItem>
					<Button size="lg" variant="secondary">
						Fifth Button
					</Button>
				</CarouselItem>
			</Carousel>
		</div>
	),
}

export const WithCustomStyling: Story = {
	render: () => (
		<div className="w-full max-w-[900px] mx-auto p-4">
			<Carousel maxVisibleItems={3} className="bg-surface-light p-4 rounded-lg">
				<CarouselItem>
					<Card className="h-full bg-surface border-secondary">
						<CardContent
							title="Dark Theme"
							description="Experience our sleek dark mode interface designed for optimal viewing."
						/>
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full bg-surface border-secondary">
						<CardContent
							title="Customizable"
							description="Tailor the interface to match your brand and preferences perfectly."
						/>
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full bg-surface border-secondary">
						<CardContent
							title="Responsive"
							description="Enjoy a seamless experience across all devices and screen sizes."
						/>
					</Card>
				</CarouselItem>
				<CarouselItem>
					<Card className="h-full bg-surface border-secondary">
						<CardContent
							title="Accessible"
							description="Inclusive design ensures everyone can use our platform effectively."
						/>
					</Card>
				</CarouselItem>
			</Carousel>
		</div>
	),
}
