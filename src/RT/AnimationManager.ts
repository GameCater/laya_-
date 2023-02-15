export default class AnimationManager {
    public static instance = new AnimationManager();

    private constructor() {
        if (AnimationManager.instance) {
            AnimationManager.instance = new AnimationManager();
        }
    }

    public registerAniDelayShow(target: Laya.Sprite, delay: number): void {
        Laya.Tween.from(target, { alpha: 0 }, delay, Laya.Ease.circIn);
    }

    public registerAniRushIn(target: Laya.Sprite, positon: Laya.Point, duration: number): void {
        Laya.Tween.to(target, { x: positon.x }, duration, Laya.Ease.bounceOut);
    }

    public registerAniScale(target: Laya.Sprite, duration: number): void {
        Laya.Tween.to(target, { scaleX: 0.8, scaleY: 0.8 }, duration, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
            Laya.Tween.to(target._extra, { scaleX: 1, scaleY: 1 }, duration, Laya.Ease.linearOut);
        }))
    }
}