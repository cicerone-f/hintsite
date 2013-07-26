/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/UserSearched",
  "text!templates/sub/item/player-TSI.html"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    UserSearched,
    template
  ) {

    var Player_VSI = Parse.View.extend({

        tagName: "li",
        events: {
          "click": "goToEdit"
        },

        template: Handlebars.compile(template),

        initialize: function () {
          this.model.bind("change", this.render, this);
          this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {
          $(this.el).html(this.template({name:this.model.attributes.username}));
          return this;
        },

        goToEdit: function () {

        }
      });

    return Player_VSI;

  });