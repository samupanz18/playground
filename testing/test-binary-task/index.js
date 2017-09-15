import {
    CountdownTask,
} from './BinaryTask';

class MyCountdownTask extends CountdownTask {
    onStart() {
        console.log('Start countdown');
        this.showCurrentNumber();
    }

    onExecute() {
        return Promise.resolve(super.onExecute())
            .then(() => {
                if (this.currentNumber === 5) {                
                    return this.killMe().then(() => true);
                } else {
                    this.showCurrentNumber();
                }
            });
    }

    // onExecute() {
    //     return Promise.resolve(super.onExecute())
    //         .then(() => {
    //             this.showCurrentNumber();
    //         });
    // }

    // onComplete() {
    //     console.log('Countdown is complete');
    //     this.reset();
    //     this.run();
    // }

    showCurrentNumber() {
        this.currentNumber > 0 && console.log(this.currentNumber);
    }

    onKill() {
        console.log(`Killed at ${this.currentNumber}`);
        this.reset();
        this.run();
    }
}

const task = new MyCountdownTask(10, 0);
// task.timeSuspended = 5000;

task.run();
