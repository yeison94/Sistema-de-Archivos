var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    connect = require('gulp-connect'),
    nib = require('nib'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    livereload = require('gulp-livereload'),
    historyApiFallback = require('connect-history-api-fallback');

//Servidor web
gulp.task('server', function(){
	connect.server({
		root : './app',
		hostname : '0.0.0.0',
		port : 8095,
		livereload : true,
		middleware :function(connect, opt){
			return  [ historyApiFallback() ];
		}
	})
})

//Busca errores en el JS y los muestra
gulp.task('jshint', function(){
	return gulp.src('./app/scripts/**/*.js')
	.pipe(jshint('.jshint'))
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
});

//Recargar el navegador cuando hay cambios en HTML
gulp.task('html', function(){
	gulp.src('./app/**/*.html')
	.pipe(connect.reload());
});

//Vigila cambios en el codigo y lanza tareas relacionadas
gulp.task('watch', function(){
	gulp.watch(['./app/**/*.html'], ['html']);
	gulp.watch(['./app/scripts/**/*.js' , './Gulpfile.js'], ['jshint']);
});

gulp.task('default' , ['server' , 'watch']);
