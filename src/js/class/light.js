import toolkit from '../utils/toolkit';
let { random } = toolkit;

const W = document.documentElement.clientWidth;
const H = document.documentElement.clientHeight;
// 中心点的坐标
const centerX = W / 2;
const centerY = H / 2 - 120;

// 定义常用调试数值
const X_OFFSET = 70,
    Y_OFFSET = 30;

let shining = document.getElementById('shining');
let shine = document.getElementById('shine');

// 闪光类
class Light {

    constructor(count) {
            // 属性
            this.info = {};

            // 生成对象
            this.render(count);
            // 获取信息
            this.getInfo();
        }
        // 闪光
    lighting() {
        let ds_tmp = 0.2;
        let ds = ds_tmp;
        // 遍历info对象
        let entries = Object.entries(this.info);
        let light;
        for (let [k, v] of entries) {
            light = document.getElementById(k);

            // 判断scale
            if (v.scale >= random(0.5, 0.6)) {
                ds = -1 * ds;
            } else if (v.scale <= random(0.3, 0.5)) {
                ds = ds_tmp;
            }
            v.scale += ds;

            light.setAttribute('transform', 'translate(' + v.x +
                ',' + v.y + ') scale(' + v.scale + ') translate(' +
                -v.x + ',' + -v.y + ')');
        }

    }

    // 渲染对象
    render(count) {
        let light;

        let xArray = Array.from({ length: count }, (v, i) => {
            return (i + 1) * X_OFFSET;
        });
        let yArray = Array.from({ length: count }, (v, i) => {
            return (i + 1) * Y_OFFSET;
        });

        while (count--) {
            light = toolkit.use(shine);
            light.id = `light${count}`;

            light.setAttribute('x', random(centerX - xArray[count], centerX + xArray[count]));
            light.setAttribute('y', random(centerY - yArray[count], centerY + yArray[count]));
            // 添加随机缩放大小
            light.setAttribute('transform', 'translate(' + random(centerX - xArray[count], centerX + xArray[count]) +
                ',' + random(centerY - yArray[count], centerY + yArray[count]) + ') scale(' + random(0.6, 0.8) + ') translate(' +
                -random(centerX - xArray[count], centerX + xArray[count]) + ',' + -random(centerY - yArray[count], centerY + yArray[count]) + ')');

            shining.appendChild(light);
        }
    }

    // 生成一定数量的随机数
    getRand(count, min, max) {
        let arr = new Array();
        let bool = true;
        for (let i = 0; i < count; i++) {
            arr[i] = random(min, max);
        }
        // 进行检测处理
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (Math.abs(arr[i] - arr[j]) < 50) {
                    bool = false;
                }
            }
        }
        if (!bool) this.getRand(count, min, max);
        return arr;
    }

    // 对随机数 数组进行处理
    randFactor(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (Math.abs(arr[i] - arr[j]) < 50) break;
            }
        }
        return arr;
    }

    // 获取信息
    getInfo() {
        let list = shining.children;
        Array.from(list, v => {
            let id = v.id;
            let x = v.getAttribute('x');
            let y = v.getAttribute('y');
            let transform = v.getAttribute('transform');
            // 提取字符串中的scale值
            let scale = this.extractScale(transform);
            // 储存到this.info对象中
            this.info[id] = {};
            this.info[id]['id'] = id;
            this.info[id]['x'] = x;
            this.info[id]['y'] = y;
            this.info[id]['scale'] = scale;
        });
    }

    // 提取scale值
    extractScale(transform) {
        // 提取transform字符串中的scale
        let str = transform.split('scale(');
        let newStr = str[1];
        let finalIndex = newStr.indexOf(')');
        let finalStr = newStr.substring(0, finalIndex);
        let finalStr_float = parseFloat(finalStr);

        return finalStr_float;
    }

}

module.exports = Light;