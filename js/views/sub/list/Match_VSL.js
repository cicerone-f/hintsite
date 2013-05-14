/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/item/Match_VSI",
  "collections/MatchCollection",
  "models/Match",
  "text!templates/sub/list/match-TSL.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      Match_VSI,
      MatchCollection,
      Match,
      template
    ) {

    var Match_VSL = Parse.View.extend({

        tagName: "ul",
        id: "list",
        template: Handlebars.compile(template),
        initialize: function () {
          this.collection = new MatchCollection();
          this.collection.bind("add", this.render, this);
          this.collection.getFromParse();
        },

        render: function (eventName) {
          $(this.el).empty();
          _.each(this.collection.models, function (match) {
            $(this.el).append(new Match_VSI({
              model: match
            }).render().el);
          }, this);
          return this;
        }
      });

    return Match_VSL;

  });