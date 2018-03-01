var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');
var rename = require('gulp-rename');
var svgSprite = require('gulp-svg-sprite');
var gcmq = require('gulp-group-css-media-queries');
var processors = [
    autoprefixer({
        browsers: ['last 10 version']
    })
];


gulp.task('css', function () {
    return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/assets/vendor'))
        .pipe(gulp.dest('docs/assets'))
        .pipe(browserSync.stream())
});

gulp.task('sass', function () {
    return gulp.src('src/assets/sass/*.sass')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss(processors))
        .pipe(gcmq())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('docs/assets'))
        .pipe(browserSync.stream())
});

gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('src/assets/js'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest("src/assets/vendor"));
});

gulp.task('fa', function () {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest("src/assets/vendor"));
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('docs'))
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./docs"
        }
    });
});

var reload = function (done) {
    browserSync.reload();
    done();
}

gulp.task('vendor:css', function () {
    return gulp.src('src/assets/vendor/**.css')
        .pipe(gulp.dest('docs/assets'));
});

gulp.task('vendor:js', function () {
    return gulp.src('dist/app.bundle.js')
        .pipe(gulp.dest('docs/assets'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', gulp.series('html', reload));
    gulp.watch('src/assets/sass/*.sass', gulp.series('sass'));
});

gulp.task('copy', function () {
    return gulp.src([
        'src/**/*.{jpg,png,jpeg,gif,ttf,otf}'
    ])
        .pipe(gulp.dest('docs'))
});

gulp.task('clean', function () {
    return del('docs');
});

gulp.task('build', gulp.parallel('sass', 'css', 'html', 'fonts', 'fa', 'vendor:css', 'vendor:js', 'js', 'copy'));
gulp.task('start', gulp.parallel('watch', 'serve'));

gulp.task('default', gulp.series('clean', 'build', 'start'));





// var gulp = require('gulp');
// // var pug = require('gulp-pug');
// var postcss = require('gulp-postcss');
// var autoprefixer = require('autoprefixer');
// var browserSync = require('browser-sync').create();
// var del = require('del');
// var sass = require('gulp-sass');
// var gcmq = require('gulp-group-css-media-queries');
// var svgSprite = require('gulp-svg-sprite');
// var processors = [
//     autoprefixer({
//         browsers: ['last 2 version']
//     })
// ];
// // var yaml = require('gulp-yaml');
// // var concat = require('gulp-concat');

// const ignorePug = [
//     '!src/layouts/**',
//     '!src/blocks/**',
//     '!src/globals/**'
// ];

// // gulp.task('yaml', function(){
// // return gulp.src('src/**/*.yml')
// // 	.pipe(yaml())
// // 	.pipe(gulp.dest('build/assets'))
// // })

// // Basic configuration example
// var config = {
//     mode: {
//         symbol: true // Activate the «symbol» mode
//     }
// };

// gulp.task('sprites', function () {
//     return gulp.src('src/assets/svg/*.svg')
//         .pipe(svgSprite(config))
//         .pipe(gulp.dest('build/assets/svg'));
// });

// // gulp.task('html', function () {
// //     return gulp.src(['src/**/*.pug', ...ignorePug])
// //         .pipe(pug())
// //         .pipe(gulp.dest('build'))
// // });

// // gulp.task('js', function () {
// //     return gulp.src('src/**/**/*.js')
// //         .pipe(concat('main.js'))
// //         .pipe(gulp.dest('build/assets'));
// // });

// gulp.task('sass', function () {
//     return gulp.src('src/assets/**/*.sass')
//         .pipe(sass())
//         .pipe(postcss(processors))
//         .pipe(gcmq())
//         .pipe(gulp.dest('build/assets'))
//         .pipe(browserSync.stream())
// });


// gulp.task('serve', function () {
//     browserSync.init({
//         server: {
//             baseDir: "./build"
//         }
//     });
// });

// var reload = function (done) {
//     browserSync.reload();
//     done();
// }

// gulp.task('watch', function () {
//     gulp.watch('src/**/*.pug', gulp.series('html', reload));
//     gulp.watch('src/**/*.sass', gulp.series('sass'));
//     gulp.watch('src/**/*.js', gulp.series('js', reload));
// });

// gulp.task('copy', function () {
//     return gulp.src([
//             'src/assets/**/*.{jpg,png,jpeg,gif}'
//         ])
//         .pipe(gulp.dest('build/assets'))
// });

// gulp.task('clean', function () {
//     return del('build');
// });

// // gulp.task('build', gulp.parallel('html', 'sass', 'sprites', 'js', 'copy'));
// gulp.task('build', gulp.parallel('sass', 'sprites', 'js', 'copy'));
// gulp.task('start', gulp.parallel('watch', 'serve'));

// gulp.task('default', gulp.series('clean', 'build', 'start'));



// const gulp = require('gulp');
// const browserSync = require('browser-sync').create();
// const sass = require('gulp-sass');
// const imagemin = require('gulp-imagemin');
// const del = require('del');
// const usemin = require('gulp-usemin');
// const rev = require('gulp-rev');
// const cssnano = require('gulp-cssnano');

// // Compile Sass & Inject Into Browser
// gulp.task('sass', function () {
//     return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', './app/src/scss/*.scss'])
//         .pipe(sass())
//         .on('error', function (errorInfo) {
//             console.log(errorInfo.toString());
//             this.emit('end');
//         })
//         .pipe(gulp.dest('./app/src/css'))
//         .pipe(browserSync.stream());
// });

// // Move JS Files to src/js  
// gulp.task('js', function () {
//     return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
//         .pipe(gulp.dest('./app/src/js'))
//         .pipe(browserSync.stream());
// });

// // Watch Sass & Server
// gulp.task('serve', ['sass'], function () {
//     browserSync.init({
//         server: "./app"
//     });
//     gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', './app/src/scss/*.scss'], ['sass']);
//     gulp.watch("./app/src/*.html").on('change', browserSync.reload);
// });

// // Move Fonts Folder to src
// gulp.task('fonts', function () {
//     return gulp.src('node_modules/font-awesome/fonts/*')
//         .pipe(gulp.dest("./app/src/fonts"));
// });

// // Move Font Awesome CSS to src/css
// gulp.task('fa', function () {
//     return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
//         .pipe(gulp.dest("./app/src/css"));
// });

// gulp.task('default', ['js', 'serve', 'fa', 'fonts']);


// gulp.task('previewDocs', function () {
//     browserSync.init({
//         notify: false,
//         server: {
//             baseDir: "docs"
//         }
//     });
// });

// gulp.task('deleteDocsFolder', function () {
//     return del("./docs");
// });

// gulp.task('copyGeneralFiles', ['deleteDocsFolder'], function () {
//     var pathsToCopy = [
//         './app/src/**/*',
//         '!./app/src/img',
//         '!./app/src/img/**',
//         '!./app/src/css',
//         '!./app/src/css/**',
//         '!./app/src/scss',
//         '!./app/src/scss/**'
//     ]
//     return gulp.src(pathsToCopy)
//         .pipe(gulp.dest("./docs/src"));
// });

// gulp.task('optimizeImages', ['deleteDocsFolder'], function () {
//     return gulp.src('./app/src/img/**/*')
//         .pipe(imagemin({
//             progressive: true,
//             interlaced: true,
//             multipass: true
//         }))
//         .pipe(gulp.dest("./docs/src/img"));
// });

// gulp.task('useminTrigger', ['deleteDocsFolder'], function () {
//     gulp.start("usemin");
// });

// gulp.task('usemin', ['sass'], function () {
//     return gulp.src("./app/*.html")
//         .pipe(usemin({
//             css: [function () {
//                 return rev()
//             }, function () {
//                 return cssnano()
//             }]
//         }))
//         .pipe(gulp.dest("./docs"));
// });

// gulp.task('build', ['deleteDocsFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);