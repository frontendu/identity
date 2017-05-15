const gulp = require('gulp');
const sharp = require('gulp-sharp');
const rename = require('gulp-rename');
const minimist = require('minimist');

gulp.task('logo', () => {
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

	return gulp.src(`./src/logo.svg`)
		.pipe(sharp({
			resize: [width, height],
			withoutEnlargement: false,
			output
		}))
		.pipe(rename(`logo${width}x${height}.${output}`))
		.pipe(gulp.dest(`./dist`));
});

gulp.task('build', ['logo']);
gulp.task('default', ['build']);
