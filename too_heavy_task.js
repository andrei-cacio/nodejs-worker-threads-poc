function doHeavyTask() {
	const t0 = performance.now();

	
	for (let i = 0; i <= 1_000_000; i++) {
		for (let j = 0; j <= 1_00; j++) {
			
		}
	}
	const t1 = performance.now();

	return `computation took took ${t1 - t0} milliseconds.`;
}

exports.default = doHeavyTask;