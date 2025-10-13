import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { LogoHexagon } from "./logo-hexagon"

describe("LogoHexagon Component", () => {
    test("renders with provided size", () => {
        const size = 48
        const { container } = render(
            <LogoHexagon 
                size={size} 
                fillColor="#000000" 
            />
        )
        
        const svg = container.querySelector('svg')
        expect(svg).toHaveAttribute('width', size.toString())
        expect(svg).toHaveAttribute('height', size.toString())
        expect(svg).toHaveAttribute('viewBox', `0 0 ${size} ${size}`)
    })

    test("applies fill color", () => {
        const fillColor = "#FF0000"
        const { container } = render(
            <LogoHexagon 
                fillColor={fillColor} 
            />
        )
        
        const path = container.querySelector('path')
        expect(path).toHaveAttribute('fill', fillColor)
        expect(path).not.toHaveAttribute('stroke')
        expect(path).not.toHaveAttribute('stroke-width')
    })

    test("applies stroke attributes when strokeColor is provided", () => {
        const fillColor = "#FF0000"
        const strokeColor = "#00FF00"
        const { container } = render(
            <LogoHexagon 
                fillColor={fillColor} 
                strokeColor={strokeColor} 
            />
        )
        
        const path = container.querySelector('path')
        expect(path).toHaveAttribute('fill', fillColor)
        expect(path).toHaveAttribute('stroke', strokeColor)
        expect(path).toHaveAttribute('stroke-width', '1')
    })

    test("uses default size when not provided", () => {
        const { container } = render(
            <LogoHexagon 
                fillColor="#000000" 
            />
        )
        
        const svg = container.querySelector('svg')
        expect(svg).toHaveAttribute('width', '24')
        expect(svg).toHaveAttribute('height', '24')
    })

    test("renders hexagon path correctly", () => {
        const { container } = render(
            <LogoHexagon 
                size={24} 
                fillColor="#000000" 
            />
        )
        
        const path = container.querySelector('path')
        expect(path).toBeInTheDocument()
        expect(path).toHaveAttribute('d') // Should have a path definition
    })
})