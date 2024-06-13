const eventLoopSpinner = require('./event-spinner').default;

async function doHeavyTaskSpinned(config = {}) {
	const t0 = performance.now();

	
	for (let i = 0; i <= 1_000_000; i++) {
		for (let j = 0; j <= 1_00; j++) {
			if (eventLoopSpinner.isStarving()) {
				await eventLoopSpinner.spin();
			}
		}
	}
	const t1 = performance.now();

	return `computation took took ${t1 - t0} milliseconds.`;
}


exports.default = doHeavyTaskSpinned;