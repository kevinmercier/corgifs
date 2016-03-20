// Load plugins
var gulp     = require('gulp'),
	plugins  = require('gulp-load-plugins')({ camelize: true }),
	lr       = require('tiny-lr'),
	server   = lr(),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant')

// Styles
gulp.task('styles', function() {
	return gulp.src('app/assets/src/scss/*.scss')
		.pipe(plugins.sass({
			includePaths: require('node-bourbon').includePaths
		}))
		.pipe(plugins.autoprefixer('last 2 versions', 'ie 9', 'ios 6', 'android 4'))
		.pipe(gulp.dest('app/assets/src/css'))
		.pipe(gulp.dest('app/assets/src/css'))
		.pipe(plugins.minifyCss({ keepSpecialComments: 1 }))
		.pipe(plugins.livereload(server))
		.pipe(gulp.dest('app/assets/compiled/css'))
		.pipe(plugins.notify({ message: 'Styles Task Complete' }));
		gulp.src('app/assets/src/css', {read: false})
			.pipe(plugins.clean());
});


// Images
gulp.task('compress_images', function () {
	gulp.src('app/assets/compiled/images/*', {read: false})
		.pipe(plugins.clean());
	gulp.src('app/assets/src/images/**/nc_*')
		.pipe(gulp.dest('app/assets/compiled/images/'))
		.pipe(plugins.notify({ message: 'Image Compression Complete' }));
	gulp.src(['app/assets/src/images/**/*', '!app/assets/src/images/**/nc_*'])
		.pipe(imagemin({
        	progressive: true,
        	svgoPlugins: [{removeViewBox: false}],
        	use: [pngquant()]
		}))
    	.pipe(gulp.dest('app/assets/compiled/images/'));
});

// SVGs
gulp.task('svgstore', function () {
	var svgs = gulp
		.src('app/assets/src/svg/*.svg')
		.pipe(plugins.svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: 'icon-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(plugins.svgstore({ inlineSvg: true }));
    function fileContents (filePath, file) {
        return file.contents.toString();
    }
    gulp.src('index.html')
        .pipe(plugins.inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest(''))
		.pipe(plugins.notify({ message: 'SVG Integration Complete' }));
});

// Watch
gulp.task('watch', function() {
	server.listen(35729, function (err) {
		if(err) {
			return console.log(err)
		};
		gulp.watch('app/assets/src/scss/**/*.scss', ['styles']);
		gulp.watch('app/assets/src/images/*', ['compress_images']);
		gulp.watch(['app/assets/src/svg/**/*', 'index.html'], ['svgstore']);
	});
});

// Default task
gulp.task('default', ['styles', 'svgstore', 'compress_images', 'watch']);
