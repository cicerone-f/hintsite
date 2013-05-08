define(["jquery", "underscore", "backbone", "Parse", "handlebars", "text!templates/log-in.html"],
    function ($, _, Backbone, Parse, Handlebars, template) {

    var LogInView = Parse.View.extend({

        events: {
          "touchend #log-in-with-facebook": "logFB",
          "touchend #log-in": "log"
        },

        logFB: function () {

        },
        
        log: function () {
        	var self = this;
      		var username = this.$("#username").val();
      		var password = this.$("#password").val();
      		console.log(username +" "+password);
      		Parse.User.logIn(username, password, {
        		success: function(user) {
            	Parse.history.navigate("matchList" , {trigger: true});
        		},
        	  error: function(user, error) {
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

    return LogInView;

  });