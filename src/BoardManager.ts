// declare function generateListData(row: number, col: number): [];
import { GameConfig } from './GameConfig';
import AnimationManager from './RT/AnimationManager';
import generateListData from './tool/generateJson';

const { regClass, property } = Laya;

@regClass()
export class BoardManager extends Laya.Script {
    public col: number;
    public row: number;
    private imgWidth: number;
    private imgHeight: number;
    private gridSpace: number;

    private board: Laya.List;
    private selected: number[] = [];
    // Board 剩余元素
    private total: number;

    private limitTime: number;
    private currentTime: number = 0;
    private isGameover: boolean = false;

    private paused: boolean = false;
    private win: boolean = false;

    // 得分： 图案消除10分 累计消除分 * ( 1 - 关卡耗时 / 关卡限时 )
    private score: number = 0;
    private totalScore: number = 0;

    private fadeAwayDuration: number = 200; // > 300ms 玩家消除速度过快时会有显示错乱问题，如果先执行消除逻辑，然后执行动画的话，就没这些问题

    private linePath: Path = new Path();
    private lineWidth: number = 6;
    private lineColor: string = '#ff0000';

    override onAwake(): void {
        this.board = this.owner as Laya.List;
        this.board.itemRender = RenderItem;
        Laya.stage.on(GameConfig.Message.PAUSED, (isPaused: boolean) => {
            this.paused = isPaused;
        });
    }

    onEnable() {
        console.log('board enabled');
        this.isGameover = false;
        this.paused = false;
        this.win = false;
        // this.board.visible = !this.board.visible;
        this.totalScore = 0;
    }

    onUpdate(): void {
        if (this.isGameover || this.paused || this.win) return;

        this.currentTime += Laya.timer.delta;
        let leftTime = (1 - this.currentTime / this.limitTime);
        Laya.stage.event(GameConfig.Message.TIME, leftTime);
        if (leftTime <= 0) {
            this.isGameover = true;
            this.currentTime = this.limitTime;

            Laya.stage.event(GameConfig.Message.GAMEOVER, Math.floor(this.totalScore));
            return;
        }

        // 判断通关
        if (this.total === 0) {

            // 当前关卡得分
            this.score *= leftTime;
            // 游戏总得分
            this.totalScore += this.score;

            this.win = true;
            let scoreList: number[] = [ Math.floor(this.score), Math.floor(this.totalScore) ];
            
            Laya.stage.event(GameConfig.Message.WIN, scoreList);

            // 重置关卡得分
            this.score = 0;
        }
    }
    
    public generateBoard(col: number, row: number, gridWidth: number, gridSpace: number, limitTime: number) {

        console.log('generate');
        
        this.col = col + 2;
        this.row = row + 2;
        this.imgHeight = this.imgWidth = gridWidth;
        this.gridSpace = gridSpace;

        this.limitTime = limitTime * 60 * 1000;
        this.currentTime = 0;

        const data = generateListData(this.row, this.col, gridWidth, gridSpace);
        this.board.array = data;
        this.total = (this.col - 2) * (this.row - 2);
        
        if (this.checkIsValid(data)) {
            this.board.visible = true;
        } else {
            // this.board.visible = false;
            this.total = (this.col - 2) * (this.row - 2);
            this.generateBoard(col, row, gridWidth, gridSpace, limitTime);
            return;
        }

        // 单元格渲染器
        this.board.renderHandler = Laya.Handler.create(this, (cell: Laya.Image, index: number) => {
            // list会复用cell，恢复cell的初始状态
            cell.scale(1, 1);
            cell.rotation = 0;

            // 使用中心作为锚点
            cell.anchorX = 0.5;
            cell.anchorY = 0.5;

            // 动态设置cell的位置
            let p = Point.transformIdx2Point(index, this.col);
            cell.y = (gridWidth + gridSpace) * p.x + gridWidth/2;
            cell.x = (gridWidth + gridSpace) * p.y + gridWidth/2;
            
        }, null, false);

        
        this.board.array = data;
        this.total = (this.col - 2) * (this.row - 2);

        let width = this.col * this.imgWidth + (this.col - 1) * this.board.spaceX;
        let height = this.row * this.imgHeight + (this.row - 1) * this.board.spaceY;
        this.board.width = width;
        this.board.height = height;

        this.board.repeatX = this.col; 
        this.board.repeatY = this.row;
        this.board.spaceX = this.board.spaceY = this.gridSpace;
        this.board.x = Math.floor(Math.abs(Laya.stage.width - width) / 2);
        
        
        this.board.selectHandler = Laya.Handler.create(this, this.onItemSelect, null, false);

        // 触发 onEnabled
        this.enabled = true;

    }

