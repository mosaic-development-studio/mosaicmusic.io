export const DESTINATION = {
    DIRECTORY: 'dist/',
    JAVASCRIPT: 'main.js',
    SCSS: {
        ABOVE_THE_FOLD: 'critical.css',
        BELOW_THE_FOLD: 'main.css'
    },
    VENDOR_CSS: 'vendor.css'
};

export const SOURCE = {
    CSS: 'client/**/*.css',
    HTML: 'client/index.html',
    JAVASCRIPT: 'client/js/index.js',
    SASS: {
        ABOVE_THE_FOLD: 'client/scss/critical.scss',
        BELOW_THE_FOLD: 'client/scss/main.scss'
    },
    STATIC: [
        'client/**/*.ico',
        'client/**/*.jpg',
        'client/**/*.png',
        'client/**/*.svg',
        'client/**/*.mp3',
        'client/**/*.txt'
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
    SASS: {
        ABOVE_THE_FOLD: 'scss.critical',
        BELOW_THE_FOLD: 'scss.main'
    },
    STATIC: 'static',
    WATCH: 'watch',
    WEBPACK: 'webpack'
};

export const WATCH_FILES = {
    JAVASCRIPT: 'client/**/*.js',
    SASS: 'client/**/*.scss'
};
