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
            last = 0;
            for (let j = idx, k = 0; k < period; k++) {
                last += box[j] * multiplers[k];
                j = (j || period) - 1;
            }
            return last;
        },
        get: () => (last)
    };
};
