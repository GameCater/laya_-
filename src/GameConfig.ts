export class GameConfig {
    public static Level: LevelInfo[] = [
        { rank: 1, col: 6, row: 8, gridWidth: 80, gridSpace: 2 ,limitTime: 5 },
        { rank: 2, col: 9, row: 12, gridWidth: 60, gridSpace: 2 ,limitTime: 10 },
        { rank: 3, col: 12, row: 16, gridWidth: 46, gridSpace: 2 ,limitTime: 15 },
    ]
}

type LevelInfo = {
    readonly rank: number,
    readonly col: number,
    readonly row: number,
    readonly gridWidth: number,
    readonly gridSpace: number,
    readonly limitTime: number // 单位：分钟
}