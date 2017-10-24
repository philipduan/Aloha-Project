var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');

gulp.task('JS', function () {
    // place code for your default task here
    return gulp.src('./src/script/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
        .pipe(gulp.dest('dist/js'));

});


gulp.task('CSS', function () {
    return gulp.src('./src/style/*.css')
        .pipe(concat('style.css'))
        .pipe(cleanCSS({compatibility: '*'},))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('dist/css'));
});


gulp.task('watch', function () {
    gulp.watch('./src/style/*.css', ['CSS', 'reload']);
    gulp.watch('./src/script/*.js', ['JS', 'reload']);
    gulp.watch('./index.html', ['reload']);
});

gulp.task('reload', function () {
    browserSync.reload();
});

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['./src/script/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['watch', 'browser-sync']);