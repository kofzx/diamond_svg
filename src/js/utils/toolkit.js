const toolkit = {

    // 随机数
    random(min, max) {
        return min + (max - min) * Math.random();
    },
    // 创建use标签
    use(origin, SVG_NS = 'http://www.w3.org/2000/svg', XLINK_NS = 'http://www.w3.org/1999/xlink') {
        let _use = document.createElementNS(SVG_NS, 'use');
        _use.setAttributeNS(XLINK_NS, 'xlink:href', '#' + origin.id);
        return _use;
    }

};

module.exports = toolkit;