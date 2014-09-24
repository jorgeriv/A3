'use strict';

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        boss: true,
        eqeqeq: true,
        curly: true,
        browser: true,
        latedef: true,
        eqnull: true,
        expr: true,
        globalstrict: true,
        immed: true,
        laxbreak: true,
        loopfunc: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        quotmark: true,
        smarttabs: true,
        sub: true,
        trailing: true,
        undef: true,
        unused: true,
        globals: {
          angular: false,
          d3: false
          }
        },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      libTest: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      app: {
        files: {
          'lib/a3.js': ['lib/a3.js']
        }
      }
    },
    karma: {
      unit: {
        options: {
          files: ['test/**/*.js']
        },
        background: true,
        singleRun: false
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      libTest: {
        files: '<%= jshint.libTest.src %>',
        tasks: ['jshint:libTest', 'karma:unit:run']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-karma');

  // Default task.
  grunt.registerTask('default', ['jshint', 'karma', 'ngAnnotate', 'concat', 'uglify']);

};
