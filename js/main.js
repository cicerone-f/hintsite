require.config({
  waitSeconds: 60,
  paths: {
    domReady: '../lib/require/domReady',
    jquery: '../lib/jquery/jquery-1.9.1.min',
    underscore: '../lib/underscore/underscore-min',
    backbone: '../lib/backbone/backbone',
    Parse: '../lib/parse/parse-1.2.3',
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
    'Parse': {
      exports: 'Parse'
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  }
});

// We launch the App
require(['domReady', 'underscore', 'backbone', 'Parse', 'router'],
    function (domReady, _, Backbone, Parse, AppRouter) {

    domReady(function () {
      document.addEventListener("deviceready", run, false);
    });

    function run() {
      Parse.initialize( 'LkaGTOk7RGUaPXM0r9HQImwPAnmqUuhjF1QttcNE' , 'uxXxR7sEt2unuSABRyjF8tnd52bNymwlDuchsIhh' );
      new AppRouter();
      Parse.history.start();
    }
  });
