/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/MatchListView",
  "views/SubViewNewMatch"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      MatchListView,
      SubViewNewMatch
    ) {

    var MainMatchListView = Parse.View.extend({
        tagName: "div",
        id: "container",
        initialize: function () {
        },
        render: function (eventName) {
          $(this.el).empty();
          var viewContent = new SubViewNewMatch().render().el;
          $(this.el).html(viewContent).append(new MatchListView().render().el);
          return this;
        }
      });

    return MainMatchListView;

  });