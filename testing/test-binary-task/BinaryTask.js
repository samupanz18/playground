'use strict';

import _ from 'lodash';
import Promise from 'bluebird';

const NOOP = () => {};

let taskId = 0;

const generateTaskId = () => ++taskId;

const taskRunner = (() => {
    // A task execution is a sequence of work and wait
    const executions = {};

    const runTask = task => {
        const execution = executions[task.id];

        if (execution) {
            return;
        }

        executions[task.id] = {
            // records the id of the latest wait in the exeuction
            waitId: null, 
            
            interrupted: false,
        };

        propelTask(task, () => {
            Promise.fromCallback(cb => {
                task.onStart(cb);
            })
                .then(() => {
                    if (task.immediate) {
                        return Promise.fromCallback(cb => {
                            task.onWork(cb);
                        });
                    }
                })
                .then(() => {
                    runTaskCycle(task);
                });
        });
    };

    const propelTask = (task, onProgress = NOOP) => {
        const execution = executions[task.id];

        if (!execution) {
            return;
        }

        if (execution.interrupted) {
            task.onInterrupted();
            return;
        }

        Promise.resolve(task.isComplete())
            .then(complete => {
                complete ? task.onComplete() : onProgress();
            });
    };

    // A task cycle is a wait followed by a work
    const runTaskCycle = task => {
        propelTask(task, () => {
            makeTaskWait(task)
                .then(() => {
                    propelTask(task, () => {
                        Promise.fromCallback(cb => {
                            task.onWork(cb);
                        })
                            .then(() => {
                                runTaskCycle(task);
                            });
                    });
                });
        });
    }

    const makeTaskWait = task => Promise.fromCallback(cb => {
        executions[task.id].waitId = setTimeout(cb, task.waitTime);
    })
        .then(() => {
            executions[task.id].waitId = null;
        });

    const interruptTask = task => {
        const execution = executions[task.id];

        if (!execution || execution.interrupted) {
            return;
        }

        execution.interrupted = true;

        const {
            waitId,
        } = execution;

        if (!_.isNil(waitId)) {
            clearTimeout(waitId);
            executions[task.id].waitId = null;
            propelTask(task);
        }
    };

    const resetTask = task => {
        executions[task.id] = null;
    }

    return {
        runTask,
        interruptTask,
        resetTask,
    };
})();

/**
 * A binary task is either executing or being suspended.
 */
export default class Task {
    constructor() {
        this.id = generateTaskId();
        this.name = 'Anonymous';
        this.waitTime = 1000;
        // Control whether to make the task work at once
        this.immediate = false;
    }

    get waitTime() {
        return this._waitTime;
    }

    set waitTime(waitTime) {
        this._waitTime = waitTime;
    }

    get immediate() {
        return this._immediate;
    }

    set immediate(immediate) {
        this._immediate = immediate;
    }

    onStart(done) {
        done();
    }

    onWork(done) {
        done();
    }

    isComplete() {
        return true;
    }

    onComplete() {
        NOOP();
    }

    onInterrupted() {
        NOOP();
    }

    run() {
        taskRunner.runTask(this);
    }

    interrupt() {
        taskRunner.interruptTask(this);
    }

    reset() {
        taskRunner.resetTask(this);
    }
}

export class CountdownTask extends Task {
    constructor(fromNumber = 10, toNumber = 0) {
        super();

        this.name = 'Countdown';
        this.fromNumber = fromNumber;
        this.toNumber = toNumber;
        this.step = fromNumber >= toNumber ? -1 : 1;
        this.currentNumber = fromNumber;
    }

    onWork(done) {
        this.currentNumber += this.step;
        done();
    }

    isComplete() {
        return this.currentNumber === this.toNumber;
    }

    reset() {
        super.reset();

        this.currentNumber = this.fromNumber;
    }
}
