/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/sub/item/match-TSI.html"
],
    function ($, _, Backbone, Parse, Handlebars, template) {

    var Match_VSI = Parse.View.extend({

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
          if (this.model.attributes.state == 0) {
            Parse.history.navigate("editMatch/" + this.model.id, {trigger: true});
          } else if (this.model.attributes.state == 1) {
            Parse.history.navigate("matches/" + this.model.id, {trigger: true});
          }
          
        }
      });

    return Match_VSI;

  });