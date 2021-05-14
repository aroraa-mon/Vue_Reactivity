const depClass = require('./dep');

let data = { num1: 10, num2: 20 };
let target = null;
let mul, total;

Object.keys(data).forEach(key => {
    let internalVal = data[key];
    const dep = new depClass();
    Object.defineProperty(data, key, {
        get() {
            dep.depend(target);
            // console.log(`Getting ${key}: ${internalVal}`);
            return internalVal;
        },
        set(newVal) {
            // console.log(`Setting ${key} to: ${newVal}`);
            internalVal = newVal;
            dep.notify();
        }
    });
});

function watcher(fn) {
    target = fn;
    target();
    target = null;
}

watcher(() => { total = data.num1 + data.num2 });
console.log('Initial Total ', total);

data.num1 = 20;
console.log('Total after changing num1 ', total);

watcher(() => { mul = 10 * data.num2 });
console.log('Initial mul ', mul);

data.num2 = 30;
console.log('Mul after changing num2 ', mul);