/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/MatchListItemView",
  "collections/MatchCollection",
  "models/Match",
  "text!templates/match-list.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      MatchListItemView,
      MatchCollection,
      Match,
      template
    ) {

    var MatchListView = Parse.View.extend({

        tagName: "ul",
        id: "list",
        template: Handlebars.compile(template),
        initialize: function () {
          this.collection = new MatchCollection();
          this.collection.bind("add", this.render, this);
          this.collection.getFromParse();
        },

        render: function (eventName) {
          $(this.el).empty();
          _.each(this.collection.models, function (match) {
            $(this.el).append(new MatchListItemView({
              model: match
            }).render().el);
          }, this);
          return this;
        }
        
      });

    return MatchListView;

  });