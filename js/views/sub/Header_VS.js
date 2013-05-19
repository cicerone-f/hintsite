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
        id: "header",
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
          Parse.history.navigate('back',{trigger:true,replace:true});
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