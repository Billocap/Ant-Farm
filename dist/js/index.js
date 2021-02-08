/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_perlin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/perlin */ \"./src/lib/perlin.js\");\n/* harmony import */ var _lib_Creature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/Creature */ \"./src/lib/Creature.js\");\n/* harmony import */ var _lib_Matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/Matrix */ \"./src/lib/Matrix.js\");\n/* harmony import */ var _lib_heightmap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/heightmap */ \"./src/lib/heightmap.js\");\n\r\n\r\n\r\n\r\n\r\nvar canvas = document.querySelector(\"canvas\");\r\nvar ctx = canvas.getContext(\"2d\");\r\n\r\n/*var mouse = {\r\n    x: 0,\r\n    y: 0\r\n};\r\n\r\ncanvas.addEventListener(\"mousemove\", e => {\r\n    mouse = {\r\n        x: e.offsetX,\r\n        y: e.offsetY\r\n    }\r\n});\r\n\r\nvar popuResult = document.querySelector(\"#population\");\r\nvar timeResult = document.querySelector(\"#time\");\r\nvar traitResult = document.querySelector(\"#traits\");\r\nvar cView = document.querySelector(\"#creature\");\r\n\r\nvar sum = 0, steps = 1, peak = 0, season;\r\n\r\nvar isPaused = true;\r\n\r\nfunction play() {\r\n    isPaused = false;\r\n};\r\n\r\nfunction pause() {\r\n    isPaused = true;\r\n};\r\n\r\ndocument.querySelector(\"#play\").onclick = play;\r\ndocument.querySelector(\"#pause\").onclick = pause;\r\n\r\nvar env = new Matrix(100, 100);\r\nvar hunt = new Matrix(10, 10);*/\r\n\r\n/*var h_map = perlin(2, 1);\r\nvar h_map2 = perlin(4, 1/2);\r\nvar h_map3 = perlin(8, 1/4);\r\nvar h_map4 = perlin(16, 1/8);*/\r\n\r\nvar h_map = (0,_lib_heightmap__WEBPACK_IMPORTED_MODULE_3__.default)(512, 512);\r\n\r\n/*\r\nhunt.apply(0, _ => []);\r\n\r\nvar xStep = 500 / env.width, yStep = 500 / env.height;\r\nvar xHunt = 500 / hunt.width, yHunt = 500 / hunt.height;\r\n\r\nenv.apply(0, _ => Math.random());\r\n\r\nvar population = [\r\n    new Creature(\"red\", {v: 5, e: 0, a: Math.PI, b: 5, s: 5}, Math.random() * 495, Math.random() * 495)\r\n];\r\n\r\nvar speeds = 0, angles = 0;*/\r\n\r\n//var mainLoop = setInterval( _ => {\r\n    //if (!isPaused) {\r\n        canvas.setAttribute(\"width\", 512);\r\n        canvas.setAttribute(\"height\", 512);\r\n\r\n        for (let y = 0; y < 512; y += 10) {\r\n            for (let x = 0; x < 512; x += 10) {\r\n                ctx.fillStyle = `hsl(0, 0%, ${h_map.point(x, y) * 100}%)`;\r\n                ctx.fillRect(x, y, 10, 10);\r\n            }\r\n        }\r\n\r\n        /*season = (1 - Math.sin(steps * 2 * Math.PI / 365)) / 2;\r\n        speeds = 0;\r\n        angles = 0;\r\n\r\n        env.forCell((cell, x, y) => {\r\n            if (cell <= 0) {\r\n                env.value(x, y, 0);\r\n            }\r\n\r\n            if (cell < 1) {\r\n                env.filter(x, y, value => value + (0.02 - 0.03 * season));\r\n            }\r\n\r\n            ctx.fillStyle = `hsl(120, ${cell * 100}%, ${30 - season * 10}%)`;\r\n            ctx.fillRect(x * xStep, y * yStep, xStep, yStep);\r\n        });\r\n        \r\n        population.forEach((creature, index) => {\r\n            let cx = Math.floor(creature.x / xStep);\r\n            let cy = Math.floor(creature.y / yStep);\r\n\r\n            let hx = Math.floor(creature.x / xHunt);\r\n            let hy = Math.floor(creature.y / yHunt);\r\n\r\n            hunt.value(hx, hy).push(creature);\r\n\r\n            if (env.value(cx, cy) > 0) {\r\n                let food = Math.min(env.value(cx, cy), creature.bite);\r\n                \r\n                creature.e += food;\r\n                env.filter(cx, cy, value => value - food);\r\n            }\r\n            \r\n            creature.move( _ => {\r\n                env.filter(cx, cy, value => value + (creature.s / 10));\r\n\r\n                population.splice(index, 1);\r\n            }, _ => {\r\n                population.push(creature.mutate(2, 0.1, 0.1, 0.5));\r\n            });\r\n\r\n            creature.draw(ctx);\r\n\r\n            speeds += creature.v;\r\n            angles += creature.a;\r\n        });\r\n\r\n        hunt.forCell((value, x, y) => {\r\n            if(value.length > 1) {\r\n                value.forEach( creature => {\r\n                    for (let c = 0; c < value.length; c++) {\r\n                        if (creature.s > value[c].s * 1.2) {\r\n                            let a = value[c].x - creature.x;\r\n                            let b = value[c].y - creature.y;\r\n                            let r = (creature.s / 2) + (value[c].s / 2);\r\n\r\n                            if (a * a + b * b <= r * r) {\r\n                                creature.e += Math.min(creature.bite, value[c].e / 10);\r\n                                population.splice(c, 1);\r\n                            }\r\n                        }\r\n                    }\r\n                });\r\n            }\r\n\r\n            //ctx.strokeRect(x * 50, y * 50, 50, 50);\r\n        });\r\n\r\n        hunt.apply(0, _ => []);\r\n\r\n\r\n\r\n        sum += population.length;\r\n        popuResult.innerHTML = `Population: ${population.length} Peak: ${peak} Average: ${sum / steps}`;\r\n\r\n        traitResult.innerHTML = `Speed: ${speeds / population.length} Angle: ${angles / population.length}`;\r\n        \r\n        let currYear = Math.floor(steps / 365);\r\n        let currMonth = Math.floor((steps - currYear * 365) / 30);\r\n        let currDay = Math.floor((steps - currMonth * 30 - currYear * 365));\r\n        timeResult.innerHTML = `Total of Days : ${steps} Year:${currYear} Month:${currMonth} Day:${currDay} Season: ${season < 0.5 ? \"Warm\" : \"Cold\"}`;\r\n        steps += 1;\r\n\r\n        if (population.length > peak) peak = population.length;\r\n\r\n        if (population.length === 0) isPaused = true;*/\r\n    //}\r\n//}, 1000 / 15);\n\n//# sourceURL=webpack://ant-farm/./src/index.js?");

