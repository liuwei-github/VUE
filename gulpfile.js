var gulp = require("gulp")
var uglify = require("gulp-uglify")
var minifycss = require("gulp-minify-css")
var minifyhtml = require("gulp-minify-html")

gulp.task("jsUglify",function(){
	gulp.src("js/*.js").
	pipe(uglify())
	.pipe(gulp.dest("VUE/js"))
})

gulp.task("cssMinify",function(){
	gulp.src("css/*.css")
	.pipe(minifycss())
	.pipe(gulp.dest("VUE/css"))
})

gulp.task("htmlMinify",function(){
	gulp.src("*.html")
	.pipe(minifyhtml())
	.pipe(gulp.dest("VUE"))
})

gulp.task("dealjson",function(){
	gulp.src("data/*.json")
	.pipe(gulp.dest("VUE/data"))
})

gulp.task("dealImg",function(){
	gulp.src("img/**/*.*")
	.pipe(gulp.dest("VUE/img"))
})

gulp.task("default",["jsUglify","cssMinify","htmlMinify","dealjson","dealImg"])