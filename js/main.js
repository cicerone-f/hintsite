/*jslint undef: true*/
/*global define*/

require.config({
  paths: {
    domReady: '../lib/require/domReady',
    jquery: '../lib/jquery/jquery-1.9.1.min',
    underscore: '../lib/underscore/underscore-min',
    backbone: '../lib/backbone/backbone',
    Parse: '../lib/parse/parse-1.2.3',
    text: '../lib/require/text-1.0.6',
    async: '../lib/require/async',
    handlebars: '../lib/handlebars/handlebars',
    templates: '../templates',
    facebook: '../lib/facebook/all'
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
    'facebook' : {
      exports: 'FB'
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  }
});

// We launch the App
require([
  'domReady',
  'underscore',
  'backbone',
  'Parse',
  'facebook',
  'router'
],
    function (domReady, _, Backbone, Parse, FB, AppRouter) {

    domReady(function () {
      document.addEventListener("deviceready", run, false);
    });

    function run() {
      Parse.initialize('LkaGTOk7RGUaPXM0r9HQImwPAnmqUuhjF1QttcNE', 'uxXxR7sEt2unuSABRyjF8tnd52bNymwlDuchsIhh');
      Parse.FacebookUtils.init({
        appId      : '639802702700436', // Facebook App ID
        channelUrl : '//www.hintsiteapp.com/channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow Parse to access the session
        xfbml      : true  // parse XFBML
      });

      new AppRouter();          // JSLint says "do not use 'new' for side effects"
      Parse.history.start();

    }
  });
