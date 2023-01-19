// declare function generateListData(row: number, col: number): [];
import generateListData from './tool/generateJson';

const { regClass, property } = Laya;

@regClass()
export class BoardManager extends Laya.Script {
    @property()
    public col: number = 12;
    @property()
    public row: number = 8;

    private imgWidth: number = 36;
    private imgHeight: number = 36;

    private board: Laya.List;
    private selected: number[] = [];
    private total: number;

    onEnable() {
        this.board = this.owner as Laya.List;
        this.board.repeatX = this.col;
        this.board.repeatY = this.row;

        this.board.width = this.col * this.imgWidth + (this.col - 1) * this.board.spaceY;
        this.board.height = this.row * this.imgHeight + (this.row - 1) * this.board.spaceY;

        const data = generateListData(this.row, this.col);
        this.board.array = data;
        this.total = (this.col - 2) * (this.row - 2);

        this.board.selectHandler = Laya.Handler.create(this, this.onItemSelect, null, false);
    }

    private onItemSelect(idx: number): void {
        const item = this.board.array[idx];
        if (item.listItemImg.skin) {
            this.selected.push(idx);
            if (this.selected.length > 2) {
                const recoveIdx = this.selected.shift();
                const item = this.board.array[recoveIdx];
                item.listItemImg.skin = (item.listItemImg.skin as string).replace(/(\d+)_touch/, '$1');
            }
            item.listItemImg.skin = (item.listItemImg.skin as string).replace(/(\d+)/, '$1_touch');

            if (this.selected.length === 2 && this.canRemove(this.selected[0], this.selected[1])) {
                this.removeItems();
                this.total -= 2;
            }
        }
    }

    // 是否连通
    private canRemove(src: number, dest: number): boolean {
        // if (this.getImg(src) === this.getImg(dest)) return true;
        const srcP = this.transformIdx2Point(src);
        const destP = this.transformIdx2Point(dest);

        // 判断内容是否一致
        const isSame = this.getImg(src) === this.getImg(dest);
        if (!isSame) return false;

        const res = this.matchBlockTwo(srcP, destP);
        console.log(res);
        
        return res !== null;
    }

    /**
     * 是否0折连接
     * @param src 源点
     * @param desc 目标点
     * @returns 是否连通
     */
    private matchBlock(src: Point, dest: Point): boolean {
        if (src.x !== dest.x && src.y !== dest.y) return false;

        let min, max;
        if (src.x === dest.x) {
            min = src.y < dest.y ? src.y : dest.y;
            max = src.y < dest.y ? dest.y : src.y;

            for (let i = min + 1; i < max; i ++) {
                const p = new Point(src.x, i);
                if (this.getImg(this.transformPoint2Idx(p))) {
                    return false;
                }
            }
        } else {
            min = src.x < dest.x ? src.x : dest.x;
            max = src.x < dest.x ? dest.x : src.x;

            for (let i = min + 1; i < max; i ++) {
                const p = new Point(i, src.y);
                if (this.getImg(this.transformPoint2Idx(p))) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * 是否1折连接
     * @param src 源点
     * @param dest 目标点
     * @returns 对角点
     */
    private matchBlockOne(src: Point, dest: Point): Point {
        if (src.x === dest.x || src.y === dest.y) return null;

        // 对角点1
        let counterPoint = new Point(src.x, dest.y);
        // 对角点为空
        if (!this.getImg(this.transformPoint2Idx(counterPoint))) {
            // src 到 counterPoint 是否0折连接
            const scMatch = this.matchBlock(src, counterPoint);
            // counterPoint 到 dest 是否0折连接
            const cdMatch = scMatch ? this.matchBlock(counterPoint, dest) : scMatch;
            if (scMatch && cdMatch) {
                return counterPoint;
            }
        }

        // 对角点2
        counterPoint = new Point(dest.x, src.y);
        if (!this.getImg(this.transformPoint2Idx(counterPoint))) {
            // src 到 counterPoint 是否0折连接
            const scMatch = this.matchBlock(src, counterPoint);
            // counterPoint 到 dest 是否0折连接
            const cdMatch = scMatch ? this.matchBlock(counterPoint, dest) : scMatch;
            if (scMatch && cdMatch) {
                return counterPoint;
            }
        }

        return null;
    }

    /**
     * 是否2折连接 
     * @param src 源点
     * @param dest 目标点
     * @returns 两个连接点
     */
    private matchBlockTwo(src: Point, dest: Point): Point[] {
        console.log(src, dest);
        
        if (this.total === 0) return null;
        if (src.x < 0 || src.x > this.col) return null;
        if (src.y < 0 || src.y > this.row) return null;
        if (dest.x < 0 || dest.x > this.col) return null;
        if (dest.y < 0 || dest.y > this.row) return null;

        if (this.matchBlock(src, dest)) {
            return [];
        }

        const pList: Point[] = [];
        let point = new Point();
        if ((point = this.matchBlockOne(src, dest)) !== null) {
            pList.push(point);
            return pList;
        }

        let i = 0;
        // 从src竖直向下扫描
        for (i = src.x + 1; i < this.row; i ++) {
            const pSrc = new Point(i, src.y);
            if (!this.getImg(this.transformPoint2Idx(pSrc))) {
                const counterP = this.matchBlockOne(pSrc, dest);
                if (counterP !== null) {
                    pList.push(pSrc);
                    pList.push(counterP);
                    return pList;
                };
            } else break;
        }

        // 从src竖直向上扫描
        i = 0;
        for (i = src.x - 1; i >= 0; i --) {
            const pSrc = new Point(i, src.y);
            if (!this.getImg(this.transformPoint2Idx(pSrc))) {
                const counterP = this.matchBlockOne(pSrc, dest);
                if (counterP !== null) {
                    pList.push(pSrc);
                    pList.push(counterP);
                    return pList;
                };
            } else break;
        }

        // 从src水平向左扫描
        i = 0;
        for (i = src.y - 1; i >= 0; i --) {
            const pSrc = new Point(src.x, i);
            if (!this.getImg(this.transformPoint2Idx(pSrc))) {
                const counterP = this.matchBlockOne(pSrc, dest);
                if (counterP !== null) {
                    pList.push(pSrc);
                    pList.push(counterP);
                    return pList;
                };
            } else break;
        }

        // 从src水平向右扫描
        i = 0;
        for (i = src.y + 1; i < this.col; i ++) {
            const pSrc = new Point(src.x, i);
            if (!this.getImg(this.transformPoint2Idx(pSrc))) {
                const counterP = this.matchBlockOne(pSrc, dest);
                if (counterP !== null) {
                    pList.push(pSrc);
                    pList.push(counterP);
                    return pList;
                };
            } else break;
        }

        return null;
    }

    // 一维数组索引转为二维数组坐标
    private transformIdx2Point(idx: number): Point {
        const p = new Point();
        p.x = Math.floor(idx / this.col);
        p.y = idx % this.col;
        return p;
    }

    private transformPoint2Idx(p: Point): number {
        return p.x * this.col + p.y;
    }

    // 移除格子
    private removeImg(idx: number): void {
        this.board.array[idx].listItemImg.skin = '';
    }

    // 格子是否为空
    private getImg(idx: number): string {
        return this.board.array[idx].listItemImg.skin;
    }

    // 消除匹配项
    private removeItems() {
        for (let i = 0; i < this.selected.length; i ++) {
            this.removeImg(this.selected[i]);
        }
        this.selected = [];
    }
}

class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number) {
        this.x = x;
        this.y = y;
    }
}