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

    onEnable() {
        this.board = this.owner as Laya.List;
        this.board.repeatX = this.col;
        this.board.repeatY = this.row;

        this.board.width = this.col * this.imgWidth + (this.col - 1) * this.board.spaceY;
        this.board.height = this.row * this.imgHeight + (this.row - 1) * this.board.spaceY;

        // this.board.array = [
        //     {
        //         "listItemImg": {
        //             "skin": ''
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": 'resources/farm/5.png'
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": ''
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": 'resources/farm/7.png'
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": 'resources/farm/8.png'
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": ''
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": 'resources/farm/7.png'
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": 'resources/farm/8.png'
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": ''
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": 'resources/farm/7.png'
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": 'resources/farm/8.png'
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": 'resources/farm/9.png'
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": 'resources/farm/4.png'
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": 'resources/farm/4.png'
        //         }
        //     },
        //     {
        //         "listItemImg": {
        //             "skin": 'resources/farm/4.png'
        //         }
        //     },
        // ]

        // this.board.array = generateListData()

        this.board.selectHandler = Laya.Handler.create(this, this.onItemSelect, null, false);
    }

    private onItemSelect(idx: number): void {
        const item = this.board.array[idx];
        if (item.listItemImg.skin) {
            this.selected.push(idx);
            if (this.selected.length > 2) {
                const recoveIdx = this.selected.shift();
                const item = this.board.array[recoveIdx];
                item.listItemImg.skin = (item.listItemImg.skin as string).replace(/(\d)_touch/, '$1');
            }
            item.listItemImg.skin = (item.listItemImg.skin as string).replace(/(\d)/, '$1_touch');

            if (this.selected.length === 2 && this.canRemove(this.selected[0], this.selected[1])) {
                // 消除
                this.removeItems();
            }
        }
    }

    // 是否连通
    private canRemove(src: number, dest: number): boolean {
        if (this.getImg(src) === this.getImg(dest)) return true;
    }

    private getImg(idx: number): string {
        return this.board.array[idx].listItemImg.skin;
    }

    private removeItems() {
        for (let i = 0; i < this.selected.length; i ++) {
            this.board.array[this.selected[i]].listItemImg.skin = '';
        }
        this.selected = [];
    }
}