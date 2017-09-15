'use strict';

import _ from 'lodash';
import Promise from 'bluebird';

const NOOP = () => {};

const taskRunner = (() => {
    const executions = {};

    const runTask = task => {
        const execution = executions[task];

        if (execution) {
            return;
        }

        executions[task] = {
            timeoutId: null,
        };

        checkComplete(task, () => {
            Promise.resolve(task.onStart())
                .then(() => {
                    if (task.immediate) {
                        return task.onExecute();
                    }
                })
                .then(killed => {
                    !killed && checkCompleteLoop(task);
                });
        });
    };

    const checkComplete = (task, onProgress) => {
        const execution = executions[task];

        if (!execution) {
            return;
        }

        Promise.resolve(task.isComplete())
            .then(complete => {
                if (complete) {
                    removeExecution(task);
                    task.onComplete();
                } else {
                    onProgress();
                }
            });
    };

    const checkCompleteLoop = task => {
        checkComplete(task, () => {
            suspendTask(task)
                .then(() => {
                    checkComplete(task, () => {
                        Promise.resolve(task.onExecute())
                            .then(killed => {
                                !killed ? checkCompleteLoop(task) : task.onKill();
                            });
                    });
                });
        });
    }

    const suspendTask = task => Promise.fromCallback(cb => {
        const timeoutId = setTimeout(cb, task.timeSuspended);

        executions[task] = {
            timeoutId,
        };
    });

    const removeExecution = task => {
        const execution = executions[task];

        if (!execution) {
            return;
        }

        const {
            timeoutId,
        } = execution;

        if (!_.isNil(timeoutId)) {
            clearTimeout(timeoutId);
        }

        executions[task] = null;
    };

    const killTask = task => {
        const execution = executions[task];

        if (!execution) {
            return;
        }

        return Promise.resolve(task.isComplete())
            .then(complete => {
                if (!complete) {
                    removeExecution(task);
                }
            });
    };

    return {
        runTask,
        killTask,
    };
})();

/**
 * A binary task is either executing or being suspended.
 */
export default class Task {
    constructor() {
        this.name = 'Anonymous';
        this.timeSuspended = 1000;
        // Control whether to exeucte the task at once
        this.immediate = false;
    }

    get timeSuspended() {
        return this._timeSuspended;
    }

    set timeSuspended(timeSuspended) {
        this._timeSuspended = timeSuspended;
    }

    get immediate() {
        return this._immediate;
    }

    set immediate(immediate) {
        this._immediate = immediate;
    }

    onStart() {
        NOOP();
    }

    /**
     * Returns whether the task has been killed or not.
     */
    onExecute() {
        return false;
    }

    isComplete() {
        return true;
    }

    onComplete() {
        NOOP();
    }

    onKill() {
        NOOP();
    }

    run() {
        taskRunner.runTask(this);
    }

    killMe() {
        return taskRunner.killTask(this);
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

    onExecute() {
        this.currentNumber += this.step;

        return false;
    }

    isComplete() {
        return this.currentNumber === this.toNumber;
    }

    reset() {
        this.currentNumber = this.fromNumber;
    }
}
