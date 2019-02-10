export const DESTINATION = {
    CSS: 'main.css',
    DIRECTORY: 'dist/',
    JAVASCRIPT: 'main.js',
    VENDOR_CSS: 'vendor.css'
};

export const SOURCE = {
    CSS: 'client/**/*.css',
    HTML: 'client/*.html',
    JAVASCRIPT: 'client/js/index.js',
    SASS: 'client/sass/base.scss',
    STATIC: [
        'client/**/*.ico',
        'client/**/*.jpg',
        'client/**/*.png',
        'client/**/*.svg',
        'client/**/*.mp3'
    ],
    TEMPLATES: 'client/templates/*.html'
};

export const TARGET_BROWSERS = {
    browsers: [
        'last 2 major versions',
        'ie 11'
    ]
};

export const TASKS = {
    BUILD: 'build',
    CSS: 'css',
    DEFAULT: 'default',
    HTML: 'html',
    SASS: 'sass',
    STATIC: 'static',
    WATCH: 'watch',
    WEBPACK: 'webpack'
};

export const WATCH_FILES = {
    JAVASCRIPT: 'client/**/*.js',
    SASS: 'client/**/*.scss'
};
