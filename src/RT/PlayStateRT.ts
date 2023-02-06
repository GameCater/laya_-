import { BoardManager } from "../BoardManager";
import { PlayStateRTBase } from "./PlayStateRT.generated";
const { regClass } = Laya;

@regClass()
export class PlayStateRT extends PlayStateRTBase {

    private bm: BoardManager;
    private originLength: number;
    onOpened(param: any): void {
        // 初始化游戏面板
        // this.bm = new BoardManager(param.col, param.row, param.gridWidth, param.gridSpace, param.limitTime);
        this.bm = new BoardManager();
        this.Board.addComponentInstance(this.bm);
        this.bm.generateBoard(param.col, param.row, param.gridWidth, param.gridSpace, param.limitTime);

        this.Button_menu.on(Laya.Event.CLICK, this, () => {
            this.bm.generateBoard(param.col, param.row, param.gridWidth, param.gridSpace, param.limitTime);
        })
        
        this.originLength = this.Sprite_mask.width;
        Laya.stage.on('time', this, (leftTime: number) => {
            this.Sprite_mask.width = leftTime * this.originLength;
            if (this.Sprite_mask.width <= 0) {
                console.log('GameOver');
            }
        });
    }

    
}