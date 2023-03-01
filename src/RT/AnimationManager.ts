export default class AnimationManager {
    public static instance = new AnimationManager();

    private constructor() {
        if (AnimationManager.instance) {
            AnimationManager.instance = new AnimationManager();
        }
    }

    // 延迟显示
    public registerAniDelayShow(target: Laya.Sprite, delay: number): void {
        Laya.Tween.from(target, { alpha: 0 }, delay, Laya.Ease.circIn);
    }

    // 闯入
    public registerAniRushIn(target: Laya.Sprite, positon: Laya.Point, duration: number): void {
        if (positon.x && positon.y) {
            Laya.Tween.to(target, { x: positon.x , y: positon.y }, duration, Laya.Ease.bounceOut);
        } else if (positon.x) {
            Laya.Tween.to(target, { x: positon.x }, duration, Laya.Ease.bounceOut);
        } else if (positon.y) {
            Laya.Tween.to(target, { y: positon.y }, duration, Laya.Ease.bounceOut);
        }
    }

    // 一次缩放
    public registerAniScale(target: Laya.Sprite, duration: number, callback?: Function): void {
        Laya.Tween.to(target, { scaleX: 0.8, scaleY: 0.8 }, duration/2, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
            Laya.Tween.to(target, { scaleX: 1, scaleY: 1 }, duration, Laya.Ease.linearOut, Laya.Handler.create(this, () => {
                if (callback) {
                    callback();
                }
            }));
        }))
    }

    public registerAniFadeAway(target: Laya.Sprite, duration: number, callback?: Function): void {

        // let loopFunction = (overturn: boolean) => {
        //     if (overturn) {
        //         Laya.Tween.to(target, { rotation: 30 }, duration/3, Laya.Ease.circIn);
        //     } else {
        //         Laya.Tween.to(target, { rotation: -30 }, duration/3, Laya.Ease.circIn);
        //     }
        //     overturn = !overturn;
        // };

        let exit: boolean = false;
        if (!exit) {
            let overturn: boolean = false;
            Laya.timer.loop(duration, this, () => {
                if (overturn) {
                    Laya.Tween.to(target, { rotation: 30 }, duration/12, Laya.Ease.circIn);
                } else {
                    Laya.Tween.to(target, { rotation: -30 }, duration/12, Laya.Ease.circIn);
                }
                overturn = !overturn;
            });
            Laya.Tween.to(target, { scaleX: 0, scaleY: 0 }, duration, Laya.Ease.circInOut, Laya.Handler.create(this, () => {
                exit = true;
                if (callback) {
                    callback();
                }
                
                // Laya.timer.clear(this, loopFunction);
                Laya.timer.clearAll(this);
            }));
        }
    }
}