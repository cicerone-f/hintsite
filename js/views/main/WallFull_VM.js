/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/Header_VS",
  "views/sub/list/Wall_VSL"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Header_VS,
    Wall_VSL
  ) {

    var WallFull_VM = Parse.View.extend({
      tagName: "div",
      id: "container",
      initialize: function () {
        this.render();
      },

      render: function (eventName) {
        var header = new Header_VS({owner: "PartitaPlayer_VM", backViewModelId: this.options.matchId});
        $(this.el).html(header.render().el)
        .append(new Wall_VSL({matchId: this.options.matchId}).render().el)
        return this;
      }
    });

  return WallFull_VM;

  });