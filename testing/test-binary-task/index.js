import {
    CountdownTask,
} from './BinaryTask';

class MyCountdownTask extends CountdownTask {
    onStart() {
        console.log('Start countdown');
        this.showCurrentNumber();
    }

    // onWork() {
    //     return Promise.resolve(super.onWork())
    //         .then(() => {
    //             if (this.currentNumber === 5) {                
    //                 this.interrupt();
    //             } else {
    //                 this.showCurrentNumber();
    //             }
    //         });
    // }

    onWork() {
        return Promise.resolve(super.onWork())
            .then(() => {
                this.showCurrentNumber();
            });
    }

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
task2.run();
