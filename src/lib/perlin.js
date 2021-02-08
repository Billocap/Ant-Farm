const {random, cos, sin, floor} = Math;

const _s = [
    randFloat(1000, 10000),
    randFloat(10000, 50000),
    randFloat(100000, 500000),
    randFloat(5000, 10000),
    randFloat(10000, 50000),
    randFloat(100000, 500000),
    randFloat(5000, 10000)
];

function randFloat(min, max) {
    return min + random() * (max - min);
}

function randGrad(x, y) {
    let angle = _s[0] * sin(x * _s[1] + y * _s[2] + _s[3]) * cos(x * _s[4] + y * _s[5] + _s[6]);

    return {
        x: cos(angle),
        y: sin(angle)
    }
}

function dotProduct(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y;
}

function smoothstep(x) {
    const a = 6 * x - 15;
    const b = x * a + 10;
    return x ** 3 * b;
}

function interpolate(x, a, b) {
    return a + smoothstep(x) * (b - a);
}

function perlin(x, y) {
    const x0 = floor(x);
    const y0 = floor(y);

    const x1 = x0 + 1;
    const y1 = y0 + 1;

    const offsets = [
        {x: x - x0, y: y - y0},
        {x: x - x1, y: y - y0},
        {x: x - x0, y: y - y1},
        {x: x - x1, y: y - y1}
    ];

    const dots = [
        dotProduct(offsets[0], randGrad(x0, y0)),
        dotProduct(offsets[1], randGrad(x1, y0)),
        dotProduct(offsets[2], randGrad(x0, y1)),
        dotProduct(offsets[3], randGrad(x1, y1))
    ];

    const p1 = interpolate(x - x0, dots[0], dots[1]);
    const p2 = interpolate(x - x0, dots[2], dots[3]);

    return (1 + interpolate(y - y0, p1, p2)) / 2;
}

export default perlin;