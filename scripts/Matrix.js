function Matrix(width = 3, height = 3, fill = 0) {
    this.elements = new Array(width * height).fill(fill);

    this.width = width;
    this.height = height;

    this.length = width * height;
}

Matrix.isMatrix = obj => obj instanceof Matrix;

Matrix.prototype = {
    constructor: Matrix,
    resize(width = 3, height = 3) {
        this.width = width;
        this.height = height;
        this.length = width * height;

        this.elements = new Array(width * height).fill(0);
    },
    value(x, y, value = undefined) {
        const index = x + y * this.height;

        if (index > this.length || index < 0) return undefined;

        this.elements[index] = value !== undefined ? value : this.elements[index];

        return this.elements[index];
    },
    filter(x, y, fn = value => value) {
        const index = x + y * this.height;

        if (index > this.length || index < 0) return undefined;

        this.elements[index] = fn(this.elements[index]);

        return this.elements[index];
    },
    from(array) {
        if (!Array.isArray(array)) return undefined;

        if (array.length !== this.length) return undefined;

        array.forEach( (value, index) => this.elements[index] = (value || 0));
    },
    copy(matrix) {
        if (!Matrix.isMatrix(matrix)) return undefined;

        this.width = matrix.width;
        this.height = matrix.height;
        this.length = matrix.length;

        this.elements = new Array(matrix.length);

        matrix.forEach( (value, index) => this.elements[index] = value);

        return this;
    },
    clear(value = 0) {
        this.elements = new Array(this.width * this.height).fill(null);
    },
    compare(matrix, compFn = (a, b) => a === b) {
        if (!Matrix.isMatrix(matrix) && !Array.isArray(matrix)) return false;

        if (matrix.length !== this.length) return false;

        for (let i=0; i<this.length; i++) {
            if (!compFn(matrix[i], this.elements[i])) return false;
        }

        return true;
    },
    apply(change = 0, fn = (value, change) => value + change) {
        if (Matrix.isMatrix(change) || Array.isArray(change)) {
            if (change.length !== this.length) return undefined;

            change.forEach( (value, index) => {
                this.elements[index] = fn(this.elements[index], value);
            });
        } else {
            if (change === undefined) return change;

            this.forEach( (value, index) => {
                this.elements[index] = fn(value, change);
            });
        }

        return this;
    },
    check(value, compFn = (a, b) => a === b) {
        for (let elem of this.elements) {
            if (compFn(value, elem)) return true;
        }

        return false;
    },
    forEach(fn) {
        this.elements.forEach((value, index, array) => {
            fn(value, index, array);
        });
    },
    forCell(fn) {
        this.elements.forEach((value, index, array) => {
            fn(value, index % this.width, Math.floor(index / this.height), array);
        });
    },
    forRow(fn) {
        for (let i=0; i<this.height; i++) {
            let index = this.width * i;

            fn(this.elements.slice(index, index + this.width), i, this.elements);
        }
    },
    forCol(fn) {
        for (let i=0; i<this.width; i++) {
            let column = [];

            for (let j=0; j<this.height; j++) {
                column.push(this.elements[i + j * this.width]);
            }

            fn(column, i, this.elements);
        }
    }
};