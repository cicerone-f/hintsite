/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/sub/header-TS.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      template
    ) {

    var Header_VS = Parse.View.extend({
        tagName: "div",
        id: "Header",
        template: Handlebars.compile(template),
        events: {
          "touchend #back": "goBack"
        },
        titles: {
          'ElencoPartite_VM': "Elenco Partite",
          'PartitaPlayer_VM': "Partita Player",
          'NuovaPartita_VM': "Crea Nuova Partita",
          'SetLaunchTime_VM': "Set Launch Time"
        },
        goBack: function () {
          if (Parse.history.routesHit > 1) {
            //more than one route hit -> user did not land to current page directly
            window.history.back();
          } else {
            //otherwise go to the home page. Use replaceState if available so
            //the navigation doesn't create an extra history entry
            Parse.history.navigate('', {trigger: true, replace: true });
          }
        },
        initialize: function () {
        },
        render: function (t) {
          $(this.el).empty();
          $(this.el).html(this.template(t));
          return this;
        }
      });

    return Header_VS;

  });