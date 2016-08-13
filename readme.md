# Box filter based Exponential Moving Average
This EMA is designed to be identical to the EMA given in http://matplotlib.org/examples/pylab_examples/finance_work2.html
however it is rolling (can be updated at any time). Because it is a rolling EMA, beware that the
first *n* results will be different from the python example. This is because the python example uses
result *n* + 1 for all results 0-*n* and since this algorithm is rolling, that is not possible.
Discard the first *n* results and all following result will be the same.

To use:

```javascript
const Ema = require('boxema');

// Create an EMA with period 8
const ema8 = Ema.create(8);

[1,3,5,7,9].forEach((x) => {
    console.log("EMA is now " + ema8.update(x));
});

console.log("it can also be used as a list converter:");
console.log([2,4,6,8].map(ema8));

console.log("you can get the last result using ema.get()");
console.log(ema8.get());
```


The python code on which this is based is as follows, note the commented line which is not possible
with a rolling EMA.

```python
def moving_average(x, n):
    weights = np.exp(np.linspace(-1., 0., n))
    weights /= weights.sum()
    a =  np.convolve(x, weights, mode='full')[:len(x)]
    #a[:n] = a[n]  ## This is not possible with a rolling EMA so it is removed.
    return a
```
