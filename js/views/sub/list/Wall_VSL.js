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
      WallCollection,
      Wall,
      template
    ) {

    var Wall_VSL = Parse.View.extend({

        tagName: "ul",
        id: "list",
        collection: WallCollection,
        template: Handlebars.compile(template),
        initialize: function () {
          this.collection.bind("add", this.render, this);
        },

        render: function (eventName) {
          $(this.el).empty();
          var title = {title: 'Wall'};
          $(this.el).append(this.template(title));
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