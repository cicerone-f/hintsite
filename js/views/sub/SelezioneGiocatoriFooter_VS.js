/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/sub/selezione-giocatori-footer-TS.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      template
    ) {

    var SelezioneGiocatoriFooter_VS = Parse.View.extend({
        tagName: "div",
        id: "selezione-giocatori-footer",
        template: Handlebars.compile(template),
        initialize: function () {
        },

        render: function () {
          $(this.el).empty();
          $(this.el).html(this.template());
          return this;
        }
      });

    return SelezioneGiocatoriFooter_VS;

  });