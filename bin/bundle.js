
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (let i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(k, v);
    }
}

var _regClass = window._regClass;
var _dummyRegClass = Laya.regClass();
function __$decorate(assetId, codePath) {
    return function(...args) {
        let i = args[0].indexOf(_dummyRegClass);
        if (i != -1) {
            if (_regClass)
                args[0][i] = _regClass(assetId, codePath);
            else
                args[0][i] = function(constructor) { Laya.ClassUtils.regClass(assetId, constructor); };
        }
        return __decorate(...args);
    }
}

(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // E:/projects/laya3/demo_0_2d/src/tool/generateJson.js
  function generateListData(row, col) {
    const listData = new Array(row * col);
    const realRow = row - 2, realCol = col - 2;
    if (realRow * realCol % 2)
      throw new Error("\u5217\u8868\u9879\u4E2A\u6570\u4E3A\u5947\u6570");
    let temp = [], total = realRow * realCol, flags = [];
    for (let i = 0; i < total / 2; i++) {
      temp.push(randNumber(1, 32));
      flags.push(i);
    }
    for (let i = Math.ceil(total / 2); i < total; i++) {
      const rand = randNumber(0, flags.length - 1);
      const idx = flags[rand];
      flags.splice(rand, 1);
      temp[i] = temp[idx];
    }
    let num = 0;
    for (let n = 0; n < row; n++) {
      for (let m = 0; m < col; m++) {
        const idx = n * col + m;
        if (n === 0 || n === row - 1 || m === 0 || m === col - 1) {
          const item2 = {
            listItemImg: {
              skin: ""
            }
          };
          item2.listItemImg.skin = "";
          listData[idx] = item2;
          continue;
        }
        const item = {
          listItemImg: {
            skin: ""
          }
        };
        item.listItemImg.skin = `resources/farm/${temp[num++]}.png`;
        listData[idx] = item;
      }
    }
    return listData;
  }
  __name(generateListData, "generateListData");
  function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  __name(randNumber, "randNumber");
  var generateJson_default = generateListData;

  // E:/projects/laya3/demo_0_2d/src/BoardManager.ts
  var __decorate = __$decorate("9df8c109-eeb5-455d-be8f-39ca89ac47fb", "../src/BoardManager.ts");
  var { regClass, property } = Laya;
  var BoardManager = /* @__PURE__ */ __name(class BoardManager2 extends Laya.Script {
    constructor() {
      super(...arguments);
      this.selected = [];
      this.currentTime = 0;
    }
    onEnable() {
      this.board = this.owner;
    }
    onUpdate() {
      this.currentTime += Laya.timer.delta;
      let leftTime = 1 - this.currentTime / this.limitTime;
      Laya.stage.event("time", leftTime);
    }
    generateBoard(col, row, gridWidth, gridSpace, limitTime) {
      this.col = col + 2;
      this.row = row + 2;
      this.imgHeight = this.imgWidth = gridWidth;
      this.gridSpace = gridSpace;
      this.limitTime = limitTime * 60 * 1e3;
      this.currentTime = 0;
      this.board.renderHandler = Laya.Handler.create(this, (cell) => {
        cell.width = this.imgWidth;
        cell.height = this.imgHeight;
      }, null, false);
      let width = this.col * this.imgWidth + (this.col - 1) * this.board.spaceX;
      let height = this.row * this.imgHeight + (this.row - 1) * this.board.spaceY;
      let box = this.board.getChildAt(0);
      this.board.width = width;
      this.board.height = height;
      this.board.repeatX = this.col;
      this.board.repeatY = this.row;
      this.board.spaceX = this.board.spaceY = this.gridSpace;
      this.board.x = Math.floor(Math.abs(Laya.stage.width - width) / 2);
      const data = generateJson_default(this.row, this.col);
      this.board.array = data;
      this.total = (this.col - 2) * (this.row - 2);
      this.board.selectHandler = Laya.Handler.create(this, this.onItemSelect, null, false);
    }
    onItemSelect(idx) {
      const item = this.board.array[idx];
      if (item.listItemImg.skin) {
        this.selected.push(idx);
        if (this.selected.length > 2) {
          const recoveIdx = this.selected.shift();
          const item2 = this.board.array[recoveIdx];
          item2.listItemImg.skin = item2.listItemImg.skin.replace(/(\d+)_touch/, "$1");
        }
        item.listItemImg.skin = item.listItemImg.skin.replace(/(\d+)/, "$1_touch");
        if (this.selected.length === 2 && this.canRemove(this.selected[0], this.selected[1])) {
          this.removeItems();
          this.total -= 2;
        }
      }
    }
    canRemove(src, dest) {
      const srcP = Point.transformIdx2Point(src, this.col);
      const destP = Point.transformIdx2Point(dest, this.col);
      const isSame = this.getImg(src) === this.getImg(dest);
      if (!isSame)
        return false;
      const res = this.matchBlockTwo(srcP, destP);
      return res !== null;
    }
    matchBlock(src, dest) {
      if (src.x !== dest.x && src.y !== dest.y)
        return false;
      let min, max;
      if (src.x === dest.x) {
        min = src.y < dest.y ? src.y : dest.y;
        max = src.y < dest.y ? dest.y : src.y;
        for (let i = min + 1; i < max; i++) {
          const p = new Point(src.x, i);
          if (this.getImg(Point.transformPoint2Idx(p, this.col))) {
            return false;
          }
        }
      } else {
        min = src.x < dest.x ? src.x : dest.x;
        max = src.x < dest.x ? dest.x : src.x;
        for (let i = min + 1; i < max; i++) {
          const p = new Point(i, src.y);
          if (this.getImg(Point.transformPoint2Idx(p, this.col))) {
            return false;
          }
        }
      }
      return true;
    }
    matchBlockOne(src, dest) {
      if (src.x === dest.x || src.y === dest.y)
        return null;
      let counterPoint = new Point(src.x, dest.y);
      if (!this.getImg(Point.transformPoint2Idx(counterPoint, this.col))) {
        const scMatch = this.matchBlock(src, counterPoint);
        const cdMatch = scMatch ? this.matchBlock(counterPoint, dest) : scMatch;
        if (scMatch && cdMatch) {
          return counterPoint;
        }
      }
      counterPoint = new Point(dest.x, src.y);
      if (!this.getImg(Point.transformPoint2Idx(counterPoint, this.col))) {
        const scMatch = this.matchBlock(src, counterPoint);
        const cdMatch = scMatch ? this.matchBlock(counterPoint, dest) : scMatch;
        if (scMatch && cdMatch) {
          return counterPoint;
        }
      }
      return null;
    }
    matchBlockTwo(src, dest) {
      console.log(src, dest);
      if (this.total === 0)
        return null;
      if (src.x < 0 || src.x > this.col)
        return null;
      if (src.y < 0 || src.y > this.row)
        return null;
      if (dest.x < 0 || dest.x > this.col)
        return null;
      if (dest.y < 0 || dest.y > this.row)
        return null;
      if (this.matchBlock(src, dest)) {
        return [];
      }
      const pList = [];
      let point = new Point();
      if ((point = this.matchBlockOne(src, dest)) !== null) {
        pList.push(point);
        return pList;
      }
      let i = 0;
      for (i = src.x + 1; i < this.row; i++) {
        const pSrc = new Point(i, src.y);
        if (!this.getImg(Point.transformPoint2Idx(pSrc, this.col))) {
          const counterP = this.matchBlockOne(pSrc, dest);
          if (counterP !== null) {
            pList.push(pSrc);
            pList.push(counterP);
            return pList;
          }
          ;
        } else
          break;
      }
      i = 0;
      for (i = src.x - 1; i >= 0; i--) {
        const pSrc = new Point(i, src.y);
        if (!this.getImg(Point.transformPoint2Idx(pSrc, this.col))) {
          const counterP = this.matchBlockOne(pSrc, dest);
          if (counterP !== null) {
            pList.push(pSrc);
            pList.push(counterP);
            return pList;
          }
          ;
        } else
          break;
      }
      i = 0;
      for (i = src.y - 1; i >= 0; i--) {
        const pSrc = new Point(src.x, i);
        if (!this.getImg(Point.transformPoint2Idx(pSrc, this.col))) {
          const counterP = this.matchBlockOne(pSrc, dest);
          if (counterP !== null) {
            pList.push(pSrc);
            pList.push(counterP);
            return pList;
          }
          ;
        } else
          break;
      }
      i = 0;
      for (i = src.y + 1; i < this.col; i++) {
        const pSrc = new Point(src.x, i);
        if (!this.getImg(Point.transformPoint2Idx(pSrc, this.col))) {
          const counterP = this.matchBlockOne(pSrc, dest);
          if (counterP !== null) {
            pList.push(pSrc);
            pList.push(counterP);
            return pList;
          }
          ;
        } else
          break;
      }
      return null;
    }
    removeImg(idx) {
      this.board.array[idx].listItemImg.skin = "";
    }
    getImg(idx) {
      return this.board.array[idx].listItemImg.skin;
    }
    removeItems() {
      for (let i = 0; i < this.selected.length; i++) {
        this.removeImg(this.selected[i]);
      }
      this.selected = [];
    }
  }, "BoardManager");
  BoardManager = __decorate([
    regClass()
  ], BoardManager);
  var Point = class {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    static transformIdx2Point(idx, col) {
      const p = new Point();
      p.x = Math.floor(idx / col);
      p.y = idx % col;
      return p;
    }
    static transformPoint2Idx(p, col) {
      return p.x * col + p.y;
    }
  };
  __name(Point, "Point");

  // E:/projects/laya3/demo_0_2d/src/GameConfig.ts
  var GameConfig = class {
  };
  __name(GameConfig, "GameConfig");
  GameConfig.Level = [
    { rank: 1, col: 6, row: 8, gridWidth: 80, gridSpace: 2, limitTime: 5 },
    { rank: 2, col: 9, row: 12, gridWidth: 60, gridSpace: 2, limitTime: 10 },
    { rank: 3, col: 12, row: 16, gridWidth: 46, gridSpace: 2, limitTime: 15 }
  ];

  // E:/projects/laya3/demo_0_2d/src/RT/MenuStateRT.generated.ts
  var MenuStateRTBase = class extends Laya.Scene {
  };
  __name(MenuStateRTBase, "MenuStateRTBase");

  // E:/projects/laya3/demo_0_2d/src/RT/MenuStateRT.ts
  var __decorate2 = __$decorate("7bab09c8-e030-48f6-9b0e-c7b8586ed970", "../src/RT/MenuStateRT.ts");
  var { regClass: regClass2, property: property2 } = Laya;
  var MenuStateRT = /* @__PURE__ */ __name(class MenuStateRT2 extends MenuStateRTBase {
    onAwake() {
      let preLoad = [
        "resources/icon/progress.png",
        "resources/icon/progress$bar.png",
        "resources/bg/MAIN_MENU_BG.png",
        "resources/icon/BTN_START.png",
        "resources/icon/BTN_START_TOUCH.png"
      ];
      Laya.loader.load(preLoad).then(() => {
        let resources = [
          { url: "ScenePlay.ls", type: Laya.Loader.HIERARCHY },
          "resources/icon/BTN_NEXT_LEVEL_TOUCH.png",
          "resources/icon/BTN_NEXT_LEVEL.png",
          "resources/icon/BTN_GAME_BACK_TOUCH.png",
          "resources/icon/BTN_GAME_BACK.png",
          "resources/icon/BTN_MAIN_MENU_ICON_TOUCH.png",
          "resources/icon/BTN_MAIN_MENU_ICON.png",
          "resources/icon/BTN_PAUSE_TOUCH.png",
          "resources/icon/BTN_PAUSE.png",
          "resources/icon/TIME__FULL.png",
          "resources/icon/TIME_EMPTY.png"
        ];
        let maxNum = 32;
        for (let i = 1; i <= maxNum; i++) {
          resources.push(`resources/farm/${i}.png`);
          resources.push(`resources/farm/${i}_touch.png`);
        }
        Laya.loader.load(resources, null, Laya.Handler.create(this, this.recordProgress, null, false)).then(() => {
          this.Btn_start.visible = true;
          this.Btn_start.on(Laya.Event.CLICK, this, this.startGame);
        });
      });
    }
    startGame() {
      this.Btn_start.skin = "resources/icon/BTN_START_TOUCH.png";
      Laya.timer.once(200, this, () => {
        Laya.Scene.open("ScenePlay.ls", true, GameConfig.Level[0]);
      });
    }
    recordProgress(value) {
      this.ProgressBar_load.value = value;
      if (value >= 0.98) {
        this.ProgressBar_load.visible = false;
      }
    }
  }, "MenuStateRT");
  MenuStateRT = __decorate2([
    regClass2()
  ], MenuStateRT);

  // E:/projects/laya3/demo_0_2d/src/RT/PlayStateRT.generated.ts
  var PlayStateRTBase = class extends Laya.Scene {
  };
  __name(PlayStateRTBase, "PlayStateRTBase");

  // E:/projects/laya3/demo_0_2d/src/RT/PlayStateRT.ts
  var __decorate3 = __$decorate("d1abb8db-12fd-4313-b798-1c4e6df7e9d2", "../src/RT/PlayStateRT.ts");
  var { regClass: regClass3 } = Laya;
  var PlayStateRT = /* @__PURE__ */ __name(class PlayStateRT2 extends PlayStateRTBase {
    onOpened(param) {
      this.bm = new BoardManager();
      this.Board.addComponentInstance(this.bm);
      this.bm.generateBoard(param.col, param.row, param.gridWidth, param.gridSpace, param.limitTime);
      this.Button_menu.on(Laya.Event.CLICK, this, () => {
        this.bm.generateBoard(param.col, param.row, param.gridWidth, param.gridSpace, param.limitTime);
      });
      this.originLength = this.Sprite_mask.width;
      Laya.stage.on("time", this, (leftTime) => {
        this.Sprite_mask.width = leftTime * this.originLength;
        if (this.Sprite_mask.width <= 0) {
          console.log("GameOver");
        }
      });
    }
  }, "PlayStateRT");
  PlayStateRT = __decorate3([
    regClass3()
  ], PlayStateRT);
})();
//# sourceMappingURL=bundle.js.map
