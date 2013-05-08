define(["jquery", "underscore", "backbone", "Parse", "handlebars", "views/MatchListItemView", "collections/MatchCollection", "models/Match", "text!templates/match-list.html"],
    function ($, _, Backbone, Parse, Handlebars, MatchListItemView, MatchCollection, Match, template) {

    var MatchListView = Parse.View.extend({

        tagName: "ul",
        id: "list", 
        template: Handlebars.compile(template),
        initialize: function () {
          var query = new Parse.Query(Match);
          var self = this;
          query.find({
          success: function(results) {
              self.collection = results;
              //self.model.bind("reset", self.render, this);
              self.render();
          },
          error: function(error) {
            console.log(error);
          }
        });

        },

        render: function (eventName) {
          $(this.el).empty();
          _.each(this.collection, function (match) {
            $(this.el).append(new MatchListItemView({
              model: match
            }).render().el);
          }, this);
          return this;
        }
      });

    return MatchListView;

  });