/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/item/Match_VSI",
  "collections/PmsCollection",
  "models/Pms",
  "text!templates/sub/list/match-TSL.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      Match_VSI,
      PmsCollection,
      Pms,
      template
    ) {

    var Match_VSL = Parse.View.extend({

        tagName: "ul",
        id: "list",
        collection: PmsCollection,
        template: Handlebars.compile(template),
        initialize: function () {
          this.collection.bind("add", this.render, this);
        },

        render: function (eventName) {
          $(this.el).empty();
          _.each(this.collection.models, function (pms) {
            $(this.el).append(new Match_VSI({
              model: pms
            }).render().el);
          }, this);
          return this;
        }
      });

    return Match_VSL;

  });