/***/ }),

/***/ "./src/lib/Creature.js":
/*!*****************************!*\
  !*** ./src/lib/Creature.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Creature(color, dna = {v: 5, e: 10, a: Math.PI, b: 6, s:5}, x = 0, y = 0) {\r\n    this.x = x;\r\n    this.y = y;\r\n\r\n    this.v = Math.max(dna.v, 3);\r\n    this.e = dna.e;\r\n    this.a = Math.min(Math.max(dna.a, 0), Math.PI);\r\n    this.b = Math.max(dna.b, 5);\r\n    this.s = Math.max(dna.s, 4);\r\n\r\n    this.bite = 0.1 + (this.s - 5);\r\n\r\n    this.dir = 0;\r\n    \r\n    this.color = color;\r\n}\r\n\r\nCreature.prototype = {\r\n    move(death, rfn) {\r\n        this.x = Math.max(Math.min(this.x + Math.cos(this.dir) * this.v , 500 - this.v), this.v);\r\n        this.y = Math.max(Math.min(this.y + Math.sin(this.dir) * this.v , 500 - this.v), this.v);\r\n\r\n        this.dir += (-1 + Math.random() * 2) * this.a;\r\n\r\n        this.e -= 0.000032 * ((this.v * this.v * this.s * this.s) / 2);\r\n\r\n        if (this.e <= 0) death();\r\n\r\n        if (this.e > this.b) {\r\n            rfn();\r\n\r\n            this.e -= this.b - 1;\r\n        }\r\n    },\r\n    mutate(v, a, b, s) {\r\n        return new Creature(this.color, {\r\n            v: this.v + (-1 + Math.random() * 2) * v,\r\n            e: this.b - 1,\r\n            a: this.a + (-1 + Math.random() * 2) * a,\r\n            b: this.b + (-1 + Math.random() * 2) * b,\r\n            s: this.s + (-1 + Math.random() * 2) * s\r\n        }, this.x, this.y);\r\n    },\r\n    draw(context) {\r\n        context.fillStyle = `rgb(${(this.v / 10) * 255}, ${(this.a / Math.PI) * 255}, ${(this.s / 5) * 255})`;\r\n        context.beginPath();\r\n        context.arc(this.x, this.y, this.s / 2, 0, Math.PI * 2);\r\n        context.fill();\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Creature);\n\n//# sourceURL=webpack://ant-farm/./src/lib/Creature.js?");

/***/ }),