    // 点选后
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

                let selected1 = this.board.getCell(this.selected[0]);
                let selected2 = this.board.getCell(this.selected[1]);

                this.drawLinePath(this.linePath);

                AnimationManager.instance.registerAniFadeAway(selected1, this.fadeAwayDuration);
                AnimationManager.instance.registerAniFadeAway(selected2, this.fadeAwayDuration, () => {

                    this.board.graphics.clear();
                    this.removeItems();
                    this.total -= 2;
    
                    this.score += GameConfig.ClEAR_SCORE;
                });
            }
        }
    }

    // 是否连通
    private canRemove(src: number, dest: number): boolean {
        // if (this.getImg(src) === this.getImg(dest)) return true;
        const srcP = Point.transformIdx2Point(src, this.col);
        const destP = Point.transformIdx2Point(dest, this.col);

        // 判断内容是否一致
        const isSame = this.getImg(src) === this.getImg(dest);
        if (!isSame) return false;

        const res = this.matchBlockTwo(srcP, destP);
        // 记录消除路径
        if (res !== null) {
            this.linePath = new Path();
            this.linePath.start = srcP;
            this.linePath.end = destP;
            this.linePath.middleA = res.length >= 1 ? res[0] : null;
            this.linePath.middleB = res.length >= 1 ? ( res.length === 2 ? res[1] : null) : null;
        }
        
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
                if (this.getImg(Point.transformPoint2Idx(p, this.col))) {
                    return false;
                }
            }
        } else {
            min = src.x < dest.x ? src.x : dest.x;
            max = src.x < dest.x ? dest.x : src.x;

            for (let i = min + 1; i < max; i ++) {
                const p = new Point(i, src.y);
                if (this.getImg(Point.transformPoint2Idx(p, this.col))) {
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
        if (!this.getImg(Point.transformPoint2Idx(counterPoint, this.col))) {
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
        if (!this.getImg(Point.transformPoint2Idx(counterPoint, this.col))) {
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
        
        if (this.total === 0) return null;
        if (src.x < 0 || src.x > this.row) return null;
        if (src.y < 0 || src.y > this.col) return null;
        if (dest.x < 0 || dest.x > this.row) return null;
        if (dest.y < 0 || dest.y > this.col) return null;

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
            if (!this.getImg(Point.transformPoint2Idx(pSrc, this.col))) {
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
            if (!this.getImg(Point.transformPoint2Idx(pSrc, this.col))) {
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
            if (!this.getImg(Point.transformPoint2Idx(pSrc, this.col))) {
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
            if (!this.getImg(Point.transformPoint2Idx(pSrc, this.col))) {
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


    // 移除格子
    private removeImg(idx: number): void {
        this.board.array[idx].listItemImg.skin = '';
    }

    // 格子是否为空
    private getImg(idx: number): string {
        return this.board.array[idx].listItemImg.skin;
    }

    private setImg(idx: number, url: string): void {
        this.board.array[idx].listItemImg.skin = url;
    }

    // 消除匹配项
    private removeItems() {
        for (let i = 0; i < this.selected.length; i ++) {
            this.removeImg(this.selected[i]);
        }
        this.selected = [];
    }

    // 检查生成的地图是否有解
    private checkIsValid(data: any[]): boolean {

        let items = new Array(this.row);
        for (let i = 0; i <= items.length - 1; i ++) {
            items[i] = new Array(this.col);
            for (let j = 0; j <= items[i].length - 1; j ++) {
                items[i][j] = 0;
            }
        }

        let path = new Path();
        let sequence = new Sequence((this.col -2) * (this.row - 2));

        while (this.getHint(path)) {

            let start = path.start, end = path.end;
            let startIdx = Point.transformPoint2Idx(start, this.col),
                endIdx = Point.transformPoint2Idx(end, this.col);
            items[start.x][start.y] = this.getImg(startIdx);
            items[end.x][end.y] = this.getImg(endIdx);

            sequence.steps[sequence.index].x = startIdx;
            sequence.steps[sequence.index ++].y = endIdx;

            this.selected.push(startIdx);
            this.selected.push(endIdx);

            this.removeItems();
            this.total -= 2;
        }

        // 已经没提示了， 但还没消完
        if (this.total !== 0) {
            
            return false;
        } else {
            sequence.index = 0;

            // 恢复
            for (let i = 0; i < items.length; i ++) {
                for (let j = 0; j < items[0].length; j ++) {
                    if (items[i][j] !== 0) {
                        this.setImg(Point.transformPoint2Idx(new Point(i, j), this.col), items[i][j]);
                    }
                }
            }

            return true;
        }
    }

    // 提示
    private getHint(path: Path): boolean {

        for (let i = 0; i < this.col * this.row - 1; i ++) {
            let src = Point.transformIdx2Point(i, this.col);
            for (let j = i + 1; j < this.col * this.row; j ++) {
                let dest = Point.transformIdx2Point(j, this.col);
                if (this.getImg(i) !== '' && this.canRemove(i, j)) {

                    path.start = src;
                    path.end = dest;
                    return true;
                }
            }
        }
        return false;
    }

    // 绘制消除路径
    private drawLinePath(path: Path): void {
        let boardGraphic = this.board.graphics;
        // 起点与终点的绘制坐标
        let startX = path.start.y * this.imgWidth + (path.start.y - 1) * this.gridSpace + this.imgWidth / 2;
        let endX = path.end.y * this.imgWidth + (path.end.y - 1) * this.gridSpace + this.imgHeight / 2;
        let startY = path.start.x * this.imgHeight + (path.start.x - 1) * this.gridSpace + this.imgWidth / 2;
        let endY = path.end.x * this.imgHeight + (path.end.x - 1) * this.gridSpace + this.imgHeight / 2;

        let middleX, middleY;
        let middleBX, middleBY;
        if (path.middleA) {
            middleX = path.middleA.y * this.imgWidth + (path.middleA.y - 1) * this.gridSpace + this.imgWidth / 2;
            middleY = path.middleA.x * this.imgHeight + (path.middleA.x - 1) * this.gridSpace + this.imgHeight / 2;
        }
        if (path.middleB) {
            middleBX = path.middleB.y * this.imgWidth + (path.middleB.y - 1) * this.gridSpace + this.imgWidth / 2;
            middleBY = path.middleB.x * this.imgWidth + (path.middleB.x - 1) * this.gridSpace + this.imgWidth / 2;
        }

        if (!path.middleA && !path.middleB) { // 直连
            boardGraphic.drawLine(startX, startY, endX, endY, this.lineColor, this.lineWidth);
        } else if (!path.middleB) { // 一折
            // boardGraphic.drawLine(startX, startY, middleX, middleY, this.lineColor, this.lineWidth);
            // boardGraphic.drawLine(middleX, middleY, endX, endY, this.lineColor, this.lineWidth);

            boardGraphic.drawLines(startX, startY, [ 0, 0, middleX - startX, middleY - startY, endX - startX, endY - startY ], this.lineColor, this.lineWidth);
        } else { // 二折
            // boardGraphic.drawLine(startX, startY, middleX, middleY, this.lineColor, this.lineWidth);
            // boardGraphic.drawLine(middleX, middleY, middleBX, middleBY, this.lineColor, this.lineWidth);
            // boardGraphic.drawLine(middleBX, middleBY, endX, endY, this.lineColor, this.lineWidth);

            boardGraphic.drawLines(startX, startY, [ 0, 0, middleX - startX, middleY - startY, middleBX - startX, middleBY - startY, endX - startX, endY - startY ], this.lineColor, this.lineWidth);
        }
    }
}

class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number) {
        this.x = x;
        this.y = y;
    }

    static transformIdx2Point(idx: number, col: number): Point {
        const p = new Point();
        p.x = Math.floor(idx / col);
        p.y = idx % col;
        return p;
    }

    static transformPoint2Idx(p: Point, col: number): number {
        return p.x * col + p.y;
    }
}

class Path {
    start: Point = new Point(0, 0);
    end: Point = new Point(0, 0);

    // 一折拐点
    middleA: Point = new Point(0, 0);
    // 二折拐点
    middleB: Point = new Point(0, 0);
}

class Sequence {
    steps: Point[];
    index: number = 0;
    constructor(size: number) {
        this.steps = new Array(size);
        for (let i = 0; i < this.steps.length; i ++) {
            this.steps[i] = new Point();
        }
    }
}

class RenderItem extends Laya.Image{

    private _data: any;
    get dataSource() {
        return this._data;
    }

    set dataSource(data: any) {        
        this._data = data.listItemImg;
        this.init(this._data);
    }

    private init(data: { skin: string, width: number }) {

        this.skin = data.skin;
        this.width = this.height = data.width;
    }
}