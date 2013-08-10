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

        events: {
          "click #log-in-with-facebook": "logFB",
          "click #log-in": "log",
          "click #sign-up": "goTosignUp"
        },
        initialize: function(){
          this.loading = new LoadingView();
          this.loading.render();
        },
        logFB: function () {
          Parse.FacebookUtils.logIn(null, {
            success: function (user) {
              if (!user.existed()) {
                console.log("User signed up and logged in through Facebook!");
              } else {
                console.log("User logged in through Facebook!");
              }
            },
            error: function (user, error) {
              console.log("User cancelled the Facebook login or did not fully authorize.");
            }
          });
        },
        log: function () {
          $("#overlay-loading").fadeIn();
          var self = this;
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
              $("#overlay-loading").fadeOut();
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