/***/ "./src/lib/Matrix.js":
/*!***************************!*\
  !*** ./src/lib/Matrix.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Matrix(width = 3, height = 3, fill = 0) {\r\n    this.elements = new Array(width * height).fill(fill);\r\n\r\n    this.width = width;\r\n    this.height = height;\r\n\r\n    this.length = width * height;\r\n}\r\n\r\nMatrix.isMatrix = obj => obj instanceof Matrix;\r\n\r\nMatrix.prototype = {\r\n    constructor: Matrix,\r\n    resize(width = 3, height = 3) {\r\n        this.width = width;\r\n        this.height = height;\r\n        this.length = width * height;\r\n\r\n        this.elements = new Array(width * height).fill(0);\r\n    },\r\n    value(x, y, value = undefined) {\r\n        const index = x + y * this.width;\r\n\r\n        if (index > this.length || index < 0) return undefined;\r\n\r\n        this.elements[index] = value !== undefined ? value : this.elements[index];\r\n\r\n        return this.elements[index];\r\n    },\r\n    filter(x, y, fn = value => value) {\r\n        const index = x + y * this.width;\r\n\r\n        if (index > this.length || index < 0) return undefined;\r\n\r\n        this.elements[index] = fn(this.elements[index]);\r\n\r\n        return this.elements[index];\r\n    },\r\n    from(array) {\r\n        if (!Array.isArray(array)) return undefined;\r\n\r\n        if (array.length !== this.length) return undefined;\r\n\r\n        array.forEach( (value, index) => this.elements[index] = (value || 0));\r\n    },\r\n    copy(matrix) {\r\n        if (!Matrix.isMatrix(matrix)) return undefined;\r\n\r\n        this.width = matrix.width;\r\n        this.height = matrix.height;\r\n        this.length = matrix.length;\r\n\r\n        this.elements = new Array(matrix.length);\r\n\r\n        matrix.forEach( (value, index) => this.elements[index] = value);\r\n\r\n        return this;\r\n    },\r\n    clear(value = 0) {\r\n        this.elements = new Array(this.width * this.height).fill(null);\r\n    },\r\n    compare(matrix, compFn = (a, b) => a === b) {\r\n        if (!Matrix.isMatrix(matrix) && !Array.isArray(matrix)) return false;\r\n\r\n        if (matrix.length !== this.length) return false;\r\n\r\n        for (let i=0; i<this.length; i++) {\r\n            if (!compFn(matrix[i], this.elements[i])) return false;\r\n        }\r\n\r\n        return true;\r\n    },\r\n    apply(change = 0, fn = (value, change) => value + change) {\r\n        if (Matrix.isMatrix(change) || Array.isArray(change)) {\r\n            if (change.length !== this.length) return undefined;\r\n\r\n            change.forEach( (value, index) => {\r\n                this.elements[index] = fn(this.elements[index], value);\r\n            });\r\n        } else {\r\n            if (change === undefined) return change;\r\n\r\n            this.forEach( (value, index) => {\r\n                this.elements[index] = fn(value, change);\r\n            });\r\n        }\r\n\r\n        return this;\r\n    },\r\n    check(value, compFn = (a, b) => a === b) {\r\n        for (let elem of this.elements) {\r\n            if (compFn(value, elem)) return true;\r\n        }\r\n\r\n        return false;\r\n    },\r\n    forEach(fn) {\r\n        this.elements.forEach((value, index, array) => {\r\n            fn(value, index, array);\r\n        });\r\n    },\r\n    forCell(fn) {\r\n        this.elements.forEach((value, index, array) => {\r\n            fn(value, index % this.width, Math.floor(index / this.height), array);\r\n        });\r\n    },\r\n    forRow(fn) {\r\n        for (let i=0; i<this.height; i++) {\r\n            let index = this.width * i;\r\n\r\n            fn(this.elements.slice(index, index + this.width), i, this.elements);\r\n        }\r\n    },\r\n    forCol(fn) {\r\n        for (let i=0; i<this.width; i++) {\r\n            let column = [];\r\n\r\n            for (let j=0; j<this.height; j++) {\r\n                column.push(this.elements[i + j * this.width]);\r\n            }\r\n\r\n            fn(column, i, this.elements);\r\n        }\r\n    }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Matrix);\n\n//# sourceURL=webpack://ant-farm/./src/lib/Matrix.js?");

/***/ }),

