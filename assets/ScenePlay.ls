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
      "_$id": "lsawv9rv",
      "_$type": "Image",
      "name": "Image",
      "width": 720,
      "height": 1280,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0,
      "skin": "res://b87a283b-09a2-45b9-8a78-ad8dd10eed0b"
    },
    {
      "_$id": "1bcxzpyq",
      "_$var": true,
      "_$type": "List",
      "name": "Board",
      "x": 29,
      "y": 268,
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
          "_$id": "v08m1452",
          "_$type": "Box",
          "name": "Box",
          "width": 60,
          "height": 60,
          "_$child": [
            {
              "_$id": "2zcvqy5j",
              "_$type": "Image",
              "name": "listItemImg",
              "width": 60,
              "height": 60,
              "left": 0,
              "right": 0,
              "top": 0,
              "bottom": 0,
              "skin": "res://d91175b6-0c8f-40e0-809f-63bd0d80cb7f"
            }
          ]
        }
      }
    },
    {
      "_$id": "am0y046n",
      "_$var": true,
      "_$type": "Button",
      "name": "Button_menu",
      "x": 528,
      "y": 131,
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
      "x": 608,
      "y": 131,
      "width": 65,
      "height": 65,
      "mouseEnabled": true,
      "stateNum": 1,
      "skin": "res://67eda279-6ca4-4743-b441-317668a08f3b",
      "label": "",
      "labelSize": 20
    },
    {
      "_$id": "ugh3n4jx",
      "_$var": true,
      "_$type": "Image",
      "name": "Image_timeEmpty",
      "x": 97,
      "y": 143,
      "width": 376,
      "height": 65,
      "skin": "res://0665ecb2-6822-46b7-8b90-6260fa56d9b3"
    },
    {
      "_$id": "y7clacl1",
      "_$var": true,
      "_$type": "Image",
      "name": "Image_timeBefore",
      "x": 97,
      "y": 143,
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
      "_$id": "p7y3er5i",
      "_$type": "Image",
      "name": "Image_scoreBoard",
      "x": 200,
      "y": 72,
      "width": 191.35631689345453,
      "height": 70.26364760931536,
      "skin": "res://063d0b4a-ac3c-4f4e-a444-3eddac1de200"
    },
    {
      "_$id": "t7b4ukvu",
      "_$type": "Image",
      "name": "Image_scoreTip",
      "x": 170,
      "y": 94,
      "width": 149,
      "height": 26,
      "skin": "res://f402ff38-257e-4b16-ac7f-19cbe4df6aed"
    },
    {
      "_$id": "nm3dthp2",
      "_$var": true,
      "_$type": "Image",
      "name": "Image_score",
      "x": 287,
      "y": 100,
      "width": 14,
      "height": 15,
      "skin": "res://368956d6-4d2b-4cc6-b173-67e04b1ee20e",
      "group": "1"
    }
  ]
}