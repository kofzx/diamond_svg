// 遍历lightList
for (let i = 0; i < lightList.length; i++) {
    let x = lightList[i].getAttribute('x');
    let y = lightList[i].getAttribute('y');
    let transform = lightList[i].getAttribute('transform');

    // 提取transform字符串中的scale
    let str = transform.split('scale(');
    let newStr = str[1];
    let finalIndex = newStr.indexOf(')');
    let finalStr = newStr.substring(0, finalIndex);
    let finalStr_float = parseFloat(finalStr);
	
    // 赋值储存
    let scale = finalStr_float;
    let ds = finalStr_float / 55;
    let tmp_ds = ds;
    let scaleFinal = scale + 0.5;


    // 缩放
    // scale
    if (scale >= scaleFinal) {
        tmp_ds = -tmp_ds;
    } else if (scale <= ranS) {
        tmp_ds = ds;
    }
    scale += tmp_ds;
    console.log(scale);

    lightList[i].setAttribute('transform', 'translate(' + x +
        ',' + y + ') scale(' + scale + ') translate(' +
        -x + ',' + -y + ')');

    if (i == lightList.length - 1) {
        return;
    }
}

// snippe 2 
// 原地闪光
// 随机位置
// shine1.setAttribute('x', `${ranX}`);
// shine1.setAttribute('y', `${ranY}`);
// // 放大缩小 （添加随机缩放大小）
// shine1.setAttribute('transform', `translate(${ranX},${ranY}) scale(${scale}) translate(${-ranX},${-ranY})`);