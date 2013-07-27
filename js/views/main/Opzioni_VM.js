/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Hint",
  "text!templates/main/opzioni.html",
  "views/sub/Header_VS"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Hint,
    template,
    Header_VS
  ) {
    var Opzioni_VM = Parse.View.extend({
      id: 'container',
        template: Handlebars.compile(template),
        initialize: function () {
        },
        events: {
          "click #log-out": "logOut"
        },

        logOut: function () {
          Parse.User.logOut();
          Parse.history.navigate("", {trigger: true});
        },

        render: function (eventName) {         
          var header = new Header_VS({owner: "Opzioni_VM", backViewModelId:0 });
          $(this.el)
            .html(header.render().el)
            .append(this.template());
          return this;
        }

      });
    return Opzioni_VM;
  });