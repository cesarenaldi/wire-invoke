'use strict';

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

    grunt.initConfig({

        karma: {
            options: {
                configFile: 'karma.conf.js',
                runnerPort: 9999
            },
            continuous: {
                singleRun: true,
                browsers: ['PhantomJS']
            },
            dev: {
                reporters: 'dots'
            }
        }
    })

    grunt.registerTask('default', ['karma:continuous'])

};
