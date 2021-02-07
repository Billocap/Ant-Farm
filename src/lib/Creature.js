function Creature(color, dna = {v: 5, e: 10, a: Math.PI, b: 6, s:5}, x = 0, y = 0) {
    this.x = x;
    this.y = y;

    this.v = Math.max(dna.v, 3);
    this.e = dna.e;
    this.a = Math.min(Math.max(dna.a, 0), Math.PI);
    this.b = Math.max(dna.b, 5);
    this.s = Math.max(dna.s, 4);

    this.bite = 0.1 + (this.s - 5);

    this.dir = 0;
    
    this.color = color;
}

Creature.prototype = {
    move(death, rfn) {
        this.x = Math.max(Math.min(this.x + Math.cos(this.dir) * this.v , 500 - this.v), this.v);
        this.y = Math.max(Math.min(this.y + Math.sin(this.dir) * this.v , 500 - this.v), this.v);

        this.dir += (-1 + Math.random() * 2) * this.a;

        this.e -= 0.000032 * ((this.v * this.v * this.s * this.s) / 2);

        if (this.e <= 0) death();

        if (this.e > this.b) {
            rfn();

            this.e -= this.b - 1;
        }
    },
    mutate(v, a, b, s) {
        return new Creature(this.color, {
            v: this.v + (-1 + Math.random() * 2) * v,
            e: this.b - 1,
            a: this.a + (-1 + Math.random() * 2) * a,
            b: this.b + (-1 + Math.random() * 2) * b,
            s: this.s + (-1 + Math.random() * 2) * s
        }, this.x, this.y);
    },
    draw(context) {
        context.fillStyle = `rgb(${(this.v / 10) * 255}, ${(this.a / Math.PI) * 255}, ${(this.s / 5) * 255})`;
        context.beginPath();
        context.arc(this.x, this.y, this.s / 2, 0, Math.PI * 2);
        context.fill();
    }
}

export default Creature;