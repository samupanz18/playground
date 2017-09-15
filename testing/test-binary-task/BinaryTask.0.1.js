'use strict';

import _ from 'lodash';
import Promise from 'bluebird';

const NOOP = () => {};
const ERROR_TASK_IS_KILLED = new Error();

const taskRunner = (() => {
    const executions = {};

    const handleError = (task, error) => {
        if (error === ERROR_TASK_IS_KILLED) {
            task.onKill();
        } else {
            console.error(error);
        }
    };

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
                .then(() => {
                    checkCompleteLoop(task);
                })
                .catch(error => {
                    handleError(task, error);
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
            })
            .catch(error => {
                handleError(error);
            });
    };

    const checkCompleteLoop = task => {
        checkComplete(task, () => {
            suspendTask(task)
                .then(() => {
                    checkComplete(task, () => {
                        Promise.resolve(task.onExecute())
                            .then(() => {
                                checkCompleteLoop(task);
                            })
                            .catch(error => {
                                handleError(task, error);
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
                    
                    throw ERROR_TASK_IS_KILLED;
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

    onExecute() {
        NOOP();
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
    constructor(fromNumber, toNumber) {
        super();

        this.fromNumber = fromNumber;
        this.toNumber = toNumber;
        this.step = fromNumber >= toNumber ? -1 : 1;
        this.currentNumber = fromNumber;
    }

    onExecute() {
        this.currentNumber += this.step;
    }

    isComplete() {
        return this.currentNumber === this.toNumber;
    }

    reset() {
        this.currentNumber = this.fromNumber;
    }
}
