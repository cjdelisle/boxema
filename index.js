'use strict';
const Linspace = require('linspace');

const mkMultipliers = (period) => {
    const vec = Linspace(-1.0, 0.0, period).map(Math.exp);
    let sum = 0;
    vec.forEach((x) => (sum += x));
    return vec.map((x) => (x / sum));
};

const create = module.exports.create = (period) => {
    const multiplers = mkMultipliers(period);
    const box = new Array(period).fill(0);
    let i = 0;
    let last = 0;
    return {
        update: (val) => {
            const idx = i++ % period;
            box[idx] = val;
            let out = 0;
            for (let j = idx, k = 0; k < period; j = (j || period) - 1, k++) {
                out += box[j] * multiplers[k];
            }
            return last = out;
        },
        get: () => (last)
    }
};
