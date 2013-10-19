/*jslint undef: true*/
/*global define*/

define(["jquery", "underscore", "backbone", "Parse", "handlebars", "text!templates/main/sign-up.html"], function($, _, Backbone, Parse, Handlebars, template) {

    var SignUp_VM = Parse.View.extend({
        id: 'centopercento',
        events: {
            "click #sign": "signUp",
            "click #back-sign": "back",
            "focus #password": "min",
            "focus #username": "min",
            "blur #password": "max",
            "blur #username": "max"
        },
        min: function(){
            $("#img-logo-l").css( "height", "10%" );
        },

        max: function(){
            $("#img-logo-l").css( "height", "30%" );
        },
        signUp: function() {

            var username = this.$("#username").val();
            var password = this.$("#password").val();
            var user = new Parse.User();
            user.set("username",username);
            user.set("password", password);
            user.set("points", 500);
            user.set("playedWith", 0);
            user.set("nMaster", 0);
            user.set("image", "http://www.hintsiteapp.com/public_images/[object Object]1375033969540.jpg");

            var userACL = new Parse.ACL(Parse.User.current());
            userACL.setPublicReadAccess(true);
            user.setACL(userACL);
            user.signUp(null, {
                success: function(user) {
                    Parse.history.navigate("mainMatchList", {
                        trigger: true
                    });
                },
                error: function(user, error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        },

        back: function(){
            Parse.history.navigate("", {
                        trigger: true
                    });
        },

        template: Handlebars.compile(template),

        render: function(eventName) {
            $(this.el).html(this.template());
            return this;
        }
    });

    return SignUp_VM;

});