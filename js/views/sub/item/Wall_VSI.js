/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/sub/item/wall-TSI.html"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template
  ) {

    var Wall_VSI = Parse.View.extend({

        tagName: "li",

        events: {
        },

        template: Handlebars.compile(template),

        initialize: function () {
          this.model.bind("change", this.render, this);
          this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {
          var wallMsg = this.model.toJSON();
          $(this.el).html(this.template(wallMsg));
          return this;
        }

      });

    return Wall_VSI;

  });