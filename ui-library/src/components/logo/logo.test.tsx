import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { Logo } from "./logo"

describe("Logo Component", () => {
    test("renders with default size (medium)", () => {
        const { container } = render(<Logo />)
        const logoContainer = container.firstChild as HTMLElement
        expect(logoContainer).toBeInTheDocument()
        
        // Should have 7 hexagons (6 outer + 1 center)
        const hexagons = container.querySelectorAll('svg')
        expect(hexagons).toHaveLength(7)
    })

    test("applies different sizes correctly", () => {
        const sizes = {
            small: 48,
            medium: 96,
            large: 144,
        }

        const { rerender, container } = render(<Logo size="small" />)
        let hexagon = container.querySelector('svg')
        expect(hexagon).toHaveAttribute('width', sizes.small.toString())
        expect(hexagon).toHaveAttribute('height', sizes.small.toString())

        rerender(<Logo size="medium" />)
        hexagon = container.querySelector('svg')
        expect(hexagon).toHaveAttribute('width', sizes.medium.toString())
        expect(hexagon).toHaveAttribute('height', sizes.medium.toString())

        rerender(<Logo size="large" />)
        hexagon = container.querySelector('svg')
        expect(hexagon).toHaveAttribute('width', sizes.large.toString())
        expect(hexagon).toHaveAttribute('height', sizes.large.toString())
    })

    test("applies custom className", () => {
        const { container } = render(<Logo className="custom-class" />)
        const logoContainer = container.firstChild as HTMLElement
        expect(logoContainer).toHaveClass("custom-class")
    })

    test("renders all hexagons with correct colors", () => {
        const { container } = render(<Logo />)
        const paths = container.querySelectorAll('path')
        
        paths.forEach((path, index) => {
            // Center hexagon (last one) should be hover color, others alternate primary/hover
            if (index === paths.length - 1) {
                expect(path).toHaveAttribute('fill', 'var(--color-hover-primary)')
            } else {
                expect(path).toHaveAttribute('fill', index % 2 === 0 ? 'var(--color-primary)' : 'var(--color-hover-primary)')
            }
        })
    })

    test("maintains aspect ratio and positioning", () => {
        const { container } = render(<Logo />)
        const logoContainer = container.firstChild as HTMLElement
        
        expect(logoContainer).toHaveClass("relative", "inline-block")
        expect(logoContainer).toHaveStyle({ margin: "0 auto" })
    })
})