/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
/* *///###########################################################################################
//
//   This module contains all configuration for the build process
//
/* *///###########################################################################################
const ANGULAR_TAG = "~1.5.3";

const gulp = require('gulp');
require("shelljs/global");

gulp.task("publish", ['default'], function() {
    rm("-rf", "buildbot-data-js");
    exec("git clone git@github.com:buildbot/buildbot-data-js.git");
    const bower_json = {
        name: "buildbot-data",
        version: "2.2.7",
        main: ["buildbot-data.js"],
        moduleType: [],
        license: "MIT",
        ignore: [],
        description: "Buildbot middleware to access data api",
        dependencies: {}
    };
    cd("buildbot-data-js");
    exec("git reset --hard origin/master");
    rm("-rf", "dist");
    cp("-rf", "../dist", ".");
    cp("-rf", "../README.md", ".");
    JSON.stringify(bower_json, null, "  ").to("bower.json");
    exec("git add .");
    exec(`git commit -m ${bower_json.version}`);
    exec(`git tag ${bower_json.version}`);
    exec("git push origin master");
    return exec(`git push origin ${bower_json.version}`);
});


const config = {

    /* *///#######################################################################################
    //   Name of the module
    /* *///#######################################################################################
    name: 'bbData',
    is_library: true,

    /* *///#######################################################################################
    //   Directories
    /* *///#######################################################################################
    dir: {
        // The build folder is where the app resides once it's completely built
        build: 'dist'
    },

    sourcemaps: true,
    output_scripts: "buildbot-data.js",
    /* *///#######################################################################################
    //   Bower dependencies configuration
    /* *///#######################################################################################
    bower: {
        testdeps: {
            angular: {
                version: ANGULAR_TAG,
                files: 'angular.js'
            },
            'angular-mocks': {
                version: ANGULAR_TAG,
                files: 'angular-mocks.js'
            },
            'lodash': {
                version: '~3.10.0',
                files: 'lodash.js'
            }
        }
    },
    // as angular is a test deps, the tests need to be loaded first!
    karma: {
        files: [ "tests.js", "buildbot-data.js"]
    },

    ngclassify(config) {
        return {
            appName: config.name,
            provider: {
              suffix: 'Service'
          }
        };
    },

    buildtasks: ['scripts', 'vendors', 'tests']
};

module.exports = config;