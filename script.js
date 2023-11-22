const _C = document.getElementById('c') /* canvas element */,
C = _C.getContext('2d') /* 2D canvas context */,
D = _C.width /* edge length of canvas square */,
N = 2 /* number of grid rows/ columns */,
L = D / N /* edge length of grid cell */,
RC = .25 * D / N /* circumradius of polygon */,
THEME = ['#e4a22f', '#cc1e4d', '#9a2388', '#6d62a7'],
NT = THEME.length,
POLY = [] /* array of polygons */,
FN = ['line', 'move'];

let step = 1 / 360,prg = 0;

class Poly {
  constructor(i, j) {
    /* position of current random polygon */
    this.x = (j + .5) * L; /* along x axis */
    this.y = (i + .5) * L; /* along y axis */

    /* shape of current random polygon */
    this.n = 3 + N * i + j; /* number of polygon vertices edges */
    this.β = 2 * Math.PI / this.n; /* base angle corresponding to an edge */
    this.α = .5 * (Math.PI - (1 - this.n % 2) * this.β); /* angular offset of 1st angle */
    this.ri = RC * Math.cos(.5 * this.β);
    this.vx = [];

    for (let k = 0; k < this.n; k++) {
      let γ = this.α + k * this.β;

      this.vx.push([RC * Math.cos(γ), RC * Math.sin(γ)]);
    }

    /* look and feel of current polygon */
    this.b = (this.n - 3) % NT;
  }}

function draw() {
  C.fillStyle = 'hsla(0, 0%, 13%, .08)';
  C.fillRect(0, 0, D, D);

  POLY.forEach(p => {
    prg += step;
    if (prg > 1) prg = 0;

    C.fillStyle = THEME[p.b];
    C.translate(p.x, p.y);
    C.rotate(prg * 2 * Math.PI);
    C.translate(0, .5 * p.ri);
    C.rotate(-4 * prg * Math.PI);
    C.beginPath();
    p.vx.forEach((coord, k) => C[`${FN[0 ** k]}To`](...coord));
    C.fill();
    C.resetTransform();
  });

  requestAnimationFrame(draw);
};

function init() {
  for (let i = 0; i < N; i++)
  for (let j = 0; j < N; j++)
  POLY.push(new Poly(i, j));

  draw();
};

init();