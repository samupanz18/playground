import EventEmitter from 'EventEmitter';
import Dispatcher from './Dispatcher';

let tally = {
    count: 0
};

const increment = () => {
    tally.count += 1;
};

const decrement = () => {
    tally.count -= 1;
};

const zero = () => {
    tally.count = 0;
};

class TallyStore extends EventEmitter {
    get tally() {
        return Object.assign({}, tally);
    }
    addChangeListener(callback) {
        this.addListener('CHANGE', callback);
    }
    removeChangeListener(callback) {
        this.removeListener('CHANGE', callback);
    }
    emitChange() {
        this.emit('CHANGE');
    }
}

const handleAction = (action) => {
    switch(action.type) {
        case 'INCREMENT':
            increment();
            break;
        case 'DECREMENT':
            decrement();
            break;
        case 'ZERO':
            zero();
            break;
        default:
    }
    instance.emitChange();
}

Dispatcher.register(handleAction);

const instance = new TallyStore();
export default instance;
