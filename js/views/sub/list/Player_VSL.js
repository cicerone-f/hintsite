/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "collections/PmsCollection",
  "views/sub/item/Player_VSI",
  "text!templates/sub/list/players-TSL.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    PmsCollection,
    Player_VSI,
    template
  ) {
    var Player_VSL = Parse.View.extend({
        tagName: "ul",
        id: "list",
        collection: PmsCollection,
        template: Handlebars.compile(template),
        initialize: function () {
          this.collection = new PmsCollection();
          this.collection.bind("PMSDAPARSE", this.renderVero, this);
          this.collection.getFromParseForMaster(this.options.matchId);
        },
        render: function (eventName) {
          $(this.el).append(this.template());
          return this;
        },
        renderVero: function (eventName) {
          $(this.el).append(this.template());
          _.each(this.collection.models, function (pms) {
            $(this.el).append(new Player_VSI({
              model: pms}).render().el);
          }, this);
          return this;
        }
      });
    return Player_VSL;
  });