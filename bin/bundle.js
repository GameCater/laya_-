
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

  // E:/projects/laya3/demo_0_2d/src/GameConfig.ts
  var GameConfig = class {
  };
  __name(GameConfig, "GameConfig");
  // 游戏关卡信息
  GameConfig.Level = [
    { rank: 1, col: 6, row: 8, gridWidth: 80, gridSpace: 2, limitTime: 5 },
    // 6 8  
    { rank: 2, col: 9, row: 12, gridWidth: 60, gridSpace: 2, limitTime: 10 },
    // 9 12
    { rank: 3, col: 12, row: 16, gridWidth: 46, gridSpace: 2, limitTime: 15 }
    // 12 16
  ];
  // 游戏消息通信
  GameConfig.Message = {
    TIME: "leftTime",
    GAMEOVER: "gameOver",
    PAUSED: "gamePaused",
    WIN: "gameWin"
  };
  GameConfig.ClEAR_SCORE = 10;

  // E:/projects/laya3/demo_0_2d/src/RT/AnimationManager.ts
  var _AnimationManager = class {
    constructor() {
      if (_AnimationManager.instance) {
        _AnimationManager.instance = new _AnimationManager();
      }
    }
    // 延迟显示
    registerAniDelayShow(target, delay) {
      Laya.Tween.from(target, { alpha: 0 }, delay, Laya.Ease.circIn);
    }
    // 闯入
    registerAniRushIn(target, positon, duration) {
      Laya.Tween.to(target, { x: positon.x }, duration, Laya.Ease.bounceOut);
    }
    // 一次缩放
    registerAniScale(target, duration, callback) {
      Laya.Tween.to(target, { scaleX: 0.8, scaleY: 0.8 }, duration / 2, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
        Laya.Tween.to(target, { scaleX: 1, scaleY: 1 }, duration, Laya.Ease.linearOut, Laya.Handler.create(this, () => {
          if (callback) {
            callback();
          }
        }));
      }));
    }
    registerAniFadeAway(target, duration, callback) {
      let exit = false;
      if (!exit) {
        let overturn = false;
        Laya.timer.loop(duration, this, () => {
          if (overturn) {
            Laya.Tween.to(target, { rotation: 30 }, duration / 12, Laya.Ease.circIn);
          } else {
            Laya.Tween.to(target, { rotation: -30 }, duration / 12, Laya.Ease.circIn);
          }
          overturn = !overturn;
        });
        Laya.Tween.to(target, { scaleX: 0, scaleY: 0 }, duration, Laya.Ease.circInOut, Laya.Handler.create(this, () => {
          exit = true;
          if (callback) {
            callback();
          }
          Laya.timer.clearAll(this);
        }));
      }
    }
  };
  var AnimationManager = _AnimationManager;
  __name(AnimationManager, "AnimationManager");
  AnimationManager.instance = new _AnimationManager();

  // E:/projects/laya3/demo_0_2d/src/tool/generateJson.js
  function generateListData(row, col, gridWidth, gridSpace) {
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
              skin: "",
              width: gridWidth,
              space: gridSpace
            }
          };
          item2.listItemImg.skin = "";
          listData[idx] = item2;
          continue;
        }
        const item = {
          listItemImg: {
            skin: "",
            width: gridWidth,
            space: gridSpace
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
      this.isGameover = false;
      this.paused = false;
      this.win = false;
      this.score = 0;
      this.totalScore = 0;
      this.fadeAwayDuration = 200;
      this.linePath = new Path();
      this.lineWidth = 6;
      this.lineColor = "#ff0000";
    }
    onAwake() {
      this.board = this.owner;
      this.board.itemRender = RenderItem;
      Laya.stage.on(GameConfig.Message.PAUSED, (isPaused) => {
        this.paused = isPaused;
      });
    }
    onEnable() {
      console.log("board enabled");
      this.isGameover = false;
      this.paused = false;
      this.win = false;
      this.totalScore = 0;
    }
    onUpdate() {
      if (this.isGameover || this.paused || this.win)
        return;
      this.currentTime += Laya.timer.delta;
      let leftTime = 1 - this.currentTime / this.limitTime;
      Laya.stage.event(GameConfig.Message.TIME, leftTime);
      if (leftTime <= 0) {
        this.isGameover = true;
        this.currentTime = this.limitTime;
        Laya.stage.event(GameConfig.Message.GAMEOVER, Math.floor(this.totalScore));
        return;
      }
      if (this.total === 0) {
        this.score *= leftTime;
        this.totalScore += this.score;
        this.win = true;
        let scoreList = [Math.floor(this.score), Math.floor(this.totalScore)];
        Laya.stage.event(GameConfig.Message.WIN, scoreList);
        this.score = 0;
      }
    }
    generateBoard(col, row, gridWidth, gridSpace, limitTime) {
      console.log("generate");
      this.col = col + 2;
      this.row = row + 2;
      this.imgHeight = this.imgWidth = gridWidth;
      this.gridSpace = gridSpace;
      this.limitTime = limitTime * 60 * 1e3;
      this.currentTime = 0;
      const data = generateJson_default(this.row, this.col, gridWidth, gridSpace);
      this.board.array = data;
      this.total = (this.col - 2) * (this.row - 2);
      if (this.checkIsValid(data)) {
        this.board.visible = true;
      } else {
        this.total = (this.col - 2) * (this.row - 2);
        this.generateBoard(col, row, gridWidth, gridSpace, limitTime);
        return;
      }
      this.board.renderHandler = Laya.Handler.create(this, (cell, index) => {
        cell.scale(1, 1);
        cell.rotation = 0;
        cell.anchorX = 0.5;
        cell.anchorY = 0.5;
        let p = Point.transformIdx2Point(index, this.col);
        cell.y = (gridWidth + gridSpace) * p.x + gridWidth / 2;
        cell.x = (gridWidth + gridSpace) * p.y + gridWidth / 2;
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
      this.enabled = true;
    }
    // 点选后
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
    canRemove(src, dest) {
      const srcP = Point.transformIdx2Point(src, this.col);
      const destP = Point.transformIdx2Point(dest, this.col);
      const isSame = this.getImg(src) === this.getImg(dest);
      if (!isSame)
        return false;
      const res = this.matchBlockTwo(srcP, destP);
      if (res !== null) {
        this.linePath = new Path();
        this.linePath.start = srcP;
        this.linePath.end = destP;
        this.linePath.middleA = res.length >= 1 ? res[0] : null;
        this.linePath.middleB = res.length >= 1 ? res.length === 2 ? res[1] : null : null;
      }
      return res !== null;
    }
    /**
     * 是否0折连接
     * @param src 源点
     * @param desc 目标点
     * @returns 是否连通
     */
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
    /**
     * 是否1折连接
     * @param src 源点
     * @param dest 目标点
     * @returns 对角点
     */
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
    /**
     * 是否2折连接
     * @param src 源点
     * @param dest 目标点
     * @returns 两个连接点
     */
    matchBlockTwo(src, dest) {
      if (this.total === 0)
        return null;
      if (src.x < 0 || src.x > this.row)
        return null;
      if (src.y < 0 || src.y > this.col)
        return null;
      if (dest.x < 0 || dest.x > this.row)
        return null;
      if (dest.y < 0 || dest.y > this.col)
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
    // 移除格子
    removeImg(idx) {
      this.board.array[idx].listItemImg.skin = "";
    }
    // 格子是否为空
    getImg(idx) {
      return this.board.array[idx].listItemImg.skin;
    }
    setImg(idx, url) {
      this.board.array[idx].listItemImg.skin = url;
    }
    // 消除匹配项
    removeItems() {
      for (let i = 0; i < this.selected.length; i++) {
        this.removeImg(this.selected[i]);
      }
      this.selected = [];
    }
    // 检查生成的地图是否有解
    checkIsValid(data) {
      let items = new Array(this.row);
      for (let i = 0; i <= items.length - 1; i++) {
        items[i] = new Array(this.col);
        for (let j = 0; j <= items[i].length - 1; j++) {
          items[i][j] = 0;
        }
      }
      let path = new Path();
      let sequence = new Sequence((this.col - 2) * (this.row - 2));
      while (this.getHint(path)) {
        let start = path.start, end = path.end;
        let startIdx = Point.transformPoint2Idx(start, this.col), endIdx = Point.transformPoint2Idx(end, this.col);
        items[start.x][start.y] = this.getImg(startIdx);
        items[end.x][end.y] = this.getImg(endIdx);
        sequence.steps[sequence.index].x = startIdx;
        sequence.steps[sequence.index++].y = endIdx;
        this.selected.push(startIdx);
        this.selected.push(endIdx);
        this.removeItems();
        this.total -= 2;
      }
      if (this.total !== 0) {
        return false;
      } else {
        sequence.index = 0;
        for (let i = 0; i < items.length; i++) {
          for (let j = 0; j < items[0].length; j++) {
            if (items[i][j] !== 0) {
              this.setImg(Point.transformPoint2Idx(new Point(i, j), this.col), items[i][j]);
            }
          }
        }
        return true;
      }
    }
    // 提示
    getHint(path) {
      for (let i = 0; i < this.col * this.row - 1; i++) {
        let src = Point.transformIdx2Point(i, this.col);
        for (let j = i + 1; j < this.col * this.row; j++) {
          let dest = Point.transformIdx2Point(j, this.col);
          if (this.getImg(i) !== "" && this.canRemove(i, j)) {
            path.start = src;
            path.end = dest;
            return true;
          }
        }
      }
      return false;
    }
    // 绘制消除路径
    drawLinePath(path) {
      let boardGraphic = this.board.graphics;
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
      if (!path.middleA && !path.middleB) {
        boardGraphic.drawLine(startX, startY, endX, endY, this.lineColor, this.lineWidth);
      } else if (!path.middleB) {
        boardGraphic.drawLines(startX, startY, [0, 0, middleX - startX, middleY - startY, endX - startX, endY - startY], this.lineColor, this.lineWidth);
      } else {
        boardGraphic.drawLines(startX, startY, [0, 0, middleX - startX, middleY - startY, middleBX - startX, middleBY - startY, endX - startX, endY - startY], this.lineColor, this.lineWidth);
      }
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
  var Path = class {
    constructor() {
      this.start = new Point(0, 0);
      this.end = new Point(0, 0);
      this.middleA = new Point(0, 0);
      this.middleB = new Point(0, 0);
    }
  };
  __name(Path, "Path");
  var Sequence = class {
    constructor(size) {
      this.index = 0;
      this.steps = new Array(size);
      for (let i = 0; i < this.steps.length; i++) {
        this.steps[i] = new Point();
      }
    }
  };
  __name(Sequence, "Sequence");
  var RenderItem = class extends Laya.Image {
    get dataSource() {
      return this._data;
    }
    set dataSource(data) {
      this._data = data.listItemImg;
      this.init(this._data);
    }
    init(data) {
      this.skin = data.skin;
      this.width = this.height = data.width;
    }
  };
  __name(RenderItem, "RenderItem");

  // E:/projects/laya3/demo_0_2d/src/RT/MenuStateRT.generated.ts
  var MenuStateRTBase = class extends Laya.Scene {
  };
  __name(MenuStateRTBase, "MenuStateRTBase");

  // E:/projects/laya3/demo_0_2d/src/RT/MenuStateRT.ts
  var __decorate2 = __$decorate("7bab09c8-e030-48f6-9b0e-c7b8586ed970", "../src/RT/MenuStateRT.ts");
  var { regClass: regClass2, property: property2 } = Laya;
  var MenuStateRT = /* @__PURE__ */ __name(class MenuStateRT2 extends MenuStateRTBase {
    constructor() {
      super(...arguments);
      this.resourcesLoaded = false;
    }
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
          "resources/icon/TIME_EMPTY.png",
          "resources/icon/BTN.png",
          "resources/icon/BTN_TOUCH.png",
          "resources/bg/majong_BG.png"
        ];
        let maxNum = 32;
        for (let i = 1; i <= maxNum; i++) {
          resources.push(`resources/farm/${i}.png`);
          resources.push(`resources/farm/${i}_touch.png`);
        }
        this.ProgressBar_load.visible = true;
        Laya.loader.load(resources, null, Laya.Handler.create(this, this.recordProgress, null, false)).then(() => {
          this.ProgressBar_load.visible = false;
          this.resourcesLoaded = true;
          this.Btn_start.skins = [
            "resources/icon/BTN_START.png",
            "resources/icon/BTN_START_TOUCH.png"
          ];
          this.Btn_start.visible = true;
          AnimationManager.instance.registerAniDelayShow(this.Btn_start, 300);
          AnimationManager.instance.registerAniRushIn(this.Btn_start, new Laya.Point(291, 0), 400);
          this.Btn_start.on(Laya.Event.CLICK, this, this.startGame);
        });
      });
    }
    startGame() {
      Laya.timer.once(200, this, () => {
        Laya.Scene.open("ScenePlay.ls", true, GameConfig.Level[0]);
      });
    }
    // 加载条进度信息
    recordProgress(value) {
      this.ProgressBar_load.value = value;
      if (value >= 0.98) {
        this.ProgressBar_load.visible = false;
      }
    }
    onClosed(type) {
      Laya.stage.offAll();
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
    constructor() {
      super(...arguments);
      this.currentLevel = 0;
    }
    onOpened(param) {
      AnimationManager.instance.registerAniDelayShow(this.Image_main, 460);
      this.currentLevel = param.rank;
      this.Button_menu.skins = [
        "resources/icon/BTN_MAIN_MENU_ICON.png",
        "resources/icon/BTN_MAIN_MENU_ICON_TOUCH.png"
      ];
      this.Button_pause.skins = [
        "resources/icon/BTN_PAUSE.png",
        "resources/icon/BTN_PAUSE_TOUCH.png"
      ];
      this.Button_menu.on(Laya.Event.CLICK, this, this.backMenu);
      this.Button_pause.on(Laya.Event.CLICK, this, this.pauseGame);
      this.bm = new BoardManager();
      this.Board.addComponentInstance(this.bm);
      this.bm.generateBoard(param.col, param.row, param.gridWidth, param.gridSpace, param.limitTime);
      this.originLength = this.Sprite_mask.width;
      Laya.stage.on(GameConfig.Message.TIME, this, (leftTime) => {
        this.Sprite_mask.width = leftTime * this.originLength;
      });
      Laya.stage.on(GameConfig.Message.GAMEOVER, this, this.gameover);
      Laya.stage.on(GameConfig.Message.WIN, this, this.winLevel);
    }
    backMenu() {
      Laya.Scene.open("SceneMenu.ls", true);
    }
    winLevel(levelScore, totalScore) {
      let nextLevelIndex = this.currentLevel;
      this.currentLevel += 1;
      if (nextLevelIndex >= GameConfig.Level.length) {
        this.gameover(totalScore);
        return;
      }
      this.Button_menu.offAll(Laya.Event.CLICK);
      this.Button_pause.offAll(Laya.Event.CLICK);
      this.Board.visible = false;
      AnimationManager.instance.registerAniScale(this.Dialog_nextLevel, 200);
      this.Dialog_nextLevel.visible = true;
      this.Button_nextLevel.skins = [
        "resources/icon/BTN_NEXT_LEVEL.png",
        "resources/icon/BTN_NEXT_LEVEL_TOUCH.png"
      ];
      this.FontClip_levelScore.value = "" + levelScore;
      this.Button_nextLevel.on(Laya.Event.CLICK, this, () => {
        this.Dialog_nextLevel.visible = false;
        this.Board.visible = true;
        this.Button_menu.on(Laya.Event.CLICK, this, this.backMenu);
        this.Button_pause.on(Laya.Event.CLICK, this, this.pauseGame);
        this.bm.enabled = false;
        let nextLevelInfo = GameConfig.Level[nextLevelIndex];
        this.bm.generateBoard(nextLevelInfo.col, nextLevelInfo.row, nextLevelInfo.gridWidth, nextLevelInfo.gridSpace, nextLevelInfo.limitTime);
      });
    }
    gameover(gameScore = 0) {
      this.Button_menu.offAll(Laya.Event.CLICK);
      this.Button_pause.offAll(Laya.Event.CLICK);
      this.Board.visible = false;
      AnimationManager.instance.registerAniScale(this.Dialog_gameOver, 200);
      this.Dialog_gameOver.visible = true;
      this.Button_backHome.skins = [
        "resources/icon/BTN.png",
        "resources/icon/BTN_TOUCH.png"
      ];
      this.FontClip_gameScore.value = "" + gameScore;
      this.Button_backHome.on(Laya.Event.CLICK, () => {
        Laya.Scene.open("SceneMenu.ls", true);
      });
    }
    pauseGame() {
      console.log("paused");
      this.Board.visible = false;
      Laya.stage.event(GameConfig.Message.PAUSED, true);
      this.Box_pause.visible = true;
      this.Button_pause.skins = [
        "resources/icon/BTN_GAME_BACK.png",
        "resources/icon/BTN_GAME_BACK_TOUCH.png"
      ];
      this.Button_pause.off(Laya.Event.CLICK, this, this.pauseGame);
      this.Button_pause.on(Laya.Event.CLICK, this, this.resumeGame);
    }
    resumeGame() {
      console.log("resumed");
      Laya.stage.event(GameConfig.Message.PAUSED, false);
      this.Board.visible = true;
      this.Box_pause.visible = false;
      this.Button_pause.skins = [
        "resources/icon/BTN_PAUSE.png",
        "resources/icon/BTN_PAUSE_TOUCH.png"
      ];
      this.Button_pause.off(Laya.Event.CLICK, this, this.resumeGame);
      this.Button_pause.on(Laya.Event.CLICK, this, this.pauseGame);
    }
  }, "PlayStateRT");
  PlayStateRT = __decorate3([
    regClass3()
  ], PlayStateRT);
})();
//# sourceMappingURL=bundle.js.map
