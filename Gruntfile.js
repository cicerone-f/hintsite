module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({

    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['js/*.js', 'js/**/*.js'],
        tasks: ['jshint'],
      },
      sass: {
        files: ['scss/*.scss'],
        tasks: ['sass']
      },
      autoprefixer: {
        files: ['css/*.css'],
        tasks: ['autoprefixer']
      }
    },


    // standalone tasks
    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '0.0.0.0',
          middleware: function (connect) {
            return [
              require('connect-livereload')(),
              connect.static(require('path').resolve('.'))
            ];
          }
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.server.options.port %>'
      }
    },

    autoprefixer: {
      options: {
        browser: ['last 5 version']
      },
      files: {
        expand: true,
        cwd: 'css/',
        src: '*.css',
        dest: 'css/'
      }
    },

    jshint: {
      options: {
        es5: true,
        undef: true,
        unused: 'vars',
      },
      all: ['js/*.js', 'js/**/*.js']
    },

    sass: {
      compile: {
        options: {
          lineNumbers: true,
        },
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    }

  });


  // grunt.registerTask()s
  grunt.registerTask('build', 'Performs some stuff.', [
    'sass',
    'autoprefixer',
    'jshint'
  ]);

  grunt.registerTask('server', [
    'sass',
    'autoprefixer',
    'jshint',
    'connect',
    'open',
    'watch'
  ]);
}
