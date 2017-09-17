'use strict';

import _ from 'lodash';
import Promise from 'bluebird';

const NOOP = () => {};

let taskId = 0;

const generateTaskId = () => ++taskId;

const taskRunner = (() => {
    // Records task running information
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
            invokeTaskCallback(done => {
                task.onStart(done);
            })
                .then(() => {
                    if (task.immediate) {
                        return invokeTaskCallback(done => {
                            task.onWork(done);
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
            removeTask(task);
            task.onInterrupted();

            return;
        }

        invokeTaskCallback(done => {
            task.onCheckComplete(done);
        })
            .then(complete => {
                if (complete) {
                    removeTask(task);
                    task.onComplete();
                } else {
                    onProgress();
                }
            });
    };

    // A task cycle is a wait followed by a work
    const runTaskCycle = task => {
        propelTask(task, () => {
            makeTaskWait(task)
                .then(() => {
                    propelTask(task, () => {
                        invokeTaskCallback(done => {
                            task.onWork(done);
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

    const removeTask = task => {
        executions[task.id] = null;
    }

    const isTaskRunning = task => !!executions[task];

    const invokeTaskCallback = taskCallback => Promise.fromCallback(cb => {
        const done = (...args) => {
            cb(null, ...args);
        };

        taskCallback(done);
    });

    return {
        runTask,
        interruptTask,
        isTaskRunning,
        invokeTaskCallback,
    };
})();

/**
 * A binary task starts and then it works and waits alternatively until it is complete.
 * It executes in two modes:
 * 1. Normal mode
 *                   works       works       works
 * starts then      |     |     |     |     |
 *             waits       waits       waits      ...completes
 * 2. Immediate mode
 *             works       works       works       works
 * starts then      |     |     |     |     |     |
 *                   waits       waits       waits      ...completes
 *
 */
export default class Task {
    constructor() {
        this._id = generateTaskId();
        this.name = 'Anonymous';
        this.waitTime = 1000;
        // Control whether to make the task work at once
        this.immediate = false;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        throw new Error('The id property is read only');
    }

    get waitTime() {
        return this._waitTime;
    }

    set waitTime(waitTime) {
        this.prohibitIfRunning();
        this._waitTime = waitTime;
    }

    get immediate() {
        return this._immediate;
    }

    set immediate(immediate) {
        this.prohibitIfRunning();
        this._immediate = immediate;
    }

    onStart(done) {
        done();
    }

    onWork(done) {
        done();
    }

    onCheckComplete(done) {
        done(true);
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

    isRunning() {
        return taskRunner.isTaskRunning(this);
    }

    invokeCallback(callback) {
        return taskRunner.invokeTaskCallback(callback);
    }

    prohibitIfRunning() {
        if (this.isRunning()) {
            throw new Error('The operation is prohibited when the task is running');
        }
    }
}

export class CountdownTask extends Task {
    constructor(fromNumber = 10, toNumber = 0, step = -1) {
        super();

        this.name = 'Countdown';
        this.fromNumber = fromNumber;
        this.toNumber = toNumber;
        this.step = step;
        this.currentNumber = fromNumber;
    }

    get fromNumber() {
        return this._fromNumber;
    }

    set fromNumber(fromNumber) {
        this.prohibitIfRunning();

        if (fromNumber <= this.toNumber) {
            throw new Error('The fromNumber must be greater than the toNumber');
        }

        this._fromNumber = fromNumber;
        this._currentNumber = fromNumber;
    }

    get toNumber() {
        return this._toNumber;
    }

    set toNumber(toNumber) {
        this.prohibitIfRunning();

        if (toNumber >= this.fromNumber) {
            throw new Error('The toNumber must be less than the fromNumber');
        }

        this._toNumber = toNumber;
    }

    get step() {
        return this._step;
    }

    set step(step) {
        this.prohibitIfRunning();

        if (step >= 0) {
            throw new Error('The step must be less than 0');
        }
        
        this._step = step;
    }

    get currentNumber() {
        return this._currentNumber;
    }

    set currentNumber(currentNumber) {
        throw new Error('The currentNumber is read only');
    }

    onWork(done) {
        this.currentNumber += this.step;
        done();
    }

    onCheckComplete(done) {
        const complete = this.currentNumber <= this.toNumber;

        done(complete);
    }

    reset() {
        this.prohibitIfRunning();
        this._currentNumber = this.fromNumber;
    }
}
