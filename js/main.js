/*jslint undef: true*/

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
    leaflet: '../lib/leaflet/leaflet',
    CDV: '../lib/facebook/cdv-plugin-fb-connect',
    FB: '../lib/facebook/facebook_js_sdk',
    moment: '../lib/moment/moment.min',
    hammer: '../lib/hammer/jquery.hammer.min',
    ChannelSubscription: '../channel-subscription/ChannelSubscription'
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
    },
    'CDV': {
      exports: 'CDV'
    },
    'FB': {
      exports: 'FB'
    }
  }
});

// We launch the App
require([
  'domReady',
  'underscore',
  'backbone',
  'Parse',
  'router',
  'CDV',
  'FB'
],
    function (domReady, _, Backbone, Parse, AppRouter, CDV, FB) {

    domReady(function () {
      document.addEventListener("deviceready", run, false);
    });

    function run() {

      // kind of a hack, if there's no network connection start the router
      // without initializing Parse
      // the first router function which will be called will check again for 
      // network connection and handle
      var state = navigator.connection.type;
      if (state == Connection.UNKNOWN || state == Connection.NONE) {
        new AppRouter();
        Parse.history.start();
        return;
      }

      Parse.initialize('LkaGTOk7RGUaPXM0r9HQImwPAnmqUuhjF1QttcNE', 'uxXxR7sEt2unuSABRyjF8tnd52bNymwlDuchsIhh');

      new AppRouter();
      Parse.history.start();
      Parse.history.length = 0;
      Parse.history.on('route', function () { ++this.length; });
    }
  });
