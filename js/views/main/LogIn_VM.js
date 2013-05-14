/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/log-in.html"
],
    function ($, _, Backbone, Parse, Handlebars, template) {

    var LogIn_VM = Parse.View.extend({

        events: {
          "touchend #log-in-with-facebook": "logFB",
          "touchend #log-in": "log"
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
          var self = this;
          var username = this.$("#username").val();
          var password = this.$("#password").val();
          console.log(username + " " + password);
          Parse.User.logIn(username, password, {
            success: function (user) {
              Parse.history.navigate("mainMatchList", {trigger: true});
            },
            error: function (user, error) {
              console.log(error);
            }
          });
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
          $(this.el).html(this.template());
          return this;
        }
      });

    return LogIn_VM;

  });