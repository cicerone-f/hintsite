/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/log-in.html"
],
    function ($, _, Backbone, Parse, Handlebars, template) {

    var LogIn_VM = Parse.View.extend({

        events: {
          "click #log-in-with-facebook": "logFB",
          "click #log-in": "log"
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

            // http://3.bp.blogspot.com/-0DW3KxNLmHM/TgJW3NVyOqI/AAAAAAAAC6s/-LflYmE3AZY/s1600/pig%2Bin%2Bmud.JPG


            error: function (user, error) {
              
              // ZOZZERIA!!! 

              var user = new Parse.User();
              user.set("username", username);
              user.set("password", password); 

              var userACL = new Parse.ACL(Parse.User.current());
              userACL.setPublicReadAccess(true);
              user.setACL(userACL);

              user.signUp(null, {
                success: function(user) {
                  Parse.history.navigate("mainMatchList", {trigger: true});
                },
                error: function(user, error) {
                  alert("Error: " + error.code + " " + error.message);
                }
              });

              // FINE ZOZZERIA

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