

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    
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
        // indent: 2,
        undef: true,
        unused: 'vars',
        // camelcase: true
      },
      all: ['js/*.js', 'js/**/*.js']
    }
  });

  grunt.registerTask('build', 'Performs some stuff.', [
    'autoprefixer'
  ]);
}