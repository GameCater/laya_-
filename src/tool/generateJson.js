/**
 * 
 * @param {*} row 列表列数
 * @param {*} col 列表行数
 */
function generateListData(row, col) {
    const listData = [];
    // 列表实际的显示内容的行列数
    const realRow = row - 2, realCol = col - 2;
    if (realRow * realCol % 2) 
        throw new Error('列表项个数为奇数');

    let temp = [], total = realRow * realCol;
    for (let i = 0; i < total / 2; i ++) {
        temp.push(randNumber(1, 32));
    }
    for (let i = Math.ceil(total / 2); i < total; i ++) {
        temp[i] = temp[randNumber(0, Math.floor(total / 2))];
    }

    for (let n = 0; n < row; n ++) {
        for (let m = 0; m < col; m ++ ) {
            if (n === 0 || n === col - 1 || m === 0 || m === row - 1) {
                const item = {};
                item.listItemImg.skin = '';
                const idx = n * col + m;
            }
        }
    }
} 

function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}