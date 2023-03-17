/*
* @jest-environment jsdom
*/

import { Game, mockGameFactory } from '@/game'
import { GameInputComponent } from './input'
import { CanvasLayer } from '@/canvas-layer'
import { Grid, mockGridFactory } from '@/grid'
import { Vector2D, OnclickComponent } from '@/utils'

class FakeGridOnclickComponent extends OnclickComponent {
    public Entity: Grid

    public Awake(): void {
    }

    public Update(deltaTime: number): void {
    }

    public ClickOn(point: Vector2D): void {
    }
}

describe('>>> Game Input Component', () => {
    let comp: GameInputComponent
    let grid: Grid
    let game: Game

    beforeEach(() => {
        grid = mockGridFactory()
        grid.AddComponent(new FakeGridOnclickComponent())
        game = mockGameFactory(grid)
        comp = new GameInputComponent()

        game.AddComponent(comp)
        game.Awake()
    })

    it('should handle click', () => {
        const point = new Vector2D(200, 200)
        const spy = jest.spyOn(grid.GetComponent(OnclickComponent), 'ClickOn')

        CanvasLayer.Background.CalcLocalPointFrom = jest.fn().mockReturnValueOnce(point)


        expect(spy).not.toBeCalled()

        document.body.dispatchEvent(new MouseEvent('click'))

        expect(spy).toBeCalledWith(point)
    })
})