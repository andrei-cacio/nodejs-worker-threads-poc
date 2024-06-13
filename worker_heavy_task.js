const { parentPort } = require("worker_threads");
const doHeavyTask = require('./too_heavy_task').default;


const result = doHeavyTask();

parentPort.postMessage(result);