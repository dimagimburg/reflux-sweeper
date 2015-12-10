module.exports = function(grunt) {

    grunt.initConfig({
        eslint: {
            target: ["www/app/src/**/*.js"]
        },

        concat: {
            infrastracture: {
                src: [
                    'www/app/assets/jquery/jquery.min.js',
                    'www/app/assets/underscore/underscore.min.js',
                    'www/app/assets/react/react.min.js',
                    'www/app/assets/react/react-with-addons.min.js',
                    'www/app/assets/react-dom/react-dom.min.js',
                    'www/app/assets/immutable/immutable.min.js',
                    'www/app/assets/reflux/reflux.min.js',
                    'www/app/assets/globals/globals.js',
                    'www/app/assets/classnames/index.js'
                ],
                dest: "www/public/assets/infrastructure.js"
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'www/app/src',
                    src: ["**/*.js"],
                    dest: "www/app/es6-build"
                }]
            }
        },
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                }
            },
            "transform": ["babelify"],
            app: {
                files: {
                    'www/public/assets/app.js': 'www/app/es6-build/App.js'
                }
            }
        },

        watch: {
            infrastructure: {
                files: ["www/app/assets/**/*.js"],
                tasks: ["concat"]
            },

            app: {
                files: ["www/app/src/**/*.js"],
                tasks: ["eslint","babel","browserify"]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['concat','watch']);
};