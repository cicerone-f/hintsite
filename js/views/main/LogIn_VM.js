/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/log-in.html",
  "views/LoadingView",
],
    function ($, _, Backbone, Parse, Handlebars, template, LoadingView) {

    var LogIn_VM = Parse.View.extend({


        id: 'centopercento',

        events: {
          "click #log-in": "log",
          "click #sign-up": "goTosignUp",
          "focus #password": "min",
          "focus #username": "min",
          "blur #password": "max",
          "blur #username": "max"
        },
        initialize: function(){
          this.loading = new LoadingView();
          this.loading.render();
        },
        min: function(){
            $("#img-logo-l").css( "height", "10%" );
        },

        max: function(){
            $("#img-logo-l").css( "height", "30%" );
        },
        log: function () {
          this.max();
          $("#overlay-loading").fadeIn();
           var username = this.$("#username").val();
           var password = this.$("#password").val();
           console.log(username + " " + password);
           Parse.User.logIn(username, password, {
             success: function (user) {
               // When subscribing to a new channel, an Installation object is created
               // (if there are none already). By subscribing now (for the first time for
               // a new user), we ensure the Installation object has a proper userId attribute.
               ChannelSubscription.subscribeTo('logged-in', Parse.User.current().id, {
                 success: function () {
                   console.log('Device subscribed to "logged-in" channel.'); },
                 error: function (error) {
                   console.error('Error no. ' + error.code + ": " + error.message); },
               });
               Parse.history.navigate("mainMatchList", {trigger: true});
             },
             error: function (user, error) {
               console.error(error);
               $("#overlay-loading").fadeOut();
             }
           });
        },

        goTosignUp : function () {
          Parse.history.navigate("signup", {trigger: true});
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
          $(this.el).html(this.template());
          return this;
        },
      });

    return LogIn_VM;

  });