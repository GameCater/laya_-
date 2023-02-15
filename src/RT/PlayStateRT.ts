import { BoardManager } from "../BoardManager";
import { GameConfig } from "../GameConfig";
import AnimationManager from "./AnimationManager";
import { PlayStateRTBase } from "./PlayStateRT.generated";
const { regClass } = Laya;

@regClass()
export class PlayStateRT extends PlayStateRTBase {

    private bm: BoardManager;
    private originLength: number;
    private currentLevel: number = 0;

    onOpened(param: any): void {

        AnimationManager.instance.registerAniDelayShow(this, 150);

        this.currentLevel = param.rank;

        this.Button_menu.skins = [
            'resources/icon/BTN_MAIN_MENU_ICON.png',
            'resources/icon/BTN_MAIN_MENU_ICON_TOUCH.png',
        ];
        this.Button_pause.skins = [
            'resources/icon/BTN_PAUSE.png',
            'resources/icon/BTN_PAUSE_TOUCH.png',
        ];
        this.Button_menu.on(Laya.Event.CLICK, this, this.backMenu);
        this.Button_pause.on(Laya.Event.CLICK, this, this.pauseGame);


        this.bm = new BoardManager(); 
        this.Board.addComponentInstance(this.bm);
        this.bm.generateBoard(param.col, param.row, param.gridWidth, param.gridSpace, param.limitTime);

        this.originLength = this.Sprite_mask.width;
        Laya.stage.on(GameConfig.Message.TIME, this, (leftTime: number) => {
            // 倒计时条
            this.Sprite_mask.width = leftTime * this.originLength;
        });


        // gameover
        Laya.stage.on(GameConfig.Message.GAMEOVER, this, this.gameover);

        // level win
        Laya.stage.on(GameConfig.Message.WIN, this, this.winLevel);
    }

    private backMenu() {
        // this.bm.generateBoard(param.col, param.row, param.gridWidth, param.gridSpace, param.limitTime);
        Laya.Scene.open('SceneMenu.ls', true);
    }

    private winLevel(levelScore: number, totalScore: number) {

        // 是否通关
        let nextLevelIndex = this.currentLevel;
        this.currentLevel += 1;
        if (nextLevelIndex >= GameConfig.Level.length) {

            this.gameover(totalScore);
            return;
        }

        // 清理点击事件
        this.Button_menu.offAll(Laya.Event.CLICK);
        this.Button_pause.offAll(Laya.Event.CLICK);

        this.Board.visible = false;
        this.Dialog_nextLevel.visible = true;
        this.Button_nextLevel.skins = [
            'resources/icon/BTN_NEXT_LEVEL.png',
            'resources/icon/BTN_NEXT_LEVEL_TOUCH.png',
        ];

        this.FontClip_levelScore.value = '' + levelScore;

        this.Button_nextLevel.on(Laya.Event.CLICK, this, () => {

            this.Dialog_nextLevel.visible = false;
            this.Board.visible = true;
            this.Button_menu.on(Laya.Event.CLICK, this, this.backMenu);
            this.Button_pause.on(Laya.Event.CLICK, this, this.pauseGame);

            // 去下一关
            this.bm.enabled = false;
            let nextLevelInfo = GameConfig.Level[nextLevelIndex];
            this.bm.generateBoard(nextLevelInfo.col, nextLevelInfo.row, nextLevelInfo.gridWidth, nextLevelInfo.gridSpace, nextLevelInfo.limitTime);
        });
    }

    private gameover(gameScore: number = 0) {

        // 清理点击事件
        this.Button_menu.offAll(Laya.Event.CLICK);
        this.Button_pause.offAll(Laya.Event.CLICK);

        this.Board.visible = false;
        this.Dialog_gameOver.visible = true;
        this.Button_backHome.skins = [
            'resources/icon/BTN.png',
            'resources/icon/BTN_TOUCH.png',
        ];

        this.FontClip_gameScore.value = '' + gameScore;

        this.Button_backHome.on(Laya.Event.CLICK, () => {
            Laya.Scene.open('SceneMenu.ls', true);
        });

    }

    private pauseGame() {
        console.log('paused');
        
        this.Board.visible = false;
        Laya.stage.event(GameConfig.Message.PAUSED, true);
        this.Box_pause.visible = true;

        this.Button_pause.skins = [
            'resources/icon/BTN_GAME_BACK.png',
            'resources/icon/BTN_GAME_BACK_TOUCH.png',
        ];
        this.Button_pause.off(Laya.Event.CLICK, this, this.pauseGame);
        this.Button_pause.on(Laya.Event.CLICK, this, this.resumeGame);
    }

    private resumeGame() {
        console.log('resumed');
        
        Laya.stage.event(GameConfig.Message.PAUSED, false);
        this.Board.visible = true;
        this.Box_pause.visible = false;

        this.Button_pause.skins = [
            'resources/icon/BTN_PAUSE.png',
            'resources/icon/BTN_PAUSE_TOUCH.png',
        ];
        this.Button_pause.off(Laya.Event.CLICK, this, this.resumeGame);
        this.Button_pause.on(Laya.Event.CLICK, this, this.pauseGame);
    }
    
}