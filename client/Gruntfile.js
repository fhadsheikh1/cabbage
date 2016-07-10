module.exports = function(grunt){

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            dist: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload:true,
                    base: 'dist',
                    middleware: function(connect){
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic(path.dist)
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

        compass: {
            dev: {
                options: {
                    sassDir: 'app/common/styles',
                    cssDir: 'app/common/styles'
                }
            }
        },

        wiredep: {
            dist: {
                src: ['index.html']
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
                tasks: ['compass:dev'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Dev - Serve bower_component files with connect
    var serveStatic = require('serve-static');
    // Dev - Mod rewrite for pretty URLs
    var modRewrite = require('connect-modrewrite');

    grunt.registerTask('dev', [
        'wiredep',
        'compass',
        'connect:dev',
        'watch'
    ])

    grunt.registerTask('build', [
        'wiredep',
        'connect:dist',
        'watch'
    ])

}