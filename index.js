const express = require('express');
const { Worker } = require("worker_threads");

const asyncDoHeavyTask = require('./async_do_heavy_task').default;
const spinnedDoHeavyTask = require('./spinned_heavy_task').default;

const app = express()
const port = 3000

function startThreadWithTTL(timeoutCallback) {
	const worker = new Worker('./worker_heavy_task.js');

	const timeout = setTimeout(() => {
		worker.terminate();
		console.info('killing thread taking too much time');
		timeoutCallback();
	}, 5000);

	const workerFinishedWithGreatSuccess = () => clearTimeout(timeout);

	return [worker, workerFinishedWithGreatSuccess];
}


app.get('/async', async (req, res) => {
	console.info('[responding async]')
	asyncDoHeavyTask().then(result => {
		res.status(200).send(result);
	}, (err) => {
		res.status(500).send(err);
	});

})

app.get('/spin', async (req, res) => {
	console.info('[responding spinned]')
	const result = await spinnedDoHeavyTask();

	res.status(200).send(result);
})

app.get('/threaded', async (req, res) => {
	console.info('[responding threaded]')
	const [worker, workerFinishedWithGreatSuccess] = startThreadWithTTL(() => {
		res.status(408).send();
	});


	worker.on("message", (data) => {
		workerFinishedWithGreatSuccess();

	  res.status(200).send(`result is ${data}`);
	});
	
	worker.on("error", (msg) => {
	  res.status(404).send(`An error occurred: ${msg}`);
	});
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
