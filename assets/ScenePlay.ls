{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$runtime": "res://d1abb8db-12fd-4313-b798-1c4e6df7e9d2",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "i2ahrfcc",
      "_$type": "Image",
      "name": "Image_di",
      "width": 720,
      "height": 1280,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0,
      "skin": "res://e03671b1-4a84-479b-8db7-05101ba09b26",
      "sizeGrid": "46,22,46,14,0"
    },
    {
      "_$id": "lsawv9rv",
      "_$var": true,
      "_$type": "Image",
      "name": "Image_main",
      "width": 720,
      "height": 1280,
      "mouseEnabled": true,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0,
      "skin": "res://5528158c-fe09-4ac1-a774-2bd01e90ea05",
      "_$child": [
        {
          "_$id": "ugh3n4jx",
          "_$var": true,
          "_$type": "Image",
          "name": "Image_timeEmpty",
          "x": 96.99999999999996,
          "y": 142.99999999999997,
          "width": 376,
          "height": 65,
          "skin": "res://0665ecb2-6822-46b7-8b90-6260fa56d9b3"
        },
        {
          "_$id": "y7clacl1",
          "_$var": true,
          "_$type": "Image",
          "name": "Image_timeBefore",
          "x": 96.99999999999996,
          "y": 142.99999999999997,
          "width": 377,
          "height": 65,
          "mask": {
            "_$ref": "mzxhx6fb"
          },
          "skin": "res://79fcf6fa-8ae7-45d3-bbce-4a715aee8174",
          "_$child": [
            {
              "_$id": "mzxhx6fb",
              "_$var": true,
              "_$type": "Sprite",
              "name": "Sprite_mask",
              "x": -2.999999999999943,
              "y": -21.99999999999997,
              "width": 377,
              "height": 100,
              "visible": false,
              "_gcmds": [
                {
                  "_$type": "DrawRectCmd",
                  "x": 0,
                  "y": 0,
                  "width": 1,
                  "height": 1,
                  "percent": true,
                  "lineWidth": 1,
                  "lineColor": "#000000",
                  "fillColor": "#FFFFFF"
                }
              ]
            }
          ]
        },
        {
          "_$id": "1bcxzpyq",
          "_$var": true,
          "_$type": "List",
          "name": "Board",
          "x": 359.9999999999999,
          "y": 242,
          "width": 9.999996564147295e-8,
          "height": 9.999996564147295e-8,
          "mouseEnabled": true,
          "repeatX": 1,
          "repeatY": 1,
          "spaceX": 2,
          "spaceY": 2,
          "selectEnable": true,
          "itemRender": {
            "_$type": "any",
            "value": {
              "_$ver": 1,
              "_$id": "2zcvqy5j",
              "_$type": "Image",
              "name": "listItemImg",
              "width": 80.00000009999997,
              "height": 80.00000009999997,
              "pivotX": 40.00000004999998,
              "pivotY": 40.00000004999998,
              "anchorX": 0.5,
              "anchorY": 0.5,
              "skin": "res://d91175b6-0c8f-40e0-809f-63bd0d80cb7f"
            }
          }
        },
        {
          "_$id": "am0y046n",
          "_$var": true,
          "_$type": "Button",
          "name": "Button_menu",
          "x": 528,
          "y": 130.99999999999997,
          "width": 65,
          "height": 65,
          "mouseEnabled": true,
          "stateNum": 1,
          "skin": "res://b127392b-db80-4b16-b0e0-f647e1b405d0",
          "label": "",
          "labelSize": 20
        },
        {
          "_$id": "8va1lv9m",
          "_$var": true,
          "_$type": "Button",
          "name": "Button_pause",
          "x": 608.0000000000001,
          "y": 130.99999999999997,
          "width": 65,
          "height": 65,
          "mouseEnabled": true,
          "stateNum": 1,
          "skin": "res://67eda279-6ca4-4743-b441-317668a08f3b",
          "label": "",
          "labelSize": 20
        }
      ]
    },
    {
      "_$id": "eq16shy9",
      "_$var": true,
      "_$type": "Dialog",
      "name": "Dialog_nextLevel",
      "x": 360,
      "y": 640,
      "width": 419,
      "height": 289,
      "pivotX": 209.5,
      "pivotY": 144.5,
      "visible": false,
      "mouseEnabled": true,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "centerX": 0,
      "centerY": 0,
      "_$child": [
        {
          "_$id": "30n1h5ii",
          "_$type": "Image",
          "name": "Image_nextLevelBg",
          "x": -102,
          "y": -90,
          "width": 623.2370474165558,
          "height": 455.6631819970028,
          "centerX": 0,
          "skin": "res://9da88c9c-75a1-4848-b8a1-0f52409d4769"
        },
        {
          "_$id": "zluvdscu",
          "_$var": true,
          "_$type": "Button",
          "name": "Button_nextLevel",
          "x": 49,
          "y": 358.9999999999999,
          "width": 322,
          "height": 139,
          "mouseEnabled": true,
          "centerX": 0,
          "stateNum": 1,
          "skin": "res://f75114a4-0ac2-4dac-b856-eadbf44bb624",
          "label": "",
          "labelSize": 20
        },
        {
          "_$id": "7x83vb4i",
          "_$var": true,
          "_$type": "FontClip",
          "name": "FontClip_levelScore",
          "y": 100,
          "width": 419,
          "height": 49,
          "centerX": 0,
          "centerY": -20,
          "interval": 50,
          "skin": "res://d24c1cbc-0657-41fa-a966-471705de2af1",
          "align": "center",
          "sheet": "0123456789",
          "value": "0",
          "spaceX": -7,
          "spaceY": 0
        },
        {
          "_$id": "wbe7091x",
          "_$type": "Label",
          "name": "Label_dialogTip",
          "x": 6,
          "y": -109,
          "width": 408,
          "height": 94,
          "centerX": 0,
          "text": "关卡清单",
          "fontSize": 70,
          "color": "rgba(108, 68, 16, 1)",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "leading": 0,
          "padding": "0,0,0,0",
          "stroke": 8,
          "strokeColor": "rgba(228, 141, 27, 1)"
        },
        {
          "_$id": "jp91i3w9",
          "_$type": "Label",
          "name": "Label_scoreTip",
          "x": 13,
          "y": -8,
          "width": 393,
          "height": 129,
          "centerX": 0,
          "text": "关卡得分",
          "fontSize": 50,
          "color": "rgba(80, 100, 13, 1)",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "leading": 0,
          "padding": "0,0,0,0",
          "stroke": 6.4,
          "strokeColor": "rgba(161, 201, 23, 1)"
        }
      ]
    },
    {
      "_$id": "o95sil1d",
      "_$var": true,
      "_$type": "Dialog",
      "name": "Dialog_gameOver",
      "x": 360,
      "y": 640,
      "width": 419,
      "height": 289,
      "pivotX": 209.5,
      "pivotY": 144.5,
      "visible": false,
      "mouseEnabled": true,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "centerX": 0,
      "centerY": 0,
      "_$child": [
        {
          "_$id": "q2uljsey",
          "_$type": "Image",
          "name": "Image_gameoverBg",
          "x": -89,
          "y": -90,
          "width": 623.2370474165558,
          "height": 455.6631819970028,
          "centerX": 13,
          "skin": "res://7a06d5b0-18f6-4680-a41a-1be5ba6930ad"
        },
        {
          "_$id": "9bte1ny6",
          "_$var": true,
          "_$type": "Button",
          "name": "Button_backHome",
          "x": 49,
          "y": 358.9999999999999,
          "width": 322,
          "height": 139,
          "mouseEnabled": true,
          "centerX": 0,
          "stateNum": 1,
          "skin": "res://c17ca67a-fe42-4f2a-a116-9982b6e2db07",
          "label": "",
          "labelSize": 20
        },
        {
          "_$id": "51yevujq",
          "_$var": true,
          "_$type": "FontClip",
          "name": "FontClip_gameScore",
          "y": 120,
          "width": 419,
          "height": 49,
          "centerX": 0,
          "centerY": 0,
          "interval": 50,
          "skin": "res://d24c1cbc-0657-41fa-a966-471705de2af1",
          "align": "center",
          "sheet": "0123456789",
          "value": "0",
          "spaceX": -7,
          "spaceY": 0
        },
        {
          "_$id": "27cb4kgr",
          "_$type": "Label",
          "name": "Label_dialogTip",
          "x": 6,
          "y": -109,
          "width": 408,
          "height": 94,
          "centerX": 0,
          "text": "游戏结束",
          "fontSize": 70,
          "color": "rgba(108, 68, 16, 1)",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "leading": 0,
          "padding": "0,0,0,0",
          "stroke": 8,
          "strokeColor": "rgba(228, 141, 27, 1)"
        },
        {
          "_$id": "byv9m26w",
          "_$type": "Label",
          "name": "Label_scoreTip",
          "x": 13,
          "y": -11,
          "width": 393,
          "height": 129,
          "centerX": 0,
          "text": "总分",
          "fontSize": 50,
          "color": "rgba(80, 100, 13, 1)",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "leading": 0,
          "padding": "0,0,0,0",
          "stroke": 6.4,
          "strokeColor": "rgba(161, 201, 23, 1)"
        },
        {
          "_$id": "c75qx8hg",
          "_$type": "Text",
          "name": "Text",
          "x": 58,
          "y": 395,
          "width": 322,
          "height": 57,
          "text": "退出游戏",
          "fontSize": 40,
          "bold": true,
          "color": "rgba(83, 61, 17, 1)",
          "align": "center",
          "valign": "middle",
          "leading": 0,
          "strokeColor": "rgba(52, 40, 4, 1)"
        }
      ]
    },
    {
      "_$id": "bzdtkqjr",
      "_$var": true,
      "_$type": "Box",
      "name": "Box_pause",
      "x": 260,
      "y": 507,
      "width": 200,
      "height": 200,
      "visible": false,
      "centerX": 0,
      "_$child": [
        {
          "_$id": "6em1v9bu",
          "_$type": "Image",
          "name": "Image_pauseBg",
          "x": -130,
          "y": -130.99999999999994,
          "width": 459.71702434975657,
          "height": 706.2035991074988,
          "mouseEnabled": true,
          "centerX": 0,
          "skin": "res://3c3578c5-c96c-467b-8440-b3a91b0f81fb"
        },
        {
          "_$id": "2xs5d6kb",
          "_$type": "Text",
          "name": "Text_pause",
          "x": -81.00000000000006,
          "y": 57.00000000000023,
          "width": 307,
          "height": 88,
          "text": "已暂停\n",
          "fontSize": 70,
          "bold": true,
          "color": "rgba(134, 221, 23, 1)",
          "align": "center",
          "valign": "middle",
          "leading": 0,
          "stroke": 2,
          "strokeColor": "rgba(43, 62, 23, 1)"
        }
      ]
    },
    {
      "_$id": "p96kbvvp",
      "_$var": true,
      "_$type": "Box",
      "name": "Box_addScore",
      "x": 360,
      "y": 20,
      "width": 200,
      "height": 200,
      "pivotX": 100,
      "pivotY": 100,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "centerX": 0,
      "_$child": [
        {
          "_$id": "i01qmmmm",
          "_$type": "Text",
          "name": "Text",
          "x": -4,
          "y": -123,
          "width": 69,
          "height": 200,
          "text": "+",
          "fontSize": 100,
          "bold": true,
          "color": "rgba(255, 255, 8, 1)",
          "align": "center",
          "valign": "middle",
          "leading": 0,
          "stroke": 20,
          "strokeColor": "rgba(131, 99, 28, 1)"
        },
        {
          "_$id": "4kma46ek",
          "_$type": "Image",
          "name": "Image",
          "x": 60,
          "y": -78,
          "width": 70,
          "height": 100,
          "skin": "res://8c4af977-a791-4363-a6a2-fb407e3165d9"
        },
        {
          "_$id": "1ry64c7x",
          "_$type": "Image",
          "name": "Image(1)",
          "x": 120,
          "y": -83,
          "width": 70,
          "height": 100,
          "skin": "res://0b4835cf-cd54-4f00-ace8-1082a8066dd9"
        }
      ]
    }
  ]
}