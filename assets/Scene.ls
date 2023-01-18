{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$runtime": "res://7bad1742-6eed-4d8d-81c0-501dc5bf03d6",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "1bcxzpyq",
      "_$var": true,
      "_$type": "List",
      "name": "Board",
      "x": 412,
      "y": 212,
      "width": 455.00000009999997,
      "height": 301.00000009999997,
      "mouseEnabled": true,
      "centerX": 0,
      "centerY": 3,
      "bgColor": "rgba(23, 241, 227, 1)",
      "repeatX": 12,
      "repeatY": 8,
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
          "width": 36,
          "height": 36,
          "_$child": [
            {
              "_$id": "2zcvqy5j",
              "_$type": "Image",
              "name": "listItemImg",
              "width": 36,
              "height": 36,
              "skin": "res://d91175b6-0c8f-40e0-809f-63bd0d80cb7f"
            }
          ]
        }
      },
      "_$comp": [
        {
          "_$type": "9df8c109-eeb5-455d-be8f-39ca89ac47fb",
          "scriptPath": "../src/BoardManager.ts",
          "col": 20,
          "row": 12
        }
      ]
    }
  ]
}