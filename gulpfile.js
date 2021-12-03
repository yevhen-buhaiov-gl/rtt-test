const { resolve } = require('path');
const { src, dest, task, series } = require('gulp');
const del = require('del');
const replace = require('gulp-replace');

const BUILD_PATH = resolve(__dirname, 'build');

const platformFilesPath = {
    webos: {
        APP_PATH: resolve(__dirname, 'platform_builds/webOS_build'), // webOS Temporary folders
        PROJECT_BUNDLE_PATH: resolve(__dirname, 'platform_bundles/webOS_bundle'), // webOS project files folder
    },
    tizen: {
        APP_PATH: resolve(__dirname, 'platform_builds/tizen_build'), // Tizen Temporary folders
        PROJECT_BUNDLE_PATH: resolve(__dirname, 'platform_bundles/tizen_bundle'), // Tizen project files folder
    },
};

exports.clean = () => {
    return del([
        // Clean gulp generated files
        APP_PATH,
    ]).then();
};

const createPlatformBuild = (platform) =>
    del(platformFilesPath[platform].APP_PATH).then(() => {
        src([
            `${platformFilesPath[platform].PROJECT_BUNDLE_PATH}/**/*`, // Copy all files
            `${platformFilesPath[platform].PROJECT_BUNDLE_PATH}/**/.*`, // Copy all hidden files
            `${platformFilesPath[platform].PROJECT_BUNDLE_PATH}/.**/*`, // Copy all files in all hidden dirs
            `${platformFilesPath[platform].PROJECT_BUNDLE_PATH}/.**/.*`, // Copy all hidden files in all hidden dirs
        ]).pipe(dest(platformFilesPath[platform].APP_PATH));
        // copy dist and project bundle to the new dir
    });

const copyBuildFiles = () =>
    src([
        `${BUILD_PATH}/**/*`,
        `${BUILD_PATH}/**/.*`,
        `${BUILD_PATH}/.**/*`,
        `${BUILD_PATH}/.**/.*`,
    ]).pipe(dest(platformFilesPath.tizen.APP_PATH));

// Prepare Lightning Dist folder for deploy
const DIST_PATH = resolve(__dirname, `dist/${process.env.ES}/js`);

const cleanJSFiles = () => {
    return del([
        // Clean gulp generated files
        DIST_PATH,
    ]).then();
};

const deleteDistFolder = () => {
    return del([
        // Clean gulp generated files
        'dist',
    ]).then();
};

const copyJSFiles = () =>
    src([
        `${DIST_PATH}/**/*`,
        `${DIST_PATH}/**/.*`,
        `${DIST_PATH}/.**/*`,
        `${DIST_PATH}/.**/.*`,
    ]).pipe(dest(resolve(__dirname, `dist/${process.env.ES}/static/js`)));

const changeHTML = () =>
    src(resolve(__dirname, `dist/${process.env.ES}/index.html`))
        .pipe(replace('./js/', './static/js/'))
        .pipe(dest(resolve(__dirname, `dist/${process.env.ES}`)));

task('copyJSFiles', copyJSFiles);
task('cleanJSFiles', cleanJSFiles);
task('changeHTML', changeHTML);
task('tizen', () => createPlatformBuild('tizen'));
task('webos', () => createPlatformBuild('webos'));
task('copyBuild', copyBuildFiles);
task('deleteDistFolder', deleteDistFolder);
task('build', series('copyJSFiles', 'cleanJSFiles', 'changeHTML'));
