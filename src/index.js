import Creature from "./lib/Creature";
import Matrix from "./lib/Matrix";

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var mouse = {
    x: 0,
    y: 0
};

canvas.addEventListener("mousemove", e => {
    mouse = {
        x: e.offsetX,
        y: e.offsetY
    }
});

var popuResult = document.querySelector("#population");
var timeResult = document.querySelector("#time");
var traitResult = document.querySelector("#traits");
var cView = document.querySelector("#creature");

var sum = 0, steps = 1, peak = 0, season;

var isPaused = true;

function play() {
    isPaused = false;
};

function pause() {
    isPaused = true;
};

document.querySelector("#play").onclick = play;
document.querySelector("#pause").onclick = pause;

var env = new Matrix(100, 100);
var hunt = new Matrix(10, 10);

hunt.apply(0, _ => []);

var xStep = 500 / env.width, yStep = 500 / env.height;
var xHunt = 500 / hunt.width, yHunt = 500 / hunt.height;

env.apply(0, _ => Math.random());

var population = [
    new Creature("red", {v: 5, e: 0, a: Math.PI, b: 5, s: 5}, Math.random() * 495, Math.random() * 495)
];

var speeds = 0, angles = 0;

var mainLoop = setInterval( _ => {
    if (!isPaused) {
        canvas.setAttribute("width", 500);
        canvas.setAttribute("height", 500);

        season = (1 - Math.sin(steps * 2 * Math.PI / 365)) / 2;
        speeds = 0;
        angles = 0;

        env.forCell((cell, x, y) => {
            if (cell <= 0) {
                env.value(x, y, 0);
            }

            if (cell < 1) {
                env.filter(x, y, value => value + (0.02 - 0.03 * season));
            }

            ctx.fillStyle = `hsl(120, ${cell * 100}%, ${30 - season * 10}%)`;
            ctx.fillRect(x * xStep, y * yStep, xStep, yStep);
        });
        
        population.forEach((creature, index) => {
            let cx = Math.floor(creature.x / xStep);
            let cy = Math.floor(creature.y / yStep);

            let hx = Math.floor(creature.x / xHunt);
            let hy = Math.floor(creature.y / yHunt);

            hunt.value(hx, hy).push(creature);

            if (env.value(cx, cy) > 0) {
                let food = Math.min(env.value(cx, cy), creature.bite);
                
                creature.e += food;
                env.filter(cx, cy, value => value - food);
            }
            
            creature.move( _ => {
                env.filter(cx, cy, value => value + (creature.s / 10));

                population.splice(index, 1);
            }, _ => {
                population.push(creature.mutate(2, 0.1, 0.1, 0.5));
            });

            creature.draw(ctx);

            speeds += creature.v;
            angles += creature.a;
        });

        hunt.forCell((value, x, y) => {
            if(value.length > 1) {
                value.forEach( creature => {
                    for (let c = 0; c < value.length; c++) {
                        if (creature.s > value[c].s * 1.2) {
                            let a = value[c].x - creature.x;
                            let b = value[c].y - creature.y;
                            let r = (creature.s / 2) + (value[c].s / 2);

                            if (a * a + b * b <= r * r) {
                                creature.e += Math.min(creature.bite, value[c].e / 10);
                                population.splice(c, 1);
                            }
                        }
                    }
                });
            }

            //ctx.strokeRect(x * 50, y * 50, 50, 50);
        });

        hunt.apply(0, _ => []);



        sum += population.length;
        popuResult.innerHTML = `Population: ${population.length} Peak: ${peak} Average: ${sum / steps}`;

        traitResult.innerHTML = `Speed: ${speeds / population.length} Angle: ${angles / population.length}`;
        
        let currYear = Math.floor(steps / 365);
        let currMonth = Math.floor((steps - currYear * 365) / 30);
        let currDay = Math.floor((steps - currMonth * 30 - currYear * 365));
        timeResult.innerHTML = `Total of Days : ${steps} Year:${currYear} Month:${currMonth} Day:${currDay} Season: ${season < 0.5 ? "Warm" : "Cold"}`;
        steps += 1;

        if (population.length > peak) peak = population.length;

        if (population.length === 0) isPaused = true;
    }
}, 1000 / 15);