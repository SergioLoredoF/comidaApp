import  { src, dest, watch, series } from 'gulp';

//CSS y SASS
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';
const sass = gulpSass(dartSass);

const { init, write } = sourcemaps;

//IMG
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import avif from 'gulp-avif';

function css( done ) {
    src( 'src/scss/app.scss', { encoding: false } )
        .pipe( init() )
        .pipe( sass() )
        .pipe( postcss( [ autoprefixer(), cssnano() ] ) )
        .pipe( write('.'))
        .pipe( dest( 'build/css' ) )

    done();
}

function imagenes() {
    return src( 'src/img/**/*', { encoding: false } )
            .pipe( imagemin() )
            .pipe( dest( 'build/img' ) );
}

function versionWebp() {
    const opciones = {quality : 50};
    return src( 'src/img/**/*.{png,jpg}', { encoding: false } )
            .pipe( webp( opciones ) )
            .pipe( dest( 'build/img' ) );
}

function versionAvif() {
    const opciones = {quality : 50};
    return src( 'src/img/**/*.{png,jpg}', { encoding: false } )
            .pipe( avif( opciones ) )
            .pipe( dest( 'build/img' ) );
}

function dev() {
    watch( 'src/scss/**/*.scss', css ); // busca todos los archivos con .scss y dentro de scss encuentra todo pa
    watch( 'src/img/**/*', imagenes );
    watch( 'src/img/**/*', versionWebp );
}

export { css, dev, imagenes, versionWebp, versionAvif }

export default series( imagenes, versionWebp, versionAvif, css, dev );
//Series va ejecutando en serie
//Parallel las ejecuta todas a la vez
//npm i --save-dev autoprefixer gulp gulp-postcss gulp-sass postcss sass gulp-imagemin gulp-webp gulp-avif gulp-sourcemaps cssnano
/*
    "browserslist": [
    "last 1 version",
    "> 1%"
  ]
*/