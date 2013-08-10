/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/log-in.html",
  'BackStack',
  "views/main/ElencoPartite_VM",
  "views/LoadingView"
],
    function ($, _, Backbone, Parse, Handlebars, template, BackStack , ElencoPartite_VM, LoadingView) {

    var LogIn_VM = Parse.View.extend({

        initialize: function (){
          this.loading = new LoadingView();
        },

        events: {
          "click #log-in-with-facebook": "logFB",
          "click #log-in": "log",
          "click #sign-up": "goTosignUp"
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
          var NoEffect = new BackStack.NoEffect();
          stacknavigator.pushView(this.loading, NoEffect);
          var self = this;
          var username = this.$("#username").val();
          var password = this.$("#password").val();
          console.log(username + " " + password);
          Parse.User.logIn(username, password, {
            success: function (user) {
              stacknavigator.popView(NoEffect);
              var page = new ElencoPartite_VM({});              
              stacknavigator.pushView(page);
            },
            error: function (user, error) {
              console.error(error);
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