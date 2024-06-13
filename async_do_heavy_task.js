const doHeavyTask = require('./too_heavy_task').default;

async function asyncDoHeavyTask() {
	return doHeavyTask();
}

exports.default = asyncDoHeavyTask;