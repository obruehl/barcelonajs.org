'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var barcelonajsConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    barcelonajsConfig.app = require('./component.json').appPath || barcelonajsConfig.app;
  } catch (e) {}

  grunt.initConfig({
    barcelonajs: barcelonajsConfig,
    watch: {
      compass: {
        files: ['<%= barcelonajs.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '<%= barcelonajs.app %>/{,*/}*.html',
          '{.tmp,<%= barcelonajs.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= barcelonajs.app %>}/scripts/{,*/}*.js',
          '<%= barcelonajs.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
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
              mountFolder(connect, barcelonajsConfig.app)
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
            '<%= barcelonajs.dist %>/*',
            '!<%= barcelonajs.dist %>/.git*'
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
        '<%= barcelonajs.app %>/scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    compass: {
      options: {
        sassDir: '<%= barcelonajs.app %>/styles',
        cssDir: '.tmp/styles',
        imagesDir: '<%= barcelonajs.app %>/images',
        javascriptsDir: '<%= barcelonajs.app %>/scripts',
        fontsDir: '<%= barcelonajs.app %>/styles/fonts',
        importPath: '<%= barcelonajs.app %>/components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        files: {                         // Dictionary of files
          'main.css': 'main.scss',       // 'destination': 'source'
          'widgets.css': 'widgets.scss'
        }
      },
      dev: {                             // Another target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {
          'main.css': 'main.scss',
          'widgets.css': [
            'button.scss',
            'tab.scss',
            'debug.scss'  // Maybe you need one extra file in dev
          ]
        }
      }
    },
    concat: {
      dist: {
        files: {
          '<%= barcelonajs.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= barcelonajs.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= barcelonajs.app %>/index.html',
      options: {
        dest: '<%= barcelonajs.dist %>'
      }
    },
    usemin: {
      html: ['<%= barcelonajs.dist %>/{,*/}*.html'],
      css: ['<%= barcelonajs.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= barcelonajs.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= barcelonajs.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= barcelonajs.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= barcelonajs.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= barcelonajs.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/barcelonajs/grunt-usemin/issues/44
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
          cwd: '<%= barcelonajs.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= barcelonajs.dist %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= barcelonajs.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= barcelonajs.dist %>/scripts',
          src: '*.js',
          dest: '<%= barcelonajs.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= barcelonajs.dist %>/scripts/scripts.js': [
            '<%= barcelonajs.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= barcelonajs.dist %>/scripts/{,*/}*.js',
            '<%= barcelonajs.dist %>/styles/{,*/}*.css',
            '<%= barcelonajs.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= barcelonajs.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= barcelonajs.app %>',
          dest: '<%= barcelonajs.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*'
          ]
        }]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    'compass:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'compass',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    //'jshint',
    //'test',
    'compass:dist',
    'sass',
    //'useminPrepare',
    //'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'cdnify',
    'ngmin',
    'uglify',
    //'rev',
    'usemin'
  ]);

  grunt.registerTask('default', ['build']);
};
