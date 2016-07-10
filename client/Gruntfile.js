module.exports = function(grunt){

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        wiredep: {
            dist: {
                src: ['app/index.html']
            }
        }

    });

    grunt.loadNpmTasks('grunt-wiredep');

    grunt.registerTask('dev', [
        'wiredep'
    ])

    grunt.registerTask('build', [
        'wiredep'
    ])

}