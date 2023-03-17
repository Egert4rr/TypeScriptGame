import { Node, NodeDrawComponent, mockNodeFactory } from '@/node'
import { Vector2D } from '@/utils'

describe('>>> Node', () => {
    const start = new Vector2D(1, 2)
    const end = new Vector2D(5, 6)

    let node: Node

    beforeEach(() => {
        node = mockNodeFactory(start, end)
    })

    it('should calculate size', () => {
        expect(node.Size.x).toBe<number>(end.x - start.x)
        expect(node.Size.y).toBe<number>(end.y - start.y)
    })

    it('should calculate center point', () => {
        expect(node.Center.x).toBe<number>(start.x + node.Size.x / 2)
        expect(node.Center.y).toBe<number>(start.y + node.Size.y / 2)
    })

    it('should check if provided point is within occupied area', () => {
        expect(node.Occupies(new Vector2D(3, 2))).toBeTruthy()
        expect(node.Occupies(new Vector2D(6, 2))).toBeFalsy()
        expect(node.Occupies(new Vector2D(3, 7))).toBeFalsy()
    })
})