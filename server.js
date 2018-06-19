const express = require('express');
const path = require('path');
const chalk = require('chalk');
const app = express();
const indexFile = path.join(__dirname, 'static/index.html');

app.get('/', (req, res) => res.sendFile(indexFile));

app.use(express.static('static'));

function error404Handler(err, req, res, next) {
	console.log('error404Handler');
	console.log(err.stack);
	console.log(JSON.stringify(err));
	next(err);
}

function logger(req, res, next) {
	const before = new Date();
	next();
	const elapsed = new Date() - before;
	let status;
	console.log(chalk.white(req.path), chalk.green(res.statusCode), chalk.cyan(`${elapsed}ms`));
}

function redirect(req, res, next) {
	if (req.path.match(/\/user-management\/.*/)) {
		res.sendFile(indexFile);
	} else if (req.path.match(/\/accounts\/.*\/campaigns/)) {
		res.sendFile(indexFile);
	} else {
		next();
	}
}

function ap_middleware(req, res, next) {
	if (req.path.match(/\/ap-authentication\/.*/)) {
		res.sendFile(path.join(__dirname, 'ap-authentication', path.basename(req.path)));
	} else {
		next();
	}
}

function api(req, res, next) {
	if (req.path.match(/^\/api\/?$/)) {
		console.log('returning api.json');
		res.sendFile(path.join(__dirname, 'api.json'));
		res.append('Access-Control-Allow-Origin', '*');
	} else {
		next();
	}
}

function op2_menu(req, res, next) {
	if (req.path.match(/^\/op2-menu/)) {
		console.log('returning op2-menu contents');
		res.append('Access-Control-Allow-Origin', '*')
			.append('Access-Control-Allow-Headers', '*')
			.append('Access-Control-Allow-Methods', '*')
			.json({
				"abc": [{"abc": "ABC"}],
				"_links": {
					"rel1": {
						"href": "",
						"rel": "rel1"
					},
					"rel2": {
						"href": "",
						"rel": "rel2"
					}
				}
			});
	} else {
		next();
	}
}

function header_middleware(req, res, next) {
	res.append('Access-Control-Allow-Origin', '*');
	res.append('Access-Control-Allow-Headers', '*');
	res.append('Access-Control-Allow-Methods', '*');
	next();
}

function accounts(req, res, next) {
	if (req.path.match(/\/api\/accounts\/.*/)) {
		res.json({});
	} else {
		next ();
	}
}

app.use(logger);
app.use(redirect);
app.use(error404Handler);
app.use(ap_middleware);
app.use(api);
app.use(op2_menu);
app.use(header_middleware);
app.use(accounts);

app.listen(5050, () => console.log('debug server listening on port 5050!'));
