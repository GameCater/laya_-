import { GameConfig } from "../GameConfig";
import AnimationManager from "./AnimationManager";
import { MenuStateRTBase } from "./MenuStateRT.generated";

const { regClass, property } = Laya;

@regClass()
export class MenuStateRT extends MenuStateRTBase {

    private resourcesLoaded: boolean = false;

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
                'resources/icon/BTN.png',
                'resources/icon/BTN_TOUCH.png',
                'resources/bg/majong_BG.png',
            ];
            let maxNum = 32;
            for (let i = 1; i <= maxNum; i ++) {
                resources.push(`resources/farm/${i}.png`);
                resources.push(`resources/farm/${i}_touch.png`);
            }

            this.ProgressBar_load.visible = true;
            Laya.loader.load(resources, null, Laya.Handler.create(this, this.recordProgress, null, false)).then(() => {
                
                // 加载完成后
                this.ProgressBar_load.visible = false;              
                this.resourcesLoaded = true;
                this.Btn_start.skins = [
                    "resources/icon/BTN_START.png",
                    "resources/icon/BTN_START_TOUCH.png",
                ];

                this.Btn_start.visible = true;
                AnimationManager.instance.registerAniDelayShow(this.Btn_start, 300);
                AnimationManager.instance.registerAniRushIn(this.Btn_start, new Laya.Point(291, 0), 400);
                this.Btn_start.on(Laya.Event.CLICK, this, this.startGame);
            });
        });
    }

    public startGame() {
        Laya.timer.once(200, this, () => {
            // 打开play场景，传入关卡1的数据
            Laya.Scene.open('ScenePlay.ls', true, GameConfig.Level[0]);
        });
    }

    // 加载条进度信息
    private recordProgress(value: number) {
        
        this.ProgressBar_load.value = value;
        if (value >= 0.98) {
            this.ProgressBar_load.visible = false;
        }
    }

    onClosed(type?: string): void {
        
        Laya.stage.offAll();
    }
}