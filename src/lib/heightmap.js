import perlin from './perlin';

const {pow, floor, random} = Math;

function heightmap(width, height, lac = 2, per = 1 / 2, oct = 6) {
    const map = new Array(width * height).fill(0);
    const off = [];

    var max = 0;
    var min = 1;

    for (let i = 0; i < oct; i++) {
        off.push({
            x: floor(random() * 1000000 - 500000),
            y: floor(random() * 1000000 - 500000)
        });
    }

    for(let y = 0; y < height; y ++) {
        for(let x = 0; x < width; x ++) {
            for (let i = 0; i < oct; i++) {
                map[y * width + x] += perlin(
                    (x * 4 * pow(lac, i) /  width) + off[i].x,
                    (y * 4 * pow(lac, i) / height) + off[i].y
                ) * pow(per, i);
            }

            if(map[y * width + x] >= max) {
                max = map[y * width + x];
            } else if (map[y * height + x] <= min){
                min = map[y * height + x];
            }
        }
    }

    return {
        map,
        point(x, y) {
            return (this.map[y * width + x] - min) / (max - min);
        }
    }
}

export default heightmap;