import numpy as np
VALUES = [
    22.27, 22.19, 22.08, 22.17, 22.18, 22.13,
    22.23, 22.43, 22.24, 22.29, 22.15, 22.39,
    22.38, 22.61, 23.36, 24.05, 23.75, 23.83,
    23.95, 23.63, 23.82, 23.87, 23.65, 23.19,
    23.10, 23.33, 22.68, 23.10, 22.40, 22.17
]
PERIOD = 8

def moving_average(x, n):
    weights = np.exp(np.linspace(-1., 0., n))
    weights /= weights.sum()
    a =  np.convolve(x, weights, mode='full')[:len(x)]
    #a[:n] = a[n]
    return a

quad = []
for el in moving_average(VALUES, PERIOD):
    quad.append(el)
    if len(quad) > 3:
        print str(quad[0]) + ', ' + str(quad[1]) + ', ' + str(quad[2]) + ', ' + str(quad[3]) + ','
        quad = []
