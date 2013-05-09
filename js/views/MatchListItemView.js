/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/match-list-item.html"
],
    function ($, _, Backbone, Parse, Handlebars, template) {

    var MatchListItemView = Parse.View.extend({

        tagName: "li",

        events: {
          "touchend": "goToDetails"
        },

        template: Handlebars.compile(template),

        initialize: function () {
          this.model.bind("change", this.render, this);
          this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {
          var match = this.model.toJSON();
          match.id = this.model.id;
          $(this.el).html(this.template(match));
          return this;
        },

        goToDetails: function () {
          Parse.history.navigate("matches/" + this.model.id, {trigger: true});
        }
      });

    return MatchListItemView;

  });