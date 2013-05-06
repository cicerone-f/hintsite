require.config({
  paths: {
    domReady: '../lib/require/domReady',
    jquery: '../lib/jquery/jquery-1.9.1.min',
    underscore: '../lib/underscore/underscore-min',
    backbone: '../lib/backbone/backbone',
    text: '../lib/require/text-1.0.6',
    async: '../lib/require/async',
    handlebars: '../lib/handlebars/handlebars',
    templates: '../templates'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  }
});

// We launch the App
require(['domReady', 'underscore', 'backbone', 'router'],
    function (domReady, _, Backbone, AppRouter) {

    domReady(function () {
      document.addEventListener("deviceready", run, false);
    });

    function run() {
      new AppRouter();
      Backbone.history.start();
    }
  });