/***/ "./src/lib/heightmap.js":
/*!******************************!*\
  !*** ./src/lib/heightmap.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _perlin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./perlin */ \"./src/lib/perlin.js\");\n\r\n\r\nconst {pow, floor, random} = Math;\r\n\r\nfunction heightmap(width, height, lac = 2, per = 1 / 2, oct = 6) {\r\n    const map = new Array(width * height).fill(0);\r\n    const off = [];\r\n\r\n    var max = 0;\r\n    var min = 1;\r\n\r\n    for (let i = 0; i < oct; i++) {\r\n        off.push({\r\n            x: floor(random() * 1000000 - 500000),\r\n            y: floor(random() * 1000000 - 500000)\r\n        });\r\n    }\r\n\r\n    for(let y = 0; y < height; y ++) {\r\n        for(let x = 0; x < width; x ++) {\r\n            for (let i = 0; i < oct; i++) {\r\n                map[y * width + x] += (0,_perlin__WEBPACK_IMPORTED_MODULE_0__.default)(\r\n                    (x * 4 * pow(lac, i) /  width) + off[i].x,\r\n                    (y * 4 * pow(lac, i) / height) + off[i].y\r\n                ) * pow(per, i);\r\n            }\r\n\r\n            if(map[y * width + x] >= max) {\r\n                max = map[y * width + x];\r\n            } else if (map[y * height + x] <= min){\r\n                min = map[y * height + x];\r\n            }\r\n        }\r\n    }\r\n\r\n    return {\r\n        map,\r\n        point(x, y) {\r\n            return (this.map[y * width + x] - min) / (max - min);\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (heightmap);\n\n//# sourceURL=webpack://ant-farm/./src/lib/heightmap.js?");

/***/ }),

/***/ "./src/lib/perlin.js":
/*!***************************!*\
  !*** ./src/lib/perlin.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst {random, cos, sin, floor} = Math;\r\n\r\nconst _s = [\r\n    randFloat(1000, 10000),\r\n    randFloat(10000, 50000),\r\n    randFloat(100000, 500000),\r\n    randFloat(5000, 10000),\r\n    randFloat(10000, 50000),\r\n    randFloat(100000, 500000),\r\n    randFloat(5000, 10000)\r\n];\r\n\r\nfunction randFloat(min, max) {\r\n    return min + random() * (max - min);\r\n}\r\n\r\nfunction randGrad(x, y) {\r\n    let angle = _s[0] * sin(x * _s[1] + y * _s[2] + _s[3]) * cos(x * _s[4] + y * _s[5] + _s[6]);\r\n\r\n    return {\r\n        x: cos(angle),\r\n        y: sin(angle)\r\n    }\r\n}\r\n\r\nfunction dotProduct(vector1, vector2) {\r\n    return vector1.x * vector2.x + vector1.y * vector2.y;\r\n}\r\n\r\nfunction smoothstep(x) {\r\n    const a = 6 * x - 15;\r\n    const b = x * a + 10;\r\n    return x ** 3 * b;\r\n}\r\n\r\nfunction interpolate(x, a, b) {\r\n    return a + smoothstep(x) * (b - a);\r\n}\r\n\r\nfunction perlin(x, y) {\r\n    const x0 = floor(x);\r\n    const y0 = floor(y);\r\n\r\n    const x1 = x0 + 1;\r\n    const y1 = y0 + 1;\r\n\r\n    const offsets = [\r\n        {x: x - x0, y: y - y0},\r\n        {x: x - x1, y: y - y0},\r\n        {x: x - x0, y: y - y1},\r\n        {x: x - x1, y: y - y1}\r\n    ];\r\n\r\n    const dots = [\r\n        dotProduct(offsets[0], randGrad(x0, y0)),\r\n        dotProduct(offsets[1], randGrad(x1, y0)),\r\n        dotProduct(offsets[2], randGrad(x0, y1)),\r\n        dotProduct(offsets[3], randGrad(x1, y1))\r\n    ];\r\n\r\n    const p1 = interpolate(x - x0, dots[0], dots[1]);\r\n    const p2 = interpolate(x - x0, dots[2], dots[3]);\r\n\r\n    return (1 + interpolate(y - y0, p1, p2)) / 2;\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (perlin);\n\n//# sourceURL=webpack://ant-farm/./src/lib/perlin.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;