/*jslint undef: true*/
/*global define*/

require.config({
  paths: {
    domReady: '../lib/require/domReady',
    jquery: '../lib/jquery/jquery-1.9.1.min',
    underscore: '../lib/underscore/underscore-min',
    Backbone: '../lib/backbone/backbone',
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
    ChannelSubscription: '../channel-subscription/ChannelSubscription',
    backstack: '../lib/backstack/backstack-min'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'Backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'backstack' : {
      deps:['Backbone', 'underscore', 'jquery'],
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
  'backstack',
  'Parse',
  'CDV',
  'FB'
],
    function (domReady, _, backstack, Parse, CDV, FB) {

    domReady(function () {
      document.addEventListener("deviceready", run, false);
    });

    function run() {
      Parse.initialize('LkaGTOk7RGUaPXM0r9HQImwPAnmqUuhjF1QttcNE', 'uxXxR7sEt2unuSABRyjF8tnd52bNymwlDuchsIhh');
      /*Parse.FacebookUtils.init({
        appId      : '639802702700436', // Facebook App ID
        channelUrl : '//www.hintsiteapp.com/channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow Parse to access the session
        xfbml      : true  // parse XFBML
      });*/

      new AppRouter();     // JSLint says "do not use 'new' for side effects"
      Parse.history.start();
      Parse.history.length = 0;
      Parse.history.on('route', function () { ++this.length; });

      // FB.init({
      //   appId: '639802702700436',
      //   nativeInterface: CDV.FB,
      //   useCachedDialogs: false
      // });
      
      // FB.getLoginStatus(function () { alert('OK'); });


      // var query = new Parse.Query(Parse.Installation);
      // query.equalTo('userId', 'hbE8n4iwq4');

      // Parse.Push.send({
      //   where: query,
      //   data: {
      //     alert: 'bu'
      //   }
      // }, {
      //   success: function () {
      //     console.log('Funzionato!');
      //   },
      //   error: function (error) {
      //     console.error('A manetta: ' + error.message);
      //   }
      // });
      // console.log('notification sent from main.js');

    }
  });
