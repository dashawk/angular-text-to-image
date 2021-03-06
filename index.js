var serve = require('serve');
var keypress = require('keypress');
var port = process.env.PORT || 5000;

var server = serve(__dirname, {
	port: port,
	ignore: ['node_modules']
});

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
	if (key && key.ctrl && key.name === 'c') {
		process.stdin.pause();
		server.stop();
		console.log('Exiting...');
		process.exitCode = 0;
	}
});
process.stdin.on('exit', function () {
	process.exitCode = 0;
});

process.stdin.setRawMode(true);
process.stdin.resume();
