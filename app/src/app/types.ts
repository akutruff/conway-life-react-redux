
export interface Vector2 {
    x: number,
    y: number
}

export enum LifeStatus {
    EMTPY,
    ALIVE
}

export interface Board {
    generation: number;
    gridSize: Vector2;
    cells: LifeStatus[][];
}
