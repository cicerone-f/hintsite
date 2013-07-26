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
      WallMessage,
      template
    ) {

    var Wall_VSL = Parse.View.extend({

        tagName: "ul",
        id: "list",
        collection: WallMessageCollection,
        template: Handlebars.compile(template),
        initialize: function () {
          this.collection = new WallMessageCollection();
          if (this.options.owner == 'HintFull_VM') {
            this.collection.getFromParseHintRelated(this.options.matchId, this.options.hintNumber);
          } else {
            this.collection.getFromParse(this.options.matchId);
          }
          this.collection.bind("add", this.render, this);
        },

        render: function (eventName) {
          $(this.el).empty();
          if (this.options.owner == 'HintFull_VM' && (this.collection.length == 0)) {
            
            var tempWallMsg = new WallMessage({messageType: 4});
            $(this.el).append(new Wall_VSI({
              model: tempWallMsg
            }).render().el);
            
          } else {
            _.each(this.collection.models, function (wallMsg) {
              $(this.el).append(new Wall_VSI({
                model: wallMsg
              }).render().el);
            }, this);
          }
          return this;
        }
      });

    return Wall_VSL;

  });