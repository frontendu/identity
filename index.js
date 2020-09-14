const {readFileSync, mkdirSync} = require('fs');
const sharp = require('sharp');
const minimist = require('minimist');

const opts = minimist(process.argv.slice(2), {
	default: {
		'logo-size': '1024x1024',
		'logo-output': 'png'
	}
});

const output = opts['logo-output'];
const size = opts['logo-size'];

const [width, height] = size.split('x')
	.map((value) => Number.parseInt(value));

try {
	mkdirSync('dist');
} catch (e) {}

sharp(readFileSync('src/logo.svg'))
	.resize(width, height)
	.toFile(`dist/logo${width}x${height}.${output}`)