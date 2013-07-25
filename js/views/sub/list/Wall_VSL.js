/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/item/Wall_VSI",
  "collections/WallMessageCollection",
  "models/WallMessage",
  "text!templates/sub/list/wall-TSL.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      Wall_VSI,
      WallMessageCollection,
      Wall,
      template
    ) {

    var Wall_VSL = Parse.View.extend({

        tagName: "ul",
        id: "list",
        collection: WallMessageCollection,
        template: Handlebars.compile(template),
        initialize: function () {
          this.collection = new WallMessageCollection();
          this.collection.getFromParse(this.options.matchId);
          this.collection.bind("add", this.render, this);
        },

        render: function (eventName) {
          $(this.el).empty();
          _.each(this.collection.models, function (wallMsg) {
            $(this.el).append(new Wall_VSI({
              model: wallMsg
            }).render().el);
          }, this);
          return this;
        }
      });

    return Wall_VSL;

  });