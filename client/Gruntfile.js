module.exports = function(grunt){

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            dist: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload:true,
                    base: '.tmp',
                    middleware: function(connect){
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic('.tmp')
                        ];
                    }
                }
            },
            dev: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload:true,
                    base: '../client',
                    middleware: function(connect){
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic('../client')
                        ];
                    }
                }
            }
        },

         clean: {
            dist: {
                src: ['.tmp']
            }
        },

        sass: {
            dev: {
                    src: ['app/common/styles/main.scss'],
                    dest: 'app/common/styles/main.css'
            }
        },

        wiredep: {
            dist: {
                src: ['index.html']
            }
        },

        useminPrepare: {
            html: 'index.html',
            options: {
                dest: '.tmp'
            }
        },

        ngtemplates: {
            dist:    {
                cwd: 'app',
                src: '**/*.html',
                dest: '.tmp/template.js',
                options: {
                    module: 'cabbage',
                    usemin: 'scripts/scripts.js'
                }
            }
        },

        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        src: 'index.html',
                        dest: '.tmp/index.html'
                    },
                    {
                        cwd: 'app/',
                        expand: true,
                        flatten:true,
                        filter: 'isFile',
                        src: ['**/*.png','**/*.gif'],
                        dest: '.tmp/images'
                    }
                ]
            }
        },

        filerev: {
            dist: {
                src: [
                   '.tmp/scripts/*.js',
                    '.tmp/styles/*.css'
                ]
            }
        },

        usemin: {
            html: ['.tmp/index.html'],
            css: ['.tmp/styles/main.css']
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '.tmp/index.html' : '.tmp/index.html'
                }
            }
        },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            files: {
                files: ['index.html'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['app/**/*.*.js'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['app/**/*.*.html'],
                options: {
                    livereload: true
                }
            },
            scss: {
                files: ['app/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-filerev');

    // Dev - Serve bower_component files with connect
    var serveStatic = require('serve-static');
    // Dev - Mod rewrite for pretty URLs
    var modRewrite = require('connect-modrewrite');

    grunt.registerTask('dev', [
        'wiredep',
        'sass',
        'connect:dev',
        'watch'
    ])

    grunt.registerTask('build', [
        'clean',
        'wiredep',
        'useminPrepare',
        'sass',
        'ngtemplates',
        'concat',
        'copy',
        'cssmin',
        'ngAnnotate',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'connect:dist',
        'watch'
    ])

}