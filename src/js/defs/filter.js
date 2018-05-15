import global from '../global/global'
let { paper } = global.svg;

module.exports = function() {
    let filter = paper.filter('<feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />');
}