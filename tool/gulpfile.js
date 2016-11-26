/*
 * @project 我要做游戏
 * */
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var argv = require('yargs').argv;//cmd 参数
var gulpif = require('gulp-if');//逻辑判断
var concat = require('gulp-concat');//合并
var uglify = require('gulp-uglify');//js压缩
var replace = require('gulp-replace');//文本替换
var watch = require('gulp-watch');//文件监听 可以侦听到文件新增修改和删除
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var gulpSequence = require('gulp-sequence');
var cssmin = require('gulp-minify-css');

/*css压缩*/
gulp.task('cssmin', function () {
    return gulp.src('../dev/css/*.css')
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('../css/'));
});

function handleJS(input, output) {
    return gulp.src(input)//映射文件
        .pipe(concat(output))//合并文件
        .pipe(gulpif(argv.r, uglify()))//根据参数控制是否压缩代码
        .pipe(gulp.dest('../release/js/'));//生成目录
}

function handleWatch(src, tasks) {
    watch(src, function (files) {
        gulp.start(tasks);
    });
}
//js文件处理任务
gulp.task('home-js', function () {
    var homeJs = [
        '../dev/js/lib/jquery-3.0.0.min.js',
        '../dev/js/index.js'
    ];
    return handleJS(homeJs, 'index.min.js');
});

//images文件处理任务
gulp.task('images', function () {
    return gulp.src('../dev/images/*')//映射文件
        .pipe(gulp.dest('../release/images/'));//生成目录
});

gulp.task('imagemin', function () {
    return gulp.src('../dev/images/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        })))
        .pipe(gulp.dest('../release/images'));
});


//文件修改监听
gulp.task('gulp-sequence1',
    gulpSequence('imagemin'));

//images修改监听
gulp.task('wimages', function () {
    gulp.watch('../dev/images/*', function () {
        gulp.run('gulp-sequence1');
    });//监听js文件的所有css文件
});


//定义项目的默认任务
// gulp.task('default', ['watch', 'js', 'css']);

// gulp.task('listMin', ['watch', 'listJS']);

// gulp.task('detailMin', ['watch', 'detailJS']);

// gulp.task('jsMin', ['watch', 'message']);

// gulp.task('ptloginSkin', ['watch', 'ptlogin']);


//图片生成雪碧图
//spriterem合并图片
gulp.task('sprem',function(){
    gulp.src('../dev/images/spirit/*')
        .pipe(spritesmith({
            //间距
            padding : 4,
            //输出合并后图片的地址（相对于输出路径）
            imgName: '../dev/images/icon.png',
            //输出样式的地址（相对于输出路径）
            cssName: '../dev/scss/icon_rem.scss',
            //排列方式： binary-tree（默认），top-down，left-right，diagonal，alt-diagonal
            algorithm: 'binary-tree',
            //sass格式输出
            cssFormat: 'scss',
            //模板文件（相对于gulpfile的位置）
            cssTemplate: 'scss.handlebars'
        }))
        .pipe( gulp.dest('../dev/'));
});
