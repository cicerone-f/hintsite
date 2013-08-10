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
    moment: '../lib/moment/moment.min',
    hammer: '../lib/hammer/jquery.hammer.min',
    ChannelSubscription: '../channel-subscription/ChannelSubscription',
    BackStack: '../lib/backstack/backstack-min'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'Backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'BackStack' : {
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
  'BackStack',
  'Parse',
  'views/main/LogIn_VM',
  'views/main/ElencoPartite_VM'
],
    function (
      domReady, 
      _,
      BackStack, 
      Parse, 
      LogIn_VM,
      ElencoPartite_VM
    ) {

    domReady(function () {
      document.addEventListener("deviceready", run, false);
    });

    function run() {
      Parse.initialize('LkaGTOk7RGUaPXM0r9HQImwPAnmqUuhjF1QttcNE', 'uxXxR7sEt2unuSABRyjF8tnd52bNymwlDuchsIhh');

      if (Parse.User.current()) {
        var ElencoPartiteView = new ElencoPartite_VM();
        stacknavigator = new BackStack.StackNavigator({el:'#miocontainer'});
        var NoEffect = new BackStack.NoEffect();
        stacknavigator.pushView(ElencoPartiteView,null,NoEffect);
      } else {
        var LogInView = new LogIn_VM();
        stacknavigator = new BackStack.StackNavigator({el:'#miocontainer'});
        var NoEffect = new BackStack.NoEffect();
        stacknavigator.pushView(LogInView,null,NoEffect);
      }

      /*Parse.FacebookUtils.init({
        appId      : '639802702700436', // Facebook App ID
        channelUrl : '//www.hintsiteapp.com/channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow Parse to access the session
        xfbml      : true  // parse XFBML
      });*/


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
