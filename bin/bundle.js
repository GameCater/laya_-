
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
        if(args[0][0] == _dummyRegClass) {
            if(_regClass)
                args[0][0] = _regClass(assetId, codePath);
            else
                args[0][0] = function(constructor) { Laya.ClassUtils.regClass(assetId, constructor); };
        }
        return __decorate(...args);
    }
}

(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // ../../../../../Document/Project/LayaAir/LayaAir3/laya_LinkGame/src/BoardManager.ts
  var __decorate = __$decorate("9df8c109-eeb5-455d-be8f-39ca89ac47fb", "../src/BoardManager.ts");
  var { regClass, property } = Laya;
  var BoardManager = /* @__PURE__ */ __name(class BoardManager2 extends Laya.Script {
    constructor() {
      super(...arguments);
      this.col = 12;
      this.row = 8;
      this.imgWidth = 36;
      this.imgHeight = 36;
      this.selected = [];
    }
    onEnable() {
      this.board = this.owner;
      this.board.repeatX = this.col;
      this.board.repeatY = this.row;
      this.board.width = this.col * this.imgWidth + (this.col - 1) * this.board.spaceY;
      this.board.height = this.row * this.imgHeight + (this.row - 1) * this.board.spaceY;
      this.board.selectHandler = Laya.Handler.create(this, this.onItemSelect, null, false);
    }
    onItemSelect(idx) {
      const item = this.board.array[idx];
      if (item.listItemImg.skin) {
        this.selected.push(idx);
        if (this.selected.length > 2) {
          const recoveIdx = this.selected.shift();
          const item2 = this.board.array[recoveIdx];
          item2.listItemImg.skin = item2.listItemImg.skin.replace(/(\d)_touch/, "$1");
        }
        item.listItemImg.skin = item.listItemImg.skin.replace(/(\d)/, "$1_touch");
        if (this.selected.length === 2 && this.canRemove(this.selected[0], this.selected[1])) {
          this.removeItems();
        }
      }
    }
    canRemove(src, dest) {
      if (this.getImg(src) === this.getImg(dest))
        return true;
    }
    getImg(idx) {
      return this.board.array[idx].listItemImg.skin;
    }
    removeItems() {
      for (let i = 0; i < this.selected.length; i++) {
        this.board.array[this.selected[i]].listItemImg.skin = "";
      }
      this.selected = [];
    }
  }, "BoardManager");
  __decorate([
    property(),
    __metadata("design:type", Number)
  ], BoardManager.prototype, "col", void 0);
  __decorate([
    property(),
    __metadata("design:type", Number)
  ], BoardManager.prototype, "row", void 0);
  BoardManager = __decorate([
    regClass()
  ], BoardManager);

  // ../../../../../Document/Project/LayaAir/LayaAir3/laya_LinkGame/src/Main.generated.ts
  var MainBase = class extends Laya.Scene {
  };
  __name(MainBase, "MainBase");

  // ../../../../../Document/Project/LayaAir/LayaAir3/laya_LinkGame/src/Main.ts
  var __decorate2 = __$decorate("7bad1742-6eed-4d8d-81c0-501dc5bf03d6", "../src/Main.ts");
  var { regClass: regClass2, property: property2 } = Laya;
  var Main = /* @__PURE__ */ __name(class Main2 extends MainBase {
  }, "Main");
  Main = __decorate2([
    regClass2()
  ], Main);
})();
//# sourceMappingURL=bundle.js.map
