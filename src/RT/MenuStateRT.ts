import { GameConfig } from "../GameConfig";
import { MenuStateRTBase } from "./MenuStateRT.generated";

const { regClass, property } = Laya;

@regClass()
export class MenuStateRT extends MenuStateRTBase {

    onAwake(): void {
        let preLoad = [
            "resources/icon/progress.png",
            "resources/icon/progress$bar.png",
            "resources/bg/MAIN_MENU_BG.png",
            "resources/icon/BTN_START.png",
            "resources/icon/BTN_START_TOUCH.png",
        ];

        Laya.loader.load(preLoad).then(() => {

            let resources = [
                { url: "ScenePlay.ls", type: Laya.Loader.HIERARCHY },
                'resources/icon/BTN_NEXT_LEVEL_TOUCH.png',
                'resources/icon/BTN_NEXT_LEVEL.png',
                'resources/icon/BTN_GAME_BACK_TOUCH.png',
                'resources/icon/BTN_GAME_BACK.png',
                'resources/icon/BTN_MAIN_MENU_ICON_TOUCH.png',
                'resources/icon/BTN_MAIN_MENU_ICON.png',
                'resources/icon/BTN_PAUSE_TOUCH.png',
                'resources/icon/BTN_PAUSE.png',
                'resources/icon/TIME__FULL.png',
                'resources/icon/TIME_EMPTY.png',
            ];

            let maxNum = 32;
            for (let i = 1; i <= maxNum; i ++) {
                resources.push(`resources/farm/${i}.png`);
                resources.push(`resources/farm/${i}_touch.png`);
            }

            Laya.loader.load(resources, null, Laya.Handler.create(this, this.recordProgress, null, false)).then(() => {
                // 加载完成后
                this.Btn_start.visible = true;
                this.Btn_start.on(Laya.Event.CLICK, this, this.startGame);
            }); 
        });
    }

    public startGame() {
        this.Btn_start.skin = "resources/icon/BTN_START_TOUCH.png";
        Laya.timer.once(200, this, () => {
            Laya.Scene.open('ScenePlay.ls', true, GameConfig.Level[0]);
        });
    }

    private recordProgress(value: number) {
        this.ProgressBar_load.value = value;
        if (value >= 0.98) {
            this.ProgressBar_load.visible = false;
        }
    }
}