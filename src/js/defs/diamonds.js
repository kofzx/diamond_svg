import global from '../global/global'
let { svg, main, diamond } = global;
let { paper } = svg;
let { centerX, centerY } = main;
let { MAX_X, MID_X, MIN_X, MAX_Y, MID_Y, a } = diamond;

module.exports = function() {
    /**
     * 钻石组
     */
    let diamondsGroup = paper.g().attr({
        id: "diamond"
    });

    // 钻石填充

    let diamondFill = paper.polygon([centerX, centerY, centerX - MAX_X, centerY - MAX_Y,
        centerX - MAX_X + MIN_X, centerY - MAX_Y - MID_Y, centerX + MIN_X, centerY - MAX_Y - MID_Y,
        centerX + MIN_X * 2, centerY - MAX_Y
    ]).attr({
        style: "fill: inherit; stroke: transparent"
    });

    diamondsGroup.add(diamondFill).toDefs();

    // 钻石线条
    const line1 = `M${ centerX - MAX_X + a } ${ centerY - MAX_Y } L${ centerX - MAX_X + MIN_X - a } ${ centerY - MAX_Y }
                L${centerX} ${centerY - a} L${ centerX + MIN_X + a } ${ centerY - MAX_Y }
                L${ centerX + MIN_X * 2 - a } ${ centerY - MAX_Y }`,
        line2 = `M${ centerX - MAX_X + MIN_X } ${ centerY - MAX_Y - MID_Y + a } 
                L${ centerX - MAX_X + MIN_X + MID_X } ${ centerY - MAX_Y - a }
                L${ centerX - MAX_X + MIN_X + MID_X * 2 } ${ centerY - MAX_Y - MID_Y + a }`,
        line3 = `M${ centerX - MAX_X + MIN_X + MID_X } ${ centerY - MAX_Y } L${centerX} ${centerY - 2}`,
        line4 = `M${ centerX - MAX_X + MIN_X + MID_X - a } ${ centerY - MAX_Y }
                L${ centerX - MAX_X + MIN_X } ${ centerY - MAX_Y }`,
        line5 = `M${ centerX - MAX_X + MIN_X + MID_X - a } ${ centerY - MAX_Y }
                L${ centerX + MIN_X + a } ${ centerY - MAX_Y }`;



    // 加入数组
    let lines = new Array();
    lines.push(line1, line2, line3, line4, line5);

    lines.map(v => {
        let diamondLine = paper.path(v).attr({
            class: "line"
        });
        diamondsGroup.add(diamondLine);
    });

    return diamondsGroup;
}