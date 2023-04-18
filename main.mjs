import {
	execSync
} from 'node:child_process';
import express from 'express';
import clc from 'cli-color';
import LocalIP from './utils/getLocalIP.mjs';

const app = express();

app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	const {
		url,
		method
	} = request;
	next();
})

app.use(express.static('public'));

app.get('/command', (request, response) => {
	console.log(request.query);
	const {
		cmd
	} = request.query;
	try {
		let result = execSync(cmd);
		response.send(result);
	} catch (err) {
		if (err) console.log(err);
	}
})

app.listen(8000, err => {
	if (err) console.log(err);
	console.log('\n');
	console.log(clc.yellow("服务器已经启动..."));
	console.log(clc.blueBright.underline("http://localhost:8000/"));
	console.log(clc.blueBright.underline("http://127.0.0.1:8000/"));
	console.log(clc.blueBright.underline(`http://${LocalIP}:8000/`));
	console.log('\n');
})
