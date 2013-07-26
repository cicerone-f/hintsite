/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/list/Player_VSL"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Player_VSL
  ) {
    var ListingGiocatori_VM = Parse.View.extend({
        id: 'popup-container',

        initialize: function () {
        },

        render: function (eventName) {
          $(this.el).html(new Player_VSL().render().el);
          return this;
        },

      });
    return ListingGiocatori_VM;
  });