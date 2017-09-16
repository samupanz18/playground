import Promise from 'bluebird';
import {
    CountdownTask,
} from './BinaryTask';

class MyCountdownTask extends CountdownTask {
    onStart(done) {
        console.log('Start countdown');
        this.showCurrentNumber();
        done();
    }

    onWork(done) {
        this.invokeCallback(done => {
            super.onWork(done);
        })
            .then(() => {
                if (this.currentNumber === 5) {
                    this.interrupt();
                } else {
                    this.showCurrentNumber();
                }
            })
            .then(() => {
                done();
            });
    }

    // onWork(done) {
    //     this.invokeCallback(done => {
    //         super.onWork(done);
    //     })
    //         .then(() => {
    //             this.showCurrentNumber();
    //             done();
    //         })
    // }

    onComplete() {
        console.log('Countdown is complete');
        // this.reset();
        // this.run();
    }

    showCurrentNumber() {
        this.currentNumber > 0 && console.log(this.currentNumber);
    }

    onInterrupted() {
        console.log(`Interrupted at ${this.currentNumber}`);
        this.reset();
        this.run();
    }
}

const task = new MyCountdownTask(10, 0);
// task.timeSuspended = 5000;

const task2 = new MyCountdownTask(20, 10);

task.run();
// task2.run();
