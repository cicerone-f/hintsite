/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/item/vsiMatch",
  "collections/MatchCollection",
  "models/Match",
  "text!templates/match-list.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      vsiMatch,
      MatchCollection,
      Match,
      template
    ) {

    var vslMatch = Parse.View.extend({

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
            $(this.el).append(new vsiMatch({
              model: match
            }).render().el);
          }, this);
          return this;
        }
      });

    return vslMatch;

  });