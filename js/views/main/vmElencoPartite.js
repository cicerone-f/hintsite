/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/list/vslMatch",
  "views/sub/vsNewMatch"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      vslMatch,
      vsNewMatch
    ) {

    var vmElencoPartite = Parse.View.extend({
        tagName: "div",
        id: "container",
        initialize: function () {
        },
        render: function (eventName) {
          $(this.el).empty();
          var viewContent = new vsNewMatch().render().el;
          $(this.el).html(viewContent).append(new vslMatch().render().el);
          return this;
        }
      });

    return vmElencoPartite;

  });