/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/sub/header-profilo-TS.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      template
    ) {

    var HeaderProfilo_VS = Parse.View.extend({
        tagName: "div",
        id: "header",
        className: 'header-profilo',
        template: Handlebars.compile(template),
        events: {
          "click #profilo": "goToProfilo",
          "click #opzioni": "goToOpzioni"
        },

        goToProfilo : function () {
          $("#overlay-loading").fadeIn();
          Parse.history.navigate("profilo" , {trigger: true});
        },

        goToOpzioni : function () {
          Parse.history.navigate("opzioni" , {trigger: true});
        },

        initialize: function () {
        },
        render: function () {
          $(this.el).html(
            this.template()
          );
          return this;
        }
      });

    return HeaderProfilo_VS;

  });