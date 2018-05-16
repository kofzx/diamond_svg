import global from '../global/global'
let { paper } = global.svg;

let blurry = paper.filter(Snap.filter.blur(5));

module.exports = function() {
    /**
     * 闪光组
     */
    let lightsGroup = paper.g().attr({
        id: "shine"
    });

    // 光晕
    let halo = paper.circle(0, 0, 5).attr({
        fill: "url(#radial)",
        filter: blurry
    });

    // 发光线
    for (let i = 0; i < 4; i++) {
        let lightLine = paper.ellipse(0, 0, i % 2 == 0 ? 10 : 9, 0.3).attr({
            fill: "url(#linear)",
            transform: `scale(4) rotate(${i * 45})`
        });
        lightsGroup.add(lightLine);
    }

    lightsGroup.add(halo).toDefs();

    return lightsGroup;
}