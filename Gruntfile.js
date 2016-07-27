module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js'/*, 'src/js/**'*/]
        },
        watch: {
            scripts: {
                files: ['src/js/**'],
                tasks: ['build:scripts'],
                options: {
                    spawn: false
                }
            },
            styles: {
                files: ['src/scss/**'],
                tasks: ['build:styles'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['src/*.html', 'src/**/*.html'],
                tasks: ['build:html'],
                options: {
                    spawn: false
                }
            },
            img: {
                files: ['src/img/**'],
                tasks: ['build:img'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*.html', '**/*.html'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/scss/',
                    src: ['*.scss'],
                    dest: 'dist/css/',
                    ext: '.css'
                }]
            }
        },
        open: {
            dev: {
                path: 'http://127.0.0.1:9981/',
                app: 'Google Chrome'
            },
        },
        connect: {
            server: {
                options: {
                    port: 9981,
                    hostname: '*',
                    base: 'dist/'
                }
            }
        },
        imagemin: {
            light: {
                options: {
                    optimizationLevel: 1
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['img/*.{png,jpg,gif,svg}', 'img/**/*.{png,jpg,gif,svg}'],
                    dest: 'dist/'
                }]
            },
            hard: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'dist/img/',
                    src: ['*.{png,jpg,gif,svg}', '**/*.{png,jpg,gif,svg}'],
                    dest: 'dist/img/'
                }]
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-react', 'babel-preset-es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: ['**.js', '**/*.js'],
                    dest: 'tmp/js/'
                }]
            }
        },
        browserify: {
            dist: {
                files: {
                    'dist/js/app.js': 'tmp/js/app.js'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-open');
    
    grunt.registerTask('build', ['build:scripts', 'build:styles', 'build:html', 'build:img']);
    grunt.registerTask('build:scripts', ['jshint', 'babel', 'browserify']);
    grunt.registerTask('build:styles', ['sass']);
    grunt.registerTask('build:html', ['copy:html']);
    grunt.registerTask('build:img', ['imagemin:light']);
    grunt.registerTask('default', ['build', 'connect', 'open', 'watch']);
    
    grunt.registerTask('deploy', ['build', 'build:deploy']);
    grunt.registerTask('build:deploy', ['imagemin:hard']);
};
