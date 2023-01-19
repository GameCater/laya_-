/**
 * 
 * @param {*} row 列表列数
 * @param {*} col 列表行数
 */
function generateListData(row, col) {
    const listData = new Array(row * col);
    // 列表实际的显示内容的行列数
    const realRow = row - 2, realCol = col - 2;
    if (realRow * realCol % 2) 
        throw new Error('列表项个数为奇数');

    let temp = [], total = realRow * realCol, flags = [];
    for (let i = 0; i < total / 2; i ++) {
        temp.push(randNumber(1, 32));
        flags.push(i);
    }

    // 随机取数组前半段给后半段赋值
    for (let i = Math.ceil(total / 2); i < total; i ++) {
        const rand = randNumber(0, flags.length - 1);
        const idx = flags[rand];
        flags.splice(rand, 1);
        temp[i] = temp[idx];
    }

    // 构造json数据
    let num = 0;
    for (let n = 0; n < row; n ++) {
        for (let m = 0; m < col; m ++ ) {
            // 二维转一维
            const idx = n * col + m;
            if (n === 0 || n === row - 1 || m === 0 || m === col - 1) {
                const item = {
                    listItemImg: {
                        skin: ''
                    }
                };
                item.listItemImg.skin = '';
                listData[idx] = item;
                continue;
            }
            const item = {
                listItemImg: {
                    skin: ''
                }
            };
            item.listItemImg.skin = `resources/farm/${temp[num ++]}.png`;
            listData[idx] = item;
        }
    }
    return listData;
} 

function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default generateListData;