'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var barcelonaJS = {
    app: 'app',
    dist: 'dist'
  };

  try {
    barcelonaJS.app = require('./bower.json').appPath || barcelonaJS.app;
  } catch (e) {}

  grunt.initConfig({
    bcnjs: barcelonaJS,
    watch: {
      options: {
        nospawn: true
      },
      compass: {
        files: ['<%= bcnjs.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= bcnjs.app %>/{,*/}*.html',
          '{.tmp,<%= bcnjs.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= bcnjs.app %>}/scripts/{,*/}*.js',
          '<%= bcnjs.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, barcelonaJS.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, barcelonaJS.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= bcnjs.dist %>/*',
            '!<%= bcnjs.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= bcnjs.app %>/scripts/{,*/}*.js'
      ]
    },
    compass: {
      options: {
        sassDir: '<%= bcnjs.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= bcnjs.app %>/images',
        javascriptsDir: '<%= bcnjs.app %>/scripts',
        fontsDir: '<%= bcnjs.app %>/styles/fonts',
        importPath: '<%= bcnjs.app %>/components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        relativeAssets: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            '<%= bcnjs.dist %>/scripts/{,*/}*.js',
            '<%= bcnjs.dist %>/styles/{,*/}*.css',
            '<%= bcnjs.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= bcnjs.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= bcnjs.app %>/index.html',
      options: {
        dest: '<%= bcnjs.dist %>'
      }
    },
    usemin: {
      html: ['<%= bcnjs.dist %>/{,*/}*.html'],
      css: ['<%= bcnjs.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= bcnjs.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= bcnjs.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= bcnjs.dist %>/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= bcnjs.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%= bcnjs.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/bcnjs/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= bcnjs.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= bcnjs.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= bcnjs.app %>',
          dest: '<%= bcnjs.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*',
            'CNAME',
            'BarcelonaJS.ics'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= bcnjs.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      }
    },
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'htmlmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    cdnify: {
      dist: {
        html: ['<%= bcnjs.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= bcnjs.dist %>/scripts',
          src: '*.js',
          dest: '<%= bcnjs.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= bcnjs.dist %>/scripts/scripts.js': [
            '<%= bcnjs.dist %>/scripts/scripts.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'copy',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
