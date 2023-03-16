import { Entity } from '@/utils'
import { Grid } from '@/grid'
import { Fleet } from '@/fleet'
import { Team } from '@/team'

export class Game extends Entity {
    private _lastTimestamp = 0

    private _entities: Entity[] = []

    public get Entities(): Entity[] {
        return this._entities
    }

    public Awake(): void {
        super.Awake()

        this._entities.push(
            new Grid(),
            new Fleet(Team.A),
            new Fleet(Team.B),
        )

        for (const entity of this.Entities) {
            entity.Awake()
        }

        window.requestAnimationFrame(() => {
            this._lastTimestamp = Date.now()

            this.Update()
        })
    }

    public Update(): void {
        const deltaTime = (Date.now() - this._lastTimestamp) / 1000

        super.Update(deltaTime)

        for (const entity of this.Entities) {
            entity.Update(deltaTime)
        }

        this._lastTimestamp = Date.now()

        window.requestAnimationFrame(() => this.Update())
    }
}