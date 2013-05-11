/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/subview-new-match.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      template
    ) {

    var vsNewMatch = Parse.View.extend({
        tagName: "div",
        id: "NewMatchButton",
        template: Handlebars.compile(template),
        initialize: function () {
        },
        render: function (eventName) {
          $(this.el).empty();
          $(this.el).html(this.template());
          return this;
        }
      });

    return vsNewMatch;

  });