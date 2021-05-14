module.exports = class dep {
    constructor() {
        this.subscriber = [];
    }

    depend(target) {
        if( target && !this.subscriber.includes(target)){
            this.subscriber.push(target);
        }
    }

    notify() {
        this.subscriber.forEach(fn => fn());
    }
};