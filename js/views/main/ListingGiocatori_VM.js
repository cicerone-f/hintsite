/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/list/Player_VSL",
  "text!templates/main/listing-giocatori.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Player_VSL,
    template
  ) {
    var ListingGiocatori_VM = Parse.View.extend({
        id: 'popup-container',

        events: {
          "click #close-popup": "unrenderAddFromSearch",
        },
        
        template: Handlebars.compile(template),
        
        initialize: function () {
        },

        unrenderAddFromSearch: function (eventName){
          this.remove();
        },

        render: function (eventName) {
          $(this.el).html(this.template()).append(new Player_VSL({matchId: this.options.matchId}).render().el);
          return this;
        },

      });
    return ListingGiocatori_VM;
